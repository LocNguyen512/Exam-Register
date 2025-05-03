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
    def CapNhatThanhToan(ma_phieu, ma_nvkt):
        print("Cập nhật thanh toán cho phiếu:", ma_phieu, "bởi nhân viên kế toán:", ma_nvkt)    
        if not ma_phieu or not ma_nvkt:
            raise ValueError("Thiếu mã phiếu hoặc mã nhân viên kế toán")
        phieugiahanDAO.cap_nhat_tinh_trang_thanh_toan(ma_phieu, ma_nvkt)