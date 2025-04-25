from flask import Blueprint, request, jsonify
from services.user_bus import KiemTraUserPassword

user_bp = Blueprint('user', __name__)

@user_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    print(f"Email nhận được từ frontend: {email}")
    print(f"Mật khẩu nhận được từ frontend: {password}")
    
    user = KiemTraUserPassword(email, password)
    if user:
        return jsonify({
            "success": True,
            "user": user
        })
    else:
        return jsonify({
            "success": False,
            "message": "Email hoặc mật khẩu không đúng"
        }), 401