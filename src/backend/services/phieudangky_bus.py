from dao.phieudangky_dao import PhieuDangKyDAO  

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

        