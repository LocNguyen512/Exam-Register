from dao.phieudangky_dao import PhieuDangKyDAO  
from datetime import datetime
class PhieuDangKyBus:
    @staticmethod
    def KiemTraDSDangKy(current_items, new_item):
        """
        Kiểm tra nghiệp vụ khi thêm 1 mục đăng ký.
        """
        if len(current_items) >= 3:
            raise Exception("Chỉ được đăng ký tối đa 3 chứng chỉ trong 1 phiếu.")

        cert_name = new_item.get("certName")
        ma_lich_thi = new_item.get("maLichThi")

        if not cert_name or not ma_lich_thi:
            raise Exception("Thiếu thông tin chứng chỉ hoặc lịch thi.")

        # Kiểm tra trùng loại chứng chỉ
        for item in current_items:
            if item.get("certName") == cert_name:
                raise Exception(f"Bạn đã đăng ký chứng chỉ '{cert_name}' rồi.")

        # Kiểm tra trùng lịch thi
        for item in current_items:
            if item.get("certName") == cert_name and item.get("maLichThi") == ma_lich_thi:
                raise Exception(f"Bạn đã đăng ký lịch thi này cho chứng chỉ '{cert_name}'.")

        # Nếu không lỗi thì trả về OK
        return {"message": "Hợp lệ, thêm được."}

    @staticmethod
    def ThemPhieuDangKy(ma_nv, ma_kh, so_luong):
        return PhieuDangKyDAO.ThemPhieuDangKy(ma_nv, ma_kh, so_luong)
    
    @staticmethod
    def KiemTraPDK(ma_pdk):
        # Lấy thông tin phiếu (gồm LOAIKH và NGAYLAP)
        phieu = PhieuDangKyDAO.lay_thong_tin_phieu(ma_pdk)
        if not phieu:
            raise Exception("❌ Không tìm thấy phiếu")

        if phieu["LOAIKH"] != "Tự do":
            raise Exception("❌ Phiếu không thuộc về khách hàng cá nhân (tự do)")

        ngay_lap = phieu["NGAYLAP"]
        so_ngay = (datetime.now().date() - ngay_lap).days
        if so_ngay > 3:
            raise Exception(f"❌ Phiếu lập đã quá {so_ngay} ngày (> 3 ngày)")
        return phieu  # hoặc tiếp tục xử lý khác

        