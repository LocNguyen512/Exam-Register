from dao.loaidgnl_dao import LoaiDGNLDAO

class LoaiDGNLBUS:
    @staticmethod
    def lay_danh_sach_loai_dgnl():
        """
        Lấy danh sách loại đánh giá năng lực từ DAO.
        """
        return LoaiDGNLDAO.doc_danh_sach_loai()