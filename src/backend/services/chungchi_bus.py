from dao.chungchi_dao import ChungChiDAO  # Đường dẫn bạn có thể chỉnh lại nếu khác

class ChungChiBUS:
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
            
    
    @staticmethod
    def CapNhatTrangThaiChungChi(ma_chung_chi, trang_thai_moi):
        if not ma_chung_chi or not trang_thai_moi:
            return {"success": False, "message": "Mã chứng chỉ và trạng thái mới không được để trống"}

        trang_thai_hop_le = ['Đã nhận', 'Chưa nhận', '-']
        if trang_thai_moi not in trang_thai_hop_le:
            return {"success": False, "message": f"Trạng thái không hợp lệ. Chỉ chấp nhận: {', '.join(trang_thai_hop_le)}"}

        ket_qua = ChungChiDAO.CapNhatTrangThaiChungChi(ma_chung_chi, trang_thai_moi)
        if ket_qua is True:
            return {"success": True, "message": "Cập nhật trạng thái thành công"}
        else:
            return {"success": False, "message": f"Cập nhật thất bại: {ket_qua}"}


    @staticmethod
    def CapNhatGhiChuChungChi(ma_chung_chi, ghi_chu_moi):
        if not ma_chung_chi:
            return {"success": False, "message": "Mã chứng chỉ không được để trống"}
        # Gọi DAO để cập nhật ghi chú
        ket_qua = ChungChiDAO.CapNhatGhiChuChungChi(ma_chung_chi, ghi_chu_moi)
        if ket_qua is True:
            return {"success": True, "message": "Cập nhật ghi chú thành công"}
        else:
            return {"success": False, "message": f"Cập nhật ghi chú thất bại: {ket_qua}"}
