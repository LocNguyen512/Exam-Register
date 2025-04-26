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

-- LOAIDGNL_DAO
CREATE PROCEDURE SP_LayDSChungChi
AS
BEGIN
    SELECT MA_LOAI, TENLOAI
    FROM LOAI_DGNL;
END 

CREATE PROCEDURE LAYLICHTHI
    @TENLOAI VARCHAR(20)
AS
BEGIN
    SELECT DISTINCT
        MA_LICH,
        NGAYTHI,
        GIOTHI
    FROM 
        LICH_THI LT JOIN CHI_TIET_LICH_THI CTLT ON LT.MA_LICH = CTLT.MA_LICH
    WHERE 
        MA_LOAI = (SELECT MA_LOAI FROM LOAI_DGNL WHERE TENLOAI = @TENLOAI)
		AND CTLT.SOGHETRONG > 0
    ORDER BY 
        ngay_thi ASC, gio_thi ASC;
END

-- LICHTHI_DAO
CREATE PROCEDURE SP_LayDSLichThi
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        lt.MaLichThi,
        lt.NgayThi,
        lt.GioThi,
        ctl.MaPhong,
        ctl.SoGheTrong
    FROM 
        LichThi lt
    INNER JOIN 
        ChiTietLichThi ctl ON lt.MaLichThi = ctl.MaLichThi
    WHERE 
        ctl.SoGheTrong > 0  -- chỉ lấy những lịch thi còn ghế trống
    ORDER BY 
        lt.NgayThi ASC, lt.GioThi ASC, ctl.MaPhong ASC;
END