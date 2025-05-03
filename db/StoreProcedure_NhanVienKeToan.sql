
--Sp tìm kiếm ở trang của nhân viên kế toán - khách hàng tự do 
use EXAM_REGISTER
go 

-- Đọc thông tin phiếu
CREATE OR ALTER PROCEDURE sp_lay_thong_tin_phieu_dang_ky
    @MaPhieu CHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        PDK.MA_PDK,
        PDK.NGAYLAP,
        PDK.SOLUONG,
        PDK.MA_KH,
        KH.LOAIKH,
        PDK.MA_NV
    FROM PHIEU_DANG_KY PDK
    INNER JOIN KHACH_HANG KH ON PDK.MA_KH = KH.MA_KH
    WHERE PDK.MA_PDK = @MaPhieu;
END;
GO

CREATE OR ALTER PROCEDURE sp_tao_phieu_thanh_toan
    @ma_pdk CHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @max_number INT;
    DECLARE @new_number INT;
    DECLARE @ma_ptt CHAR(6);

    -- Tìm số lớn nhất từ mã PTT hiện tại, loại bỏ 'TT' và ép về số
    SELECT @max_number = MAX(CAST(SUBSTRING(MA_PTT, 3, 4) AS INT))
    FROM PHIEU_THANH_TOAN;

    -- Nếu chưa có dòng nào, bắt đầu từ 1
    SET @new_number = ISNULL(@max_number, 0) + 1;

    -- Ghép thành mã mới: 'TT' + số có 4 chữ số
    SET @ma_ptt = 'TT' + RIGHT('0000' + CAST(@new_number AS VARCHAR), 4);

    -- Thêm phiếu thanh toán
    INSERT INTO PHIEU_THANH_TOAN (MA_PTT, TINHTRANG, NGAYLAP, MA_NV, MA_PDK)
    VALUES (@ma_ptt, N'Chưa thanh toán', GETDATE(), NULL, @ma_pdk);
END;
GO

CREATE OR ALTER PROCEDURE sp_lay_tinh_trang_thanh_toan
    @ma_pdk CHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TINHTRANG
    FROM PHIEU_THANH_TOAN
    WHERE MA_PDK = @ma_pdk;
END;
GO


-- Lấy danh sách môn thi
CREATE OR ALTER PROCEDURE sp_lay_chung_chi_da_dang_ky
    @ma_pdk CHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        LDGNL.TENLOAI AS TenChungChi,
        LDGNL.GIATIEN
    FROM CHI_TIET_DANG_KY CT
    INNER JOIN LICH_THI LT ON CT.MA_LICH = LT.MA_LICH
    INNER JOIN LOAI_DGNL LDGNL ON LT.MA_LOAI = LDGNL.MA_LOAI
    WHERE CT.MA_PDK = @ma_pdk
END
go



CREATE OR ALTER PROCEDURE sp_cap_nhat_tinh_trang_thanh_toan
    @ma_pdk CHAR(6),
    @ma_nv CHAR(6)
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra phiếu thanh toán có tồn tại hay không
    IF NOT EXISTS (
        SELECT 1 FROM PHIEU_THANH_TOAN
        WHERE MA_PDK = @ma_pdk
    )
    BEGIN
        RAISERROR(N'Không tìm thấy phiếu thanh toán ứng với mã phiếu đăng ký', 16, 1);
        RETURN;
    END

    -- (Tùy chọn) Kiểm tra mã nhân viên có tồn tại
    IF NOT EXISTS (
        SELECT 1 FROM NHAN_VIEN
        WHERE MA_NV = @ma_nv
    )
    BEGIN
        RAISERROR(N'Mã nhân viên không tồn tại', 16, 1);
        RETURN;
    END

    -- Cập nhật tình trạng và mã nhân viên xác nhận
    UPDATE PHIEU_THANH_TOAN
    SET TINHTRANG = N'Đã thanh toán',
        MA_NV = @ma_nv
    WHERE MA_PDK = @ma_pdk;
END;
GO
