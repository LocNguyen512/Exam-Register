from flask import request, jsonify
from sqlalchemy import text
from extensions import db

def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify(msg="Thiếu email hoặc mật khẩu"), 400

    try:
        result = db.session.execute(
            text("EXEC SP_LOGIN :email, :password"),
            {"email": email, "password": password}
        )
        row = result.fetchone()

        if row:
            return jsonify(
                ma_nv=row.MA_NV,
                hoten=row.HOTEN,
                loainv=row.VaiTro
            ), 200
        else:
            return jsonify(msg="Email hoặc mật khẩu không đúng"), 401

    except Exception as e:
        return jsonify(msg=f"Lỗi khi đăng nhập: {str(e)}"), 500