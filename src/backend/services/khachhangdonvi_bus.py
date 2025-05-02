from dao.khachhangdonvi_dao import KhachHangDonViDAO

class KhachHangDonViBUS:

    @staticmethod
    def tim_kiem_theo_ten_don_vi(ten_don_vi):
        try:
            return KhachHangDonViDAO.tim_kiem_theo_ten_don_vi(ten_don_vi)
        except Exception as e:
            print(f"Lỗi khi tìm theo tên đơn vị: {e}")
            return []

    @staticmethod
    def tim_kiem_theo_ma_kh(ma_kh):
        try:
            return KhachHangDonViDAO.tim_kiem_theo_ma_kh(ma_kh)
        except Exception as e:
            print(f"Lỗi khi tìm theo mã khách hàng đơn vị: {e}")
            return []

    @staticmethod
    def tim_kiem_theo_ma_ptt(ma_ptt):
        try:
            return KhachHangDonViDAO.tim_kiem_theo_ma_ptt(ma_ptt)
        except Exception as e:
            print(f"Lỗi khi tìm theo mã phiếu thanh toán: {e}")
            return []
