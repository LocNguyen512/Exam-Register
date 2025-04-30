USE EXAM_REGISTER
GO

-- Xóa stored procedure nếu đã tồn tại
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LAY_THONG_TIN_CHUNG_CHI')
BEGIN
    DROP PROCEDURE SP_LAY_THONG_TIN_CHUNG_CHI
END
GO

-- Tạo lại stored procedure SP_LAY_THONG_TIN_CHUNG_CHI
CREATE PROCEDURE SP_LAY_THONG_TIN_CHUNG_CHI
AS
BEGIN
    SELECT 
        CC.MA_CC AS [MÃ CHỨNG CHỈ],
        CC.MONTHI AS [Môn thi],
        CONVERT(VARCHAR(10), cc.NGAYCAP, 103) AS [Ngày cấp],
        CC.KETQUA AS [Kết quả],
        TS.CCCD AS [CCCD thí sinh],
        CC.MA_NV AS [Mã nhân viên nhập]
    FROM 
        CHUNG_CHI CC
    INNER JOIN 
        THI_SINH TS ON CC.MA_TS = TS.MA_TS
END
GO

-- Xóa stored procedure nếu đã tồn tại
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LAY_CHUNGCHI_THEO_CCCD')
BEGIN
    DROP PROCEDURE SP_LAY_CHUNGCHI_THEO_CCCD
END
GO

-- Tạo lại stored procedure SP_LAY_CHUNGCHI_THEO_CCCD
CREATE PROCEDURE SP_LAY_CHUNGCHI_THEO_CCCD 
    @cccd NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            cc.MA_CC,
            cc.MONTHI,
            CONVERT(VARCHAR(10), cc.NGAYCAP, 103) AS NGAYCAP,
            cc.KETQUA,
            ts.CCCD,
            cc.MA_NV
        FROM 
            CHUNG_CHI cc
        INNER JOIN 
            THI_SINH ts ON cc.MA_TS = ts.MA_TS
        WHERE 
            ts.CCCD = @cccd
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END
GO



IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_THEM_CHUNGCHI')
BEGIN
    DROP PROCEDURE SP_THEM_CHUNGCHI
END
GO

-- Tạo stored procedure để thêm chứng chỉ
CREATE PROCEDURE SP_THEM_CHUNGCHI
    @MONTHI NVARCHAR(50),
    @NGAYCAP DATE,
    @KETQUA INT,
    @CCCD NVARCHAR(20),
    @MA_NV CHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @MA_TS CHAR(6);
    DECLARE @MA_CC CHAR(6);
    DECLARE @MAX_ID INT;

    BEGIN TRY
        -- 1. Kiểm tra CCCD có tồn tại trong bảng THI_SINH không
        IF NOT EXISTS (SELECT 1 FROM THI_SINH WHERE CCCD = @CCCD)
        BEGIN
            RAISERROR(N'CCCD không tồn tại trong danh sách thí sinh.', 16, 1);
            RETURN;
        END

        -- 2. Kiểm tra mã nhân viên có tồn tại trong bảng NHAN_VIEN không
        IF NOT EXISTS (SELECT 1 FROM NHAN_VIEN WHERE MA_NV = @MA_NV)
        BEGIN
            RAISERROR(N'Mã nhân viên không tồn tại.', 16, 1);
            RETURN;
        END

        -- 3. Lấy mã thí sinh từ bảng THI_SINH
        SELECT @MA_TS = MA_TS FROM THI_SINH WHERE CCCD = @CCCD;

        -- 4. Sinh mã chứng chỉ mới (ví dụ: CC0001, CC0002, ...)
        SELECT @MAX_ID = MAX(CAST(SUBSTRING(MA_CC, 3, 4) AS INT)) FROM CHUNG_CHI;
        SET @MAX_ID = ISNULL(@MAX_ID, 0) + 1;
        SET @MA_CC = 'CC' + RIGHT('0000' + CAST(@MAX_ID AS VARCHAR), 4);

        -- 5. Thêm chứng chỉ
        INSERT INTO CHUNG_CHI (MA_CC, NGAYCAP, MONTHI, KETQUA, TRANGTHAI, MA_TS, MA_NV)
        VALUES (@MA_CC, @NGAYCAP, @MONTHI, @KETQUA, N'Chưa nhận', @MA_TS, @MA_NV);
    END TRY
    BEGIN CATCH
        DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrMsg, 16, 1);
    END CATCH
END
GO


IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LayDSChungChi')
BEGIN
    DROP PROCEDURE SP_LayDSChungChi
END
GO

CREATE PROCEDURE SP_LayDSChungChi
AS
BEGIN
    SELECT MA_LOAI, TENLOAI
    FROM LOAI_DGNL;
END 
GO

CREATE PROCEDURE SP_LayDSLichThi
    @TenLoai NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        lt.MA_LICH,
        lt.NgayThi,
        ctl.MA_PHONG,
        ctl.SoGheTrong
    FROM 
        LICH_THI lt
    INNER JOIN 
        CHI_TIET_LICH_THI ctl ON lt.MA_LICH = ctl.MA_LICH
    INNER JOIN 
        Loai_DGNL ld ON lt.MA_LOAI = ld.MA_LOAI
    WHERE 
        ctl.SoGheTrong > 0
		AND lt.NgayThi > CAST(GETDATE() AS DATE)
        AND (@TenLoai IS NULL OR ld.TenLoai = @TenLoai)
    ORDER BY 
        lt.NgayThi ASC, lt.GioThi ASC, ctl.MA_PHONG ASC;
END
GO
