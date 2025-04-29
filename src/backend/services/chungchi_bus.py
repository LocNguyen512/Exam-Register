from dao.chungchi_dao import ChungChiDAO  # Đường dẫn bạn có thể chỉnh lại nếu khác

class ChungChiService:
    @staticmethod
    def LayDanhSachChungChi():
        """
        Lấy toàn bộ thông tin chứng chỉ từ stored procedure.
        """
        data = ChungChiDAO.DocDSChungChi()
        if data is not None:
            return {
                "success": True,
                "data": data
            }
        else:
            return {
                "success": False,
                "message": "Không thể lấy dữ liệu chứng chỉ."
            }
            
    @staticmethod
    def TimChungChiTheoCCCD(cccd):
        try:
            # Gọi phương thức DAO để tìm chứng chỉ theo CCCD
            ketqua = ChungChiDAO.TimChungChiTheoCCCD(cccd)
            if ketqua:
                return ketqua
            else:
                return {'message': 'Không tìm thấy chứng chỉ nào cho CCCD này.'}
        except Exception as e:
            print(f"Lỗi trong business logic: {e}")
            return {'error': 'Có lỗi xảy ra khi xử lý yêu cầu.'}
        
        
    @staticmethod
    def ThemChungChi(mon_thi, ngay_cap, ket_qua, cccd_thi_sinh, ma_nhan_vien):
        try:
            result = ChungChiDAO.ThemChungChi(mon_thi, ngay_cap, ket_qua, cccd_thi_sinh, ma_nhan_vien)
            if result:
                return {
                    "success": True,
                    "message": "Thêm chứng chỉ thành công."
                }
            else:
                return {
                    "success": False,
                    "message": "Không thể thêm chứng chỉ. Có thể chứng chỉ đã tồn tại hoặc dữ liệu không hợp lệ."
                }
        except Exception as e:
            print(f"Lỗi trong business logic khi thêm chứng chỉ: {e}")
            return {
                "success": False,
                "message": "Đã xảy ra lỗi khi xử lý yêu cầu."
            }