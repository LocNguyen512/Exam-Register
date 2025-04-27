from dao.lichthi_dao import LichThiDAO

class LichThiBUS:
    @staticmethod
    def LayDSLichThi(ten_loai=None):
        """
        Gọi DAO để lấy danh sách lịch thi theo tên loại (nếu có).
        """
        return LichThiDAO.DocDSLich(ten_loai)