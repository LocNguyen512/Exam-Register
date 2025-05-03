from flask import Blueprint, request, jsonify
from flask import session
from services.user_bus import UserBus
from flask import Blueprint, session, jsonify

dangnhap_bp = Blueprint('dangnhap', __name__)

class MH_DangNhap:
    @staticmethod
    @dangnhap_bp.route("/login", methods=["POST"])
    def btnDangNhap_click():
        try:
                
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')

            print(f"Email nhận được từ frontend: {email}")
            print(f"Mật khẩu nhận được từ frontend: {password}")

            user = UserBus.KiemTraUserPassword(email, password)
            if user:
                session['ma_nhan_vien'] = user["MaNV"]  # lưu mã nhân viên
                session['ho_ten'] = user["HoTen"]
                print(f"Mã nhân viên đã lưu trong session: {session['ma_nhan_vien']}")  
                return jsonify({
                    "success": True,
                    "user": user
                })
            else:
                return jsonify({
                    "success": False,
                    "message": "Email hoặc mật khẩu không đúng"
                }), 401
        except Exception as e:
            print("Lỗi khi xử lý yêu cầu đăng nhập:", str(e))
            return jsonify({"error": str(e)}), 500
    
    @dangnhap_bp.route('/logout', methods=['POST'])
    def logout():
        session.clear()  # Xoá toàn bộ session, bao gồm cả mã nhân viên
        return jsonify({"success": True, "message": "Đăng xuất thành công"}), 200

