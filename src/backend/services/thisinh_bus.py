import re
from datetime import datetime
from dao.thisinh_dao import ThiSinhDAO
# Regex: tên chỉ gồm chữ cái, khoảng trắng, dấu tiếng Việt (Unicode chữ thường/hoa)
NAME_REGEX = re.compile(r"^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểẾỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸỳỵỷỹ\s]+$")

def calculate_age(dob_str):
    try:
        dob = datetime.strptime(dob_str, '%Y-%m-%d')
        today = datetime.today()
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        return age
    except ValueError:
        return -1  # sai format ngày
    




class ThiSinhBUS:
    @staticmethod
    def ThemThiSinh(ho_ten, cccd, ngay_sinh, sdt, email):
        return ThiSinhDAO.ThemTS(ho_ten, cccd, ngay_sinh, sdt, email)
    
    @staticmethod
    def KiemTraThongTin(customer, candidate):
        required_customer_fields = ['fullName', 'phone', 'email']
        for field in required_customer_fields:
            if not customer.get(field, '').strip():
                return f"Trường '{field}' của khách hàng không được để trống."

        full_name = customer['fullName'].strip()
        if not NAME_REGEX.match(full_name):
            return "Tên khách hàng không hợp lệ (chỉ cho phép chữ cái và khoảng trắng)."
        if len(full_name) > 50:
            return "Tên khách hàng không được vượt quá 50 ký tự."

        if not re.fullmatch(r'\d{10}', customer['phone']):
            return "Số điện thoại khách hàng phải có đúng 10 chữ số."

        if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', customer['email']):
            return "Email khách hàng không đúng định dạng."
        if len(customer['email']) > 50:
            return "Email khách hàng không được vượt quá 50 ký tự."

        # === Thí sinh ===
        required_candidate_fields = ['fullName', 'dob', 'phone', 'email', 'cccd']
        for field in required_candidate_fields:
            if not candidate.get(field, '').strip():
                return f"Trường '{field}' của thí sinh không được để trống."

        can_name = candidate['fullName'].strip()
        if not NAME_REGEX.match(can_name):
            return "Tên thí sinh không hợp lệ (chỉ cho phép chữ cái và khoảng trắng)."
        if len(can_name) > 50:
            return "Tên thí sinh không được vượt quá 50 ký tự."

        age = calculate_age(candidate['dob'])
        if age < 0:
            return "Ngày sinh thí sinh không hợp lệ."
        if age < 10:
            return "Thí sinh phải từ 10 tuổi trở lên."

        if not re.fullmatch(r'\d{10}', candidate['phone']):
            return "Số điện thoại thí sinh phải có đúng 10 chữ số."

        if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', candidate['email']):
            return "Email thí sinh không đúng định dạng."
        if len(candidate['email']) > 50:
            return "Email thí sinh không được vượt quá 50 ký tự."

        if not re.fullmatch(r'\d{12}', candidate['cccd']):
            return "CCCD phải đủ 12 chữ số."

        return None  # ✅ Hợp lệ
    @staticmethod
    def LayThongTinThiSinhVaChungChiTheoSBD(sobaodanh):
        try:
            if not sobaodanh:
                raise ValueError("Thiếu số báo danh")

            info = ThiSinhDAO.get_thong_tin_thi_sinh_theo_sbd(sobaodanh)
            if not info:
                return None

            dang_ky = ThiSinhDAO.get_danh_sach_chung_chi_theo_sbd(sobaodanh)
            return {"info": info, "dangKy": dang_ky}
        except Exception as e:
            print("Lỗi khi tra cứu thông tin theo SBD:", str(e))
            raise e
    
    @staticmethod
    def KiemTraDieuKienGiaHanTheoSBD(sobaodanh):
        if not sobaodanh:
            raise ValueError("Thiếu số báo danh")

        try:
            # ❶ Lấy số lần gia hạn
            so_lan = ThiSinhDAO.lay_so_lan_gia_han(sobaodanh)
            if so_lan >= 2:
                return {"hop_le": 0, "thong_bao": "Thí sinh đã gia hạn tối đa 2 lần"}

            # ❷ Lấy ngày thi
            ngay_thi = ThiSinhDAO.lay_ngay_thi_theo_sbd(sobaodanh)
            if not ngay_thi:
                return {"hop_le": 0, "thong_bao": "Không tìm thấy ngày thi"}

            # ❸ So sánh ngày
            ngay_thi_dt = datetime.strptime(str(ngay_thi), "%Y-%m-%d").date()
            hom_nay = datetime.today().date()
            khoang_cach = (ngay_thi_dt - hom_nay).days

            if khoang_cach < 2:
                return {"hop_le": 0, "thong_bao": "Không được gia hạn trong vòng 2 ngày trước ngày thi"}

            # ✅ Đủ điều kiện
            return {"hop_le": 1, "thong_bao": "Đủ điều kiện gia hạn"}

        except Exception as e:
            print("Lỗi kiểm tra điều kiện gia hạn:", str(e))
            raise e
