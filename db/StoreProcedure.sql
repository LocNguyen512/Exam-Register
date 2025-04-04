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