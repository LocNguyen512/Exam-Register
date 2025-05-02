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
        CC.MA_NV AS [Mã nhân viên nhập],
		CC.TRANGTHAI AS [Trạng thái],
		CC.GHICHU AS [Ghi chú]
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

        
        SELECT @MA_TS = MA_TS FROM THI_SINH WHERE CCCD = @CCCD;

        
        SELECT @MAX_ID = MAX(CAST(SUBSTRING(MA_CC, 3, 4) AS INT)) FROM CHUNG_CHI;
        SET @MAX_ID = ISNULL(@MAX_ID, 0) + 1;
        SET @MA_CC = 'CC' + RIGHT('0000' + CAST(@MAX_ID AS VARCHAR), 4);

        
        INSERT INTO CHUNG_CHI (MA_CC, NGAYCAP, MONTHI, KETQUA, TRANGTHAI, MA_TS, MA_NV)
        VALUES (@MA_CC, @NGAYCAP, @MONTHI, @KETQUA, N'Chưa nhận', @MA_TS, @MA_NV);
    END TRY
    BEGIN CATCH
        DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrMsg, 16, 1);
    END CATCH
END
GO


IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LayLoaiDGNL_ChuaCapChungChi')
BEGIN
    DROP PROCEDURE SP_LayLoaiDGNL_ChuaCapChungChi
END
GO

CREATE PROCEDURE SP_LayLoaiDGNL_ChuaCapChungChi
    @CCCD CHAR(12)
AS
BEGIN
    SELECT DISTINCT ld.MA_LOAI, ld.TENLOAI
    FROM THI_SINH ts
    JOIN CHI_TIET_DANG_KY ctdk ON ts.MA_TS = ctdk.MA_TS
    JOIN LICH_THI lt ON ctdk.MA_LICH = lt.MA_LICH
    JOIN LOAI_DGNL ld ON lt.MA_LOAI = ld.MA_LOAI
    WHERE ts.CCCD = @CCCD
    AND NOT EXISTS (
        SELECT 1
        FROM CHUNG_CHI cc
        WHERE cc.MA_TS = ts.MA_TS
        AND cc.MONTHI = ld.TENLOAI -- mapping tên môn thi với loại DGNL
    );
END
GO



/*
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
*/

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_CapNhatTrangThaiChungChi')
BEGIN
    DROP PROCEDURE sp_CapNhatTrangThaiChungChi
END
GO

CREATE PROCEDURE sp_CapNhatTrangThaiChungChi
    @MaCC CHAR(6),
    @TrangThaiMoi NVARCHAR(20)
AS
BEGIN
    -- Kiểm tra chứng chỉ có tồn tại không
    IF NOT EXISTS (SELECT 1 FROM CHUNG_CHI WHERE MA_CC = @MaCC)
    BEGIN
        RAISERROR(N'Mã chứng chỉ không tồn tại.', 16, 1);
        RETURN;
    END

    -- Kiểm tra trạng thái hợp lệ
    IF @TrangThaiMoi NOT IN (N'Đã nhận', N'Chưa nhận', N'-')
    BEGIN
        RAISERROR(N'Trạng thái không hợp lệ. Chỉ chấp nhận các giá trị: "Đã nhận", "Chưa nhận", "-".', 16, 1);
        RETURN;
    END

    -- Thực hiện cập nhật trạng thái
    UPDATE CHUNG_CHI
    SET TRANGTHAI = @TrangThaiMoi
    WHERE MA_CC = @MaCC;

    -- Trả về thông báo thành công
    PRINT N'Cập nhật trạng thái chứng chỉ thành công.';
END
GO


IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'sp_CapNhatGhiChuChungChi')
BEGIN
    DROP PROCEDURE sp_CapNhatGhiChuChungChi
END
GO
CREATE PROCEDURE sp_CapNhatGhiChuChungChi
    @MA_CC CHAR(6),
    @GHICHU NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM CHUNG_CHI WHERE MA_CC = @MA_CC)
    BEGIN
        UPDATE CHUNG_CHI
        SET GHICHU = @GHICHU
        WHERE MA_CC = @MA_CC;

        SELECT N'Cập nhật ghi chú thành công' AS message, 1 AS success;
    END
    ELSE
    BEGIN
        SELECT N'Không tìm thấy chứng chỉ với mã đã cung cấp' AS message, 0 AS success;
    END
END;
GO



IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LayDSThiSinh')
BEGIN
    DROP PROCEDURE SP_LayDSThiSinh
END
GO
CREATE PROCEDURE SP_LayDSThiSinh
AS
BEGIN
    SELECT 
        MA_TS,
        HOTEN,
        CCCD,
        NGAYSINH,
        SDT,
        EMAIL
    FROM THI_SINH
END;
GO