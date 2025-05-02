from dao.loaidgnl_dao import LoaiDGNLDAO

class LoaiDGNLBUS:
    @staticmethod
    def LayDSLoaiDGNL():
        """
        Lấy danh sách loại đánh giá năng lực từ DAO.
        """
        return LoaiDGNLDAO.DocDSLoai()