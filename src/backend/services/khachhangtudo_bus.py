from dao.khachhangtudo_dao import KhachHangTuDoDAO

class KhachHangTuDoBUS:
    @staticmethod
    def tim_theo_cccd(cccd):
        # Gọi DAO để lấy danh sách thí sinh theo CCCD
        results = KhachHangTuDoDAO.tim_theo_cccd(cccd)
        if not results:
            return {"error": "Không tìm thấy thông tin thí sinh với CCCD này"}
        return results

    @staticmethod
    def tim_theo_ma_ts(ma_ts):
        # Gọi DAO để lấy danh sách thí sinh theo mã thí sinh
        results = KhachHangTuDoDAO.tim_theo_ma_ts(ma_ts)
        if not results:
            return {"error": "Không tìm thấy thông tin thí sinh với mã thí sinh này"}
        return results

    @staticmethod
    def tim_theo_ten(hoten):
        # Gọi DAO để lấy danh sách thí sinh theo tên
        results = KhachHangTuDoDAO.tim_theo_ten(hoten)
        if not results:
            return {"error": "Không tìm thấy thông tin thí sinh với tên này"}
        return results

    @staticmethod
    def tim_theo_ma_ptt(ma_ptt):
        # Gọi DAO để lấy thông tin thí sinh theo mã phiếu thanh toán
        results = KhachHangTuDoDAO.tim_theo_ma_ptt(ma_ptt)
        if not results:
            return {"error": "Không tìm thấy thông tin thí sinh với mã phiếu thanh toán này"}
        return results

   
