from dao.phieuthanhtoan_dao import PhieuThanhToanDAO

class PhieuThanhToanBUS:
    @staticmethod
    def cap_nhat_tinh_trang_thanh_toan(ma_pdk, ma_nv):
        
        if not ma_pdk or not ma_nv:
            return {"success": False, "message": "Thiếu mã phiếu thanh toán hoặc tình trạng."}
        
        return PhieuThanhToanDAO.cap_nhat_tinh_trang_thanh_toan(ma_pdk, ma_nv)

    
    @staticmethod
    def LayTinhTrang(ma_pdk):
        return PhieuThanhToanDAO.lay_tinh_trang_theo_ma_pdk(ma_pdk)

    @staticmethod
    def TaoPhieu(ma_pdk):
        PhieuThanhToanDAO.insert_phieu_thanh_toan(ma_pdk)
