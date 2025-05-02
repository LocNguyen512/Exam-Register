from dao.phieuthanhtoan_dao import PhieuThanhToanDAO

class PhieuThanhToanBUS:
    @staticmethod
    def cap_nhat_tinh_trang_thanh_toan(ma_ptt):
        if not ma_ptt :
            return {"success": False, "message": "Thiếu mã phiếu thanh toán hoặc tình trạng."}
        
        return PhieuThanhToanDAO.cap_nhat_tinh_trang_thanh_toan(ma_ptt)

    @staticmethod
    def TaoPhieuThanhToan(ma_nv, ma_pdk):
        return PhieuThanhToanDAO.them_phieu_thanh_toan(ma_nv, ma_pdk)