from dao.khachhang_dao import KhachHangDAO

class KhachHangBUS:
    @staticmethod
    def ThemKhachHang(ho_ten, sdt, email):
        return KhachHangDAO.LuuThongTinKhachHang(ho_ten, sdt, email)
