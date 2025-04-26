from dao.chitietdangky_dao import ChiTietDangKyDAO

class ChiTietDangKyBUS:
    @staticmethod
    def ThemChiTietPhieuDangKy(ma_pdk, ma_ts, ma_phong, ma_lich):
        ChiTietDangKyDAO.ThemChiTietPhieuDangKy(ma_pdk, ma_ts, ma_phong, ma_lich)
