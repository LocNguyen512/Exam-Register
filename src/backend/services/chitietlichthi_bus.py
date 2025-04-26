from dao.chitietlichthi_dao import ChiTietLichThiDAO

class ChiTietLichThiBUS:
    @staticmethod
    def CapNhatSoGheTrong(ma_lich_thi, ma_phong):
        ChiTietLichThiDAO.CapNhatSoGheTrong(ma_lich_thi, ma_phong)