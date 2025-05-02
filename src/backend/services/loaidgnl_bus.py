from dao.loaidgnl_dao import LoaiDGNLDAO

class LoaiDGNLBUS:
    @staticmethod
    def LayDSLoaiDGNL():
        """
        Lấy danh sách loại đánh giá năng lực từ DAO.
        """
        return LoaiDGNLDAO.DocDSLoai()
    
    def LayBangGia():
        """
        Lấy thông tin chi tiết loại đánh giá năng lực từ DAO.
        """
        return LoaiDGNLDAO.LayTTChiTiet()