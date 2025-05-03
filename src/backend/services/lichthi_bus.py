from dao.lichthi_dao import LichThiDAO
from middlewares.auth_decorator import login_required
class LichThiBUS:
    @staticmethod
    def LayDSLichThi(ten_loai=None):
        """
        Gọi DAO để lấy danh sách lịch thi theo tên loại (nếu có).
        """
        return LichThiDAO.DocDSLich(ten_loai)
    
    @staticmethod
    @login_required
    def lay_danh_sach_ngay_con_trong(mon_thi, sobaodanh):
         if not mon_thi or not sobaodanh:
             raise ValueError("Thiếu dữ liệu")
         return LichThiDAO.lay_ngay_thi_con_trong(mon_thi, sobaodanh)