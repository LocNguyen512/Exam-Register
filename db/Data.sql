USE EXAM_REGISTER
GO

-- thêm nhân viên
EXEC sp_them_nhan_vien 
    @HOTEN = N'Lê Thị Hoa',
    @CCCD = '012345678901',
    @SDT = '0909123456',
    @EMAIL = 'hoa.tn@example.com',
    @LOAINV = N'Kế toán',
    @PASSWORD = 'hoapass123';
GO

EXEC sp_them_nhan_vien 
    @HOTEN = N'Nguyễn Văn Minh',
    @CCCD = '012345678902',
    @SDT = '0909123457',
    @EMAIL = 'minh.nv@example.com',
    @LOAINV = N'Tiếp nhận',
    @PASSWORD = 'minh123';
GO

EXEC sp_them_nhan_vien 
    @HOTEN = N'Trần Thị Mai',
    @CCCD = '012345678903',
    @SDT = '0909123458',
    @EMAIL = 'mai.tt@example.com',
    @LOAINV = N'Nhập liệu',
    @PASSWORD = 'mai456';
GO

