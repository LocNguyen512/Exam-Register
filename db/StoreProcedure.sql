USE EXAM_REGISTER
GO
--QUẢN LÝ NHÂN VIÊN
-- Thêm nhân viên
-- Xóa nhân viên

CREATE PROCEDURE SP_THEM_NHAN_VIEN
    @HOTEN NVARCHAR(50),
    @CCCD CHAR(12),
    @SDT CHAR(10),
    @EMAIL VARCHAR(50),
    @LOAINV NVARCHAR(30),
    @PASSWORD VARCHAR(50)  -- mật khẩu cho login
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @NewMaNV CHAR(6)

    -- Tạo mã NV tự động (VD: NV0001, NV0002, ...)
    SELECT @NewMaNV = 'NV' + RIGHT('0000' + CAST(ISNULL(MAX(CAST(SUBSTRING(MA_NV, 3, 4) AS INT)) + 1, 1) AS VARCHAR), 4)
    FROM NHAN_VIEN

    -- Thêm vào bảng nhân viên
    INSERT INTO NHAN_VIEN (MA_NV, HOTEN, CCCD, SDT, EMAIL, LOAINV)
    VALUES (@NewMaNV, @HOTEN, @CCCD, @SDT, @EMAIL, @LOAINV)

    -- Thêm tài khoản login tương ứng
    INSERT INTO USERS (MA_NV, EMAIL, PASSWORD)
    VALUES (@NewMaNV, @EMAIL, @PASSWORD)

    -- Trả về mã nhân viên vừa tạo
    SELECT @NewMaNV AS MaNhanVienMoi
END;
GO

--USERS
-- Đăng nhập
-- Quên mật khẩu
CREATE PROCEDURE SP_LOGIN
    @Email VARCHAR(50),
    @Password VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        U.MA_NV,
        NV.HOTEN,
        NV.LOAINV AS VaiTro
    FROM USERS U
    JOIN NHAN_VIEN NV ON U.MA_NV = NV.MA_NV
    WHERE U.EMAIL = @Email AND U.PASSWORD = @Password;
END;
GO

-- NHÂN VIÊN TIẾP NHẬN
-- HIỂN THỊ DANH SÁCH THÔNG TIN KHÁCH HÀNG
-- THÊM KHÁCH HÀNG

CREATE PROCEDURE sp_get_all_khach_hang
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM KHACH_HANG;
END;
GO

CREATE PROCEDURE sp_them_khach_hang
    @SDT CHAR(10),
    @EMAIL VARCHAR(50),
    @LOAIKH NCHAR(7),
    @HOTEN NVARCHAR(50) = NULL,
    @TENDONVI NVARCHAR(50) = NULL,
    @DIACHI NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @MaKH CHAR(6);

    SELECT @MaKH = 'KH' + RIGHT('0000' + CAST(ISNULL(MAX(CAST(SUBSTRING(MA_KH, 3, 4) AS INT)) + 1, 1) AS VARCHAR), 4)
    FROM KHACH_HANG;

    INSERT INTO KHACH_HANG (MA_KH, SDT, EMAIL, LOAIKH)
    VALUES (@MaKH, @SDT, @EMAIL, @LOAIKH);

    IF @LOAIKH = N'Tự do'
        INSERT INTO KHACH_HANG_TUDO (MA_KHTD, HOTEN) VALUES (@MaKH, @HOTEN);
    ELSE IF @LOAIKH = N'Đơn vị'
        INSERT INTO KHACH_HANG_DONVI (MA_KHDV, TENDONVI, DIACHI) VALUES (@MaKH, @TENDONVI, @DIACHI);

    SELECT @MaKH AS MaKhachHangMoi;
END;
GO


CREATE PROCEDURE SP_LAY_THONG_TIN_CHUNG_CHI
AS
BEGIN
    SELECT 
        CC.MA_CC AS [MÃ CHỨNG CHỈ],
        CC.MONTHI AS [Môn thi],
        CC.NGAYCAP AS [Ngày cấp],
        CC.KETQUA AS [Kết quả],
        TS.CCCD AS [CCCD thí sinh],
        CC.MA_NV AS [Mã nhân viên nhập]
    FROM 
        CHUNG_CHI CC
    INNER JOIN 
        THI_SINH TS ON CC.MA_TS = TS.MA_TS
END

CREATE PROCEDURE SP_LAY_CHUNGCHI_THEO_CCCD
    @cccd NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        cc.MA_CC,
        cc.MONTHI,
        CONVERT(VARCHAR(10), cc.NGAYCAP, 103) AS NGAYCAP, -- Định dạng ngày dd/MM/yyyy
        cc.KETQUA,
        ts.CCCD,
        cc.MA_NV
    FROM 
        CHUNG_CHI cc
    INNER JOIN 
        THI_SINH ts ON cc.MA_TS = ts.MA_TS
    WHERE 
        ts.CCCD = @cccd;
END

