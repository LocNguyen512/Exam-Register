USE EXAM_REGISTER
GO

IF OBJECT_ID('sp_LayDanhSachBangGia', 'P') IS NOT NULL
    DROP PROCEDURE sp_LayDanhSachBangGia
GO

CREATE PROCEDURE sp_LayDanhSachBangGia
AS
BEGIN
    SELECT 
        ldg.MA_LOAI,
        ldg.TenLoai,
        ldg.GIATIEN,
        CAST(ISNULL(ldg.GIATIEN, 0) * 0.25 AS INT) AS PhiGiaHan,
        (
            SELECT TOP 1 lt.NgayThi
            FROM LICH_THI lt
            WHERE EXISTS (
				SELECT 1 FROM LICH_THI lt WHERE lt.MA_LOAI = ldg.MA_LOAI AND lt.NgayThi >= GETDATE()
			)
            ORDER BY lt.NgayThi DESC
        ) AS NgayThiMoiNhat
    FROM LOAI_DGNL ldg
END

exec sp_LayDanhSachBangGia