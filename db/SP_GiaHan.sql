USE EXAM_REGISTER
GO

CREATE PROC sp_get_thi_sinh_theo_sbd
	@sbd CHAR(6)
AS
BEGIN
	SELECT
		TS.MA_TS,
        HOTEN,
        CCCD,
        NGAYSINH,
        SDT,
        EMAIL,
        CT.SOBAODANH
	FROM THI_SINH TS
    JOIN CHI_TIET_DANG_KY CT ON TS.MA_TS = CT.MA_TS
    WHERE CT.SOBAODANH = @sbd
END

GO

CREATE OR ALTER PROCEDURE sp_get_chung_chi_dang_ky
	@sbd CHAR(6)
AS
BEGIN
	SELECT
        L.TENLOAI,
        LT.NGAYTHI
    FROM CHI_TIET_DANG_KY CT
    JOIN LICH_THI LT ON CT.MA_LICH = LT.MA_LICH
    JOIN LOAI_DGNL L ON LT.MA_LOAI = L.MA_LOAI
    WHERE CT.SOBAODANH = @sbd
END

GO

CREATE PROCEDURE sp_get_ngay_thi_con_ghe_trong
    @MON_THI NVARCHAR(50)
AS
BEGIN
    SELECT DISTINCT
        LT.NGAYTHI,
        LT.MA_LICH,
        CT.MA_PHONG
    FROM LICH_THI LT
    JOIN LOAI_DGNL LD ON LT.MA_LOAI = LD.MA_LOAI
    JOIN CHI_TIET_LICH_THI CT ON CT.MA_LICH = LT.MA_LICH
    WHERE LD.TENLOAI = @MON_THI AND CT.SOGHETRONG > 0
END

GO

CREATE OR ALTER PROCEDURE sp_update_lich_thi_gia_han
    @SOBAODANH CHAR(6),
    @MON_THI NVARCHAR(20),
    @NGAY_THI DATE
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @MA_LICH_CU CHAR(6), @MA_PHONG_CU CHAR(6);
    DECLARE @MA_LICH_MOI CHAR(6), @MA_PHONG_MOI CHAR(6);

    -- ❶ Tìm mã lịch thi mới từ ngày thi và môn thi
    SELECT TOP 1 @MA_LICH_MOI = LT.MA_LICH
    FROM LICH_THI LT
    JOIN LOAI_DGNL L ON LT.MA_LOAI = L.MA_LOAI
    WHERE LT.NGAYTHI = @NGAY_THI AND L.TENLOAI = @MON_THI;

    -- ❷ Tìm mã phòng còn ghế trống ứng với lịch thi đó
    SELECT TOP 1 @MA_PHONG_MOI = MA_PHONG
    FROM CHI_TIET_LICH_THI
    WHERE MA_LICH = @MA_LICH_MOI AND SOGHETRONG > 0;

    IF @MA_LICH_MOI IS NULL OR @MA_PHONG_MOI IS NULL
    BEGIN
        RAISERROR(N'Không tìm được lịch thi hoặc phòng còn trống', 16, 1);
        RETURN;
    END

    -- ❸ Lấy mã lịch và mã phòng cũ theo SBD
    SELECT TOP 1
        @MA_LICH_CU = MA_LICH,
        @MA_PHONG_CU = MA_PHONG
    FROM CHI_TIET_DANG_KY
    WHERE SOBAODANH = @SOBAODANH;

    -- ❹ Cập nhật lịch và phòng mới theo SBD
    UPDATE CHI_TIET_DANG_KY
    SET MA_LICH = @MA_LICH_MOI,
        MA_PHONG = @MA_PHONG_MOI
    WHERE SOBAODANH = @SOBAODANH;

    -- ❺ Cập nhật ghế trống
    UPDATE CHI_TIET_LICH_THI
    SET SOGHETRONG = SOGHETRONG + 1
    WHERE MA_LICH = @MA_LICH_CU AND MA_PHONG = @MA_PHONG_CU;

    UPDATE CHI_TIET_LICH_THI
    SET SOGHETRONG = SOGHETRONG - 1
    WHERE MA_LICH = @MA_LICH_MOI AND MA_PHONG = @MA_PHONG_MOI;
END

GO

CREATE OR ALTER PROCEDURE SP_TAO_PHIEU_GIA_HAN
    @sbd CHAR(6),
    @MON NVARCHAR(20),
    @TRUONGHOP NVARCHAR(20),
    @MA_NVTN CHAR(6) = NULL,
    @MA_NVKT CHAR(6) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @MA_TS CHAR(6), @NEXT_ID INT, @MA_PGH CHAR(6);
    DECLARE @PHI INT, @TINHTRANG NVARCHAR(20);

    -- Lấy mã thí sinh từ sbd
    SELECT @MA_TS = MA_TS
    FROM CHI_TIET_DANG_KY
    WHERE SOBAODANH = @sbd;

    IF @MA_TS IS NULL
    BEGIN
        RAISERROR(N'Không tìm thấy thí sinh có SBD này', 16, 1);
        RETURN;
    END

    -- Xử lý trường hợp đặc biệt và không đặc biệt
    IF @TRUONGHOP = N'Đặc biệt'
    BEGIN
        SET @PHI = 0;
        SET @TINHTRANG = N'Đã thanh toán';
    END
    ELSE
    BEGIN
        SELECT @PHI = CAST(GIATIEN * 0.25 AS INT)
        FROM LOAI_DGNL
        WHERE TENLOAI = @MON;

        IF @PHI IS NULL
        BEGIN
            RAISERROR(N'Không tìm thấy loại chứng chỉ tương ứng với môn thi', 16, 1);
            RETURN;
        END

        SET @TINHTRANG = N'Chưa thanh toán';
    END

    -- Sinh mã phiếu mới: GH0001, GH0002, ...
    SELECT @NEXT_ID = ISNULL(MAX(CAST(SUBSTRING(MA_PGH, 3, 4) AS INT)), 0) + 1
    FROM PHIEU_GIA_HAN;

    SET @MA_PGH = 'GH' + RIGHT('0000' + CAST(@NEXT_ID AS VARCHAR), 4);

    -- Thêm phiếu gia hạn
    INSERT INTO PHIEU_GIA_HAN (
        MA_PGH, NGAYLAP, MON, TRUONGHOP, PHI, TINHTRANG, MA_NVTN, MA_NVKT, MA_TS
    )
    VALUES (
        @MA_PGH, GETDATE(), @MON, @TRUONGHOP, @PHI, @TINHTRANG, @MA_NVTN, @MA_NVKT, @MA_TS
    );

    -- Trả mã phiếu mới
    SELECT @MA_PGH AS MA_PHIEU_GIA_HAN_MOI;
END


GO

CREATE PROC sp_cap_nhat_so_lan_gia_han 
	@SOBAODANH CHAR(6)
AS
BEGIN
	UPDATE CHI_TIET_DANG_KY
	SET SOLANGIAHAN = ISNULL(SOLANGIAHAN, 0) + 1
	WHERE SOBAODANH = @SOBAODANH
END

GO

CREATE PROCEDURE SP_KIEM_TRA_GIA_HAN_THEO_SBD 
	@SOBAODANH CHAR(6) 
AS 
BEGIN 
	SET NOCOUNT ON;
	DECLARE @SO_LAN_GIA_HAN INT,
        @NGAY_THI DATE;

	-- Kiểm tra tồn tại số báo danh
	IF NOT EXISTS (
		SELECT 1
		FROM CHI_TIET_DANG_KY
		WHERE SOBAODANH = @SOBAODANH
	)
	BEGIN
		RAISERROR(N'Không tìm thấy số báo danh', 16, 1);
		RETURN;
	END

	-- Lấy số lần gia hạn
	SELECT @SO_LAN_GIA_HAN = ISNULL(SOLANGIAHAN, 0)
	FROM CHI_TIET_DANG_KY
	WHERE SOBAODANH = @SOBAODANH;

	IF @SO_LAN_GIA_HAN >= 2
	BEGIN
		RAISERROR(N'Thí sinh đã gia hạn tối đa 2 lần', 16, 1);
		RETURN;
	END

	-- Lấy ngày thi từ bảng LICH_THI
	SELECT @NGAY_THI = LT.NGAYTHI
	FROM CHI_TIET_DANG_KY CT
	JOIN LICH_THI LT ON CT.MA_LICH = LT.MA_LICH
	WHERE CT.SOBAODANH = @SOBAODANH;

	IF @NGAY_THI IS NULL
	BEGIN
		RAISERROR(N'Không tìm thấy ngày thi', 16, 1);
		RETURN;
	END

	-- Kiểm tra số ngày còn lại trước ngày thi
	IF DATEDIFF(DAY, GETDATE(), @NGAY_THI) < 2
	BEGIN
		RAISERROR(N'Không được gia hạn trong vòng 2 ngày trước ngày thi', 16, 1);
		RETURN;
	END

	-- Nếu hợp lệ
	SELECT 1 AS KetQua, N'Đủ điều kiện gia hạn' AS ThongBao;
END

GO

CREATE OR ALTER PROCEDURE sp_xoa_sbd_cu
    @SOBAODANH CHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra tồn tại
    IF NOT EXISTS (
        SELECT 1 FROM CHI_TIET_DANG_KY WHERE SOBAODANH = @SOBAODANH
    )
    BEGIN
        RAISERROR(N'Số báo danh không tồn tại', 16, 1);
        RETURN;
    END

    -- Xóa bằng cách cập nhật về NULL
    UPDATE CHI_TIET_DANG_KY
    SET SOBAODANH = NULL
    WHERE SOBAODANH = @SOBAODANH;
END


EXEC SP_KIEM_TRA_GIA_HAN_THEO_SBD @SOBAODANH = 'BD0001'
SELECT * FROM THI_SINH WHERE CCCD = '226997273935'

drop proc sp_update_lich_thi_gia_han
EXEC sp_get_thi_sinh_theo_sbd @sbd = 'BD0001'
EXEC sp_get_chung_chi_dang_ky @sbd = 'BD0001'