from dao.chitietdangky_dao import ChiTietDangKyDAO

class ChiTietDangKyBUS:
    @staticmethod
    def ThemChiTietPhieuDangKy(ma_pdk, ma_ts, ma_phong, ma_lich):
        ChiTietDangKyDAO.ThemChiTietPhieuDangKy(ma_pdk, ma_ts, ma_phong, ma_lich)

    @staticmethod
    def LayDSMonThi(ma_pdk):
        if not ma_pdk:
            raise ValueError("Mã phiếu đăng ký không hợp lệ")
        return ChiTietDangKyDAO.LayDSMonThi(ma_pdk)
    # Linh them
    @staticmethod
    def LayMonThi(ma_pdk):
        return ChiTietDangKyDAO.get_mon_thi_by_ma_pdk(ma_pdk)
    # Khach hang tu do
    @staticmethod
    def tim_chungchi_theo_cccd(cccd):
        # Gọi DAO để lấy danh sách chứng chỉ theo CCCD
        results = ChiTietDangKyDAO.tim_chungchi_theo_cccd(cccd)
        if not results:
            return {"error": "Không tìm thấy chứng chỉ cho thí sinh với CCCD này"}
        return results

    @staticmethod
    def tim_chungchi_theo_ma_ts(ma_ts):
        # Gọi DAO để lấy danh sách chứng chỉ theo mã thí sinh
        results = ChiTietDangKyDAO.tim_chungchi_theo_ma_ts(ma_ts)
        if not results:
            return {"error": "Không tìm thấy chứng chỉ cho thí sinh với mã thí sinh này"}
        return results

    @staticmethod
    def tim_chungchi_theo_ten(hoten):
        # Gọi DAO để lấy danh sách chứng chỉ theo tên
        results = ChiTietDangKyDAO.tim_chungchi_theo_ten(hoten)
        if not results:
            return {"error": "Không tìm thấy chứng chỉ cho thí sinh với tên này"}
        return results

    @staticmethod
    def tim_chungchicanhan_theo_ma_ptt(ma_ptt):
        # Gọi DAO để lấy danh sách chứng chỉ theo mã phiếu thanh toán
        results = ChiTietDangKyDAO.tim_chungchi_theo_ma_ptt(ma_ptt)
        if not results:
            return {"error": "Không tìm thấy chứng chỉ cho thí sinh với mã phiếu thanh toán này"}
        return results

    # Khach hang don vi
    @staticmethod
    def tim_chungchi_theo_ma_dv(ma_kh):
        """
        Tìm kiếm chứng chỉ của đơn vị theo mã khách hàng (mã đơn vị)
        """
        # Gọi DAO để lấy danh sách chứng chỉ của đơn vị theo mã đơn vị
        results = ChiTietDangKyDAO.tim_chungchi_theo_ma_dv(ma_kh)
        if not results:
            return {"error": "Không tìm thấy chứng chỉ cho đơn vị với mã đơn vị này"}
        return results

    @staticmethod
    def tim_chungchi_theo_ten_donvi(ten_donvi):
        """
        Tìm kiếm chứng chỉ của đơn vị theo tên đơn vị
        """
        # Gọi DAO để lấy danh sách chứng chỉ của đơn vị theo tên đơn vị
        results = ChiTietDangKyDAO.tim_chungchi_theo_ten_donvi(ten_donvi)
        if not results:
            return {"error": "Không tìm thấy chứng chỉ cho đơn vị với tên này"}
        return results

    @staticmethod
    def tim_chungchi_theo_ma_ptt_dv(ma_ptt):
        """
        Tìm kiếm chứng chỉ của đơn vị theo mã phiếu thanh toán
        """
        # Gọi DAO để lấy danh sách chứng chỉ của đơn vị theo mã phiếu thanh toán
        results = ChiTietDangKyDAO.tim_chungchi_theo_ma_ptt(ma_ptt)
        if not results:
            return {"error": "Không tìm thấy chứng chỉ cho phiếu thanh toán với mã này"}
        return results
    
    @staticmethod
    def cap_nhat_lich_thi_gia_han(sobaodanh, mon, ngay_thi):
        ChiTietDangKyDAO.cap_nhat_lich_thi_gia_han(sobaodanh, mon, ngay_thi)

    @staticmethod
    def cap_nhat_so_lan_gia_han(sobaodanh):
        ChiTietDangKyDAO.cap_nhat_so_lan_gia_han(sobaodanh)

    @staticmethod
    def xoa_sbd_cu(sobaodanh):
        ChiTietDangKyDAO.xoa_sbd_cu(sobaodanh)