from dao.lichthi_dao import LichThiDAO

class LichThiBUS:
    @staticmethod
    def LayDSLichThi(ten_loai=None):
        """
        Gọi DAO để lấy danh sách lịch thi theo tên loại (nếu có).
        """
        return LichThiDAO.DocDSLich(ten_loai)
    @staticmethod
    def lay_danh_sach_ngay_con_trong(mon_thi):
        if not mon_thi:
            raise ValueError("Thiếu tên môn thi")
        return LichThiDAO.lay_ngay_thi_con_trong(mon_thi)