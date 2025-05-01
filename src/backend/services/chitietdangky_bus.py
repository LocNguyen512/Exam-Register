from dao.chitietdangky_dao import ChiTietDangKyDAO

class ChiTietDangKyBUS:
    @staticmethod
    def ThemChiTietPhieuDangKy(ma_pdk, ma_ts, ma_phong, ma_lich):
        ChiTietDangKyDAO.ThemChiTietPhieuDangKy(ma_pdk, ma_ts, ma_phong, ma_lich)
    
    @staticmethod
    def cap_nhat_lich_thi_gia_han(sobaodanh, mon, ngay_thi):
        ChiTietDangKyDAO.cap_nhat_lich_thi_gia_han(sobaodanh, mon, ngay_thi)

    @staticmethod
    def cap_nhat_so_lan_gia_han(sobaodanh):
        ChiTietDangKyDAO.cap_nhat_so_lan_gia_han(sobaodanh)

    @staticmethod
    def xoa_sbd_cu(sobaodanh):
        ChiTietDangKyDAO.xoa_sbd_cu(sobaodanh)
