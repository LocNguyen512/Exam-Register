USE EXAM_REGISTER
GO
--QUẢN LÝ NHÂN VIÊN
-- Thêm nhân viên
-- Xóa nhân viên
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

