USE EXAM_REGISTER
GO
--QUẢN LÝ NHÂN VIÊN
-- Thêm nhân viên
-- Xóa nhân viên

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
    WHERE NV.EMAIL = @Email AND U.MATKHAU = @Password;
END;
GO


CREATE PROCEDURE sp_get_all_khach_hang
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM KHACH_HANG;
END;
GO


-- LOAIDGNL_DAO
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

-- TẠO SP MỚI
CREATE PROCEDURE SP_ThemKhachHangTuDo
    @HoTen NVARCHAR(50),
    @SDT CHAR(10),
    @Email VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @NewMaKH CHAR(6);

    -- Sinh mã khách hàng mới
    SELECT @NewMaKH = 
        'KH' + RIGHT('0000' + CAST(ISNULL(MAX(CAST(SUBSTRING(MA_KH, 3, 4) AS INT)), 0) + 1 AS VARCHAR), 4)
    FROM KHACH_HANG;

    -- Thêm vào bảng KHACH_HANG
    INSERT INTO KHACH_HANG (MA_KH, SDT, EMAIL, LOAIKH)
    VALUES (@NewMaKH, @SDT, @Email, N'Tự do');

    -- Thêm vào bảng KHACH_HANG_TUDO
    INSERT INTO KHACH_HANG_TUDO (MA_KHTD, HOTEN)
    VALUES (@NewMaKH, @HoTen);

    -- Trả về mã khách hàng mới tạo
    SELECT @NewMaKH AS NewMaKH;
END
GO

create PROCEDURE SP_ThemThiSinh
    @HoTen NVARCHAR(50),
    @NgaySinh NVARCHAR(20),
    @SDT CHAR(10),
    @Email VARCHAR(50),
    @CCCD CHAR(12)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @NewMaTS CHAR(6);

    -- Sinh mã thí sinh mới: TS0001, TS0002,...
    SELECT @NewMaTS = 
        'TS' + RIGHT('0000' + CAST(ISNULL(MAX(CAST(SUBSTRING(MA_TS, 3, 4) AS INT)), 0) + 1 AS VARCHAR), 4)
    FROM THI_SINH;

    -- Thêm vào bảng THISINH
    INSERT INTO THI_SINH (MA_TS, HOTEN, NGAYSINH, SDT, EMAIL, CCCD)
    VALUES (@NewMaTS, @HoTen, CONVERT(DATE, @NgaySinh, 120), @SDT, @Email, @CCCD);

    -- Trả về mã thí sinh vừa tạo
    SELECT @NewMaTS AS NewMaTS;
END
GO


CREATE PROCEDURE SP_ThemPhieuDangKy
    @MaNV CHAR(6),
    @MaKH CHAR(6),
    @SoLuong INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @NewMaPDK CHAR(6);

    -- Sinh mã phiếu đăng ký mới: DK0001, DK0002,...
    SELECT @NewMaPDK = 
        'DK' + RIGHT('0000' + CAST(ISNULL(MAX(CAST(SUBSTRING(MA_PDK, 3, 4) AS INT)), 0) + 1 AS VARCHAR), 4)
    FROM PHIEU_DANG_KY;

    -- Thêm phiếu đăng ký
    INSERT INTO PHIEU_DANG_KY (MA_PDK, NGAYLAP, SOLUONG, MA_NV, MA_KH)
    VALUES (@NewMaPDK, CAST(GETDATE() AS DATE), @SoLuong, @MaNV, @MaKH);

    -- Trả về mã phiếu mới để frontend biết
    SELECT @NewMaPDK AS NewMaPDK;
END
GO



-- TẠO SP MỚI
CREATE PROCEDURE SP_GiamSoGheTrong
    @MaLichThi CHAR(6),
    @MaPhong CHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM CHI_TIET_LICH_THI
        WHERE MA_LICH = @MaLichThi
          AND MA_PHONG = @MaPhong
          AND SOGHETRONG > 0
    )
    BEGIN
        UPDATE CHI_TIET_LICH_THI
        SET SOGHETRONG = SOGHETRONG - 1
        WHERE MA_LICH = @MaLichThi
          AND MA_PHONG = @MaPhong;
    END
    ELSE
    BEGIN
        -- Phải THROW bên trong một BEGIN...END mới hợp lệ
        THROW 50001, 'Không còn ghế trống.', 1;
    END
END
GO

CREATE PROCEDURE SP_ThemChiTietDangKy
    @MaPDK CHAR(6),
    @MaTS CHAR(6),
    @MaPhong CHAR(6),
    @MaLich CHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    -- Thêm vào bảng chi tiết đăng ký
    INSERT INTO CHI_TIET_DANG_KY (MA_PDK, MA_TS, SOLANGIAHAN, SOBAODANH, MA_PHONG, MA_LICH)
    VALUES (@MaPDK, @MaTS, 0, NULL, @MaPhong, @MaLich);

    -- Không cần trả ra gì, hoặc có thể trả 1 message nếu bạn muốn
END
GO
