﻿/*Chạy code này để drop database
USE [master]
GO
ALTER DATABASE [EXAM_REGISTER] SET  SINGLE_USER WITH ROLLBACK IMMEDIATE
GO
USE [master]
GO
DROP DATABASE [EXAM_REGISTER]
GO
*/
CREATE DATABASE EXAM_REGISTER
GO
USE EXAM_REGISTER
GO

/*-----------------PHẦN TẠO BẢNG VÀ KHÓA CHÍNH---------------------*/
-- CÁC CÔNG VIỆC CẦN LÀM:
-- + CHECK ERD VÀ KIỂU DỮ LIỆU CÁC THUỘC TÍNH
-- + THÊM RÀNG BUỘC CHO TỪNG THUỘC TÍNH (UNIQUE, NOT NULL, CHECK)
-- + XÁC ĐỊNH KHÓA NGOẠI VÀ THÊM RÀNG BUỘC KHÓA NGOẠI

-- 1
CREATE TABLE NHAN_VIEN (
    MA_NV CHAR(6), -- NV0001
	HOTEN NVARCHAR(50) NOT NULL, 
    CCCD CHAR(12) UNIQUE NOT NULL,
	SDT CHAR(10) NOT NULL,
	EMAIL VARCHAR(50) NOT NULL,
	LOAINV NVARCHAR(30) CHECK(LOAINV IN (N'Nhập liệu',N'Tiếp nhận',N'Kế toán')),
	CONSTRAINT PK_NHAN_VIEN PRIMARY KEY (MA_NV)
)
GO

-- 2
CREATE TABLE THI_SINH (
    MA_TS CHAR(6), -- TS0001
	SOBAODANH INT, 
    HOTEN NVARCHAR(50) NOT NULL,
	CCCD CHAR(12) UNIQUE NOT NULL,
	NGAYSINH DATE NOT NULL,
	SDT CHAR(10) UNIQUE NOT NULL,
	EMAIL VARCHAR(50) NOT NULL,
	MA_KH CHAR(6), -- Khóa ngoại
	CONSTRAINT PK_THI_SINH PRIMARY KEY (MA_TS)
)
GO

-- 3 + 4
CREATE TABLE KHACH_HANG(
	MA_KH CHAR(6), --KH0001
	SDT CHAR(10) UNIQUE NOT NULL,
	EMAIL VARCHAR(50) NOT NULL,
	LOAIKH NCHAR(7) CHECK (LOAIKH IN (N'Tự do', N'Đơn vị'))
	CONSTRAINT PK_KHACH_HANG PRIMARY KEY (MA_KH)
)
GO

-- 3
CREATE TABLE KHACH_HANG_TUDO(
	MA_KHTD CHAR(6), --KH0001
	HOTEN NVARCHAR(50) NOT NULL,
	CONSTRAINT PK_KHACH_HANG_TUDO PRIMARY KEY (MA_KHTD)
)
GO

-- 4
CREATE TABLE KHACH_HANG_DONVI(
	MA_KHDV CHAR(6), --KH0001
	TENDONVI NVARCHAR(50) NOT NULL,
	DIACHI NVARCHAR(100) NOT NULL,
	CONSTRAINT PK_KHACH_HANG_DONVI PRIMARY KEY (MA_KHDV)
)

-- 5
CREATE TABLE PHIEU_GIA_HAN (
    MA_PGH CHAR(6), -- GH0001
	NGAYLAP DATE NOT NULL,
    MON NVARCHAR(20) NOT NULL,
	TRUONGHOP NVARCHAR(20) CHECK(TRUONGHOP IN (N'Đặc biệt',N'Không đặc biệt')),
	PHI INT NOT NULL,
	MA_NV CHAR(6),
	MA_TS CHAR (6),
	CONSTRAINT PK_PHIEU_GIA_HAN PRIMARY KEY (MA_PGH)
)
GO

-- 6
CREATE TABLE PHIEU_DANG_KY (
    MA_PDK CHAR(6), -- DK0001
	NGAYLAP DATE NOT NULL, 
	TINHTRANG NVARCHAR(20), -- CHECK(TINHTRANG IN (N'',N'')) TÌNH TRẠNG GÌ Z?????????????????????
	MA_NV CHAR(6), -- kHÓA NGOẠI
	MA_KH CHAR(6), -- KHÓA NGOẠI
	CONSTRAINT PK_PHIEU_DANG_KY PRIMARY KEY (MA_PDK)
)
GO

--7
CREATE TABLE CHI_TIET_DANG_KY(
	MA_PDK CHAR(6),
	MA_LICH CHAR(6),
	SOLUONGTHISINH INT NOT NULL,
	CONSTRAINT PK_CHI_TIET_DANG_KY PRIMARY KEY (MA_PDK, MA_LICH) -- KHÓA NGOẠI
)
GO

-- 8
CREATE TABLE PHIEU_THANH_TOAN (
    MA_PTT CHAR(6), -- TT0001
	TINHTRANG VARCHAR(20) CHECK(TINHTRANG IN (N'Đã thanh toán',N'Chưa thanh toán')), 
    NGAYLAP DATE NOT NULL,
	MA_NV CHAR(6), -- KHÓA NGOẠI
	MA_PDK CHAR(6), -- KHÓA NGOẠI
	CONSTRAINT PK_PHIEU_THANH_TOAN PRIMARY KEY (MA_PTT)
)
GO

-- 9
CREATE TABLE CHUNG_CHI (
    MA_CC CHAR(6), --CC0001
	NGAYCAP DATE NOT NULL, 
    KETQUA INT,
	TRANGTHAI NVARCHAR(20) CHECK(TRANGTHAI IN (N'Đã nhận',N'Chưa nhận',N'-')),
	MA_TS CHAR(6), -- KHÓA NGOẠI
	MA_NV CHAR(6), -- KHÓA NGOẠI
	CONSTRAINT PK_CHUNG_CHI PRIMARY KEY (MA_CC)
)
GO

-- 10
CREATE TABLE PHONG_THI (
    MA_PHONG CHAR(6), -- PT0001
	TENPHONG NVARCHAR(20) UNIQUE NOT NULL ,
	TRANGTHAI NVARCHAR(20) CHECK(TRANGTHAI IN (N'Trống',N'Đầy',N'Chưa đầy')),
	SOGHETOIDA INT NOT NULL CHECK(SOGHETOIDA > 0),
	SOGHETRONG INT NOT NULL CHECK(SOGHETRONG >= 0 AND SOGHETRONG <= SOGHETOIDA)
	CONSTRAINT PK_PHONG_THI PRIMARY KEY (MA_PHONG)
)
GO

-- 11
CREATE TABLE LICH_THI (
    MA_LICH CHAR(6),
	NGAYTHI DATE NOT NULL,
	GIOTHI TIME NOT NULL,
	MA_LOAI CHAR(6), -- KHÓA NGOẠI
	CONSTRAINT PK_LICH_THI PRIMARY KEY (MA_LICH)
)
GO

-- 12
CREATE TABLE CHI_TIET_LICH_THI (
    MA_LICH CHAR(6), -- KHÓA NGOẠI
	MA_PHONG CHAR(6), -- KHÓA NGOẠI
	CONSTRAINT PK_CHI_TIET_LICH_THI PRIMARY KEY (MA_LICH, MA_PHONG)
)
GO

-- 13
CREATE TABLE LOAI_DGNL (
    MA_LOAI CHAR(6),
	TENLOAI VARCHAR(20) NOT NULL,
	GIATIEN INT NOT NULL CHECK(GIATIEN > 0),
	CONSTRAINT PK_LOAI_DGNL PRIMARY KEY (MA_LOAI)
)
GO

/*---------------PHẦN CÀI ĐẶT KHÓA NGOẠI-------------------------*/
-- 2
ALTER TABLE THI_SINH
ADD 
CONSTRAINT FK_THISINH_KHACHHANG FOREIGN KEY (MA_KH) REFERENCES KHACH_HANG(MA_KH)
GO

-- 3
ALTER TABLE KHACH_HANG_TUDO
ADD 
CONSTRAINT FK_KHACHHANGTUDO_KHACHHANG FOREIGN KEY (MA_KHTD) REFERENCES KHACH_HANG(MA_KH)
GO
-- 4
ALTER TABLE KHACH_HANG_DONVI
ADD 
CONSTRAINT FK_KHACHHANGDONVI_KHACHHANG FOREIGN KEY (MA_KHDV) REFERENCES KHACH_HANG(MA_KH)
GO
-- 5
ALTER TABLE PHIEU_GIA_HAN
ADD 
CONSTRAINT FK_PHIEUGIAHAN_NHANVIEN FOREIGN KEY (MA_NV) REFERENCES NHAN_VIEN(MA_NV),
CONSTRAINT FK_PHIEUGIAHAN_THISINH FOREIGN KEY (MA_TS) REFERENCES THI_SINH(MA_TS);
GO

-- 6
ALTER TABLE PHIEU_DANG_KY
ADD 
CONSTRAINT FK_PHIEUDANGKY_NHANVIEN FOREIGN KEY (MA_NV) REFERENCES NHAN_VIEN(MA_NV),
CONSTRAINT FK_PHIEUDANGKY_KHACHHANG FOREIGN KEY (MA_KH) REFERENCES KHACH_HANG(MA_KH);
GO

--7 
ALTER TABLE CHI_TIET_DANG_KY
ADD 
CONSTRAINT FK_CHITIETDANGKY_PHIEUDANGKY FOREIGN KEY (MA_PDK) REFERENCES PHIEU_DANG_KY(MA_PDK),
CONSTRAINT FK_CHITIETDANGKY_LICHTHI FOREIGN KEY (MA_LICH) REFERENCES LICH_THI(MA_LICH);
GO

--8
ALTER TABLE PHIEU_THANH_TOAN
ADD 
CONSTRAINT FK_PHIEUTHANHTOAN_PHIEUDANGKY FOREIGN KEY (MA_PDK) REFERENCES PHIEU_DANG_KY(MA_PDK),
CONSTRAINT FK_PHIEUTHANHTOAN_NHANVIEN FOREIGN KEY (MA_NV) REFERENCES NHAN_VIEN(MA_NV);
GO

--9
ALTER TABLE CHUNG_CHI
ADD 
CONSTRAINT FK_CHUNGCHI_THISINH FOREIGN KEY (MA_TS) REFERENCES THI_SINH(MA_TS),
CONSTRAINT FK_CHUNGCHI_NHANVIEN FOREIGN KEY (MA_NV) REFERENCES NHAN_VIEN(MA_NV);
GO

-- 11
ALTER TABLE LICH_THI
ADD 
CONSTRAINT FK_LICHTHI_LOAIDGNL FOREIGN KEY (MA_LOAI) REFERENCES LOAI_DGNL(MA_LOAI)
GO

-- 12
ALTER TABLE CHI_TIET_LICH_THI
ADD 
CONSTRAINT FK_CHITIETLICHTHI_LICHTHI FOREIGN KEY (MA_LICH) REFERENCES LICH_THI(MA_LICH),
CONSTRAINT FK_CHITIETLICHTHI_PHONGTHI FOREIGN KEY (MA_PHONG) REFERENCES PHONG_THI(MA_PHONG);
GO