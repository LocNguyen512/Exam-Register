from dao.phieugiahan_dao import phieugiahanDAO

class phieugiahanBUS:
    @staticmethod
    def tao_phieu_gia_han(sobaodanh, mon, truong_hop, ma_nvtn, ma_nvkt):
        phieugiahanDAO.tao_phieu_gia_han(sobaodanh, mon, truong_hop, ma_nvtn, ma_nvkt)
    
    @staticmethod
    def LayPhieuChuaThanhToan(cccd):
        if not cccd:
            raise ValueError("Thiếu CCCD")
        return phieugiahanDAO.lay_phieu_gia_han_chua_thanh_toan(cccd)
    
    @staticmethod
    def CapNhatThanhToan(ma_phieu):
        if not ma_phieu:
            raise ValueError("Thiếu mã phiếu")
        phieugiahanDAO.cap_nhat_tinh_trang_thanh_toan(ma_phieu)

