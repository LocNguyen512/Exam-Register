from flask import request, jsonify
from sqlalchemy import text
from extensions import db
from dao.user_dao import DocThongTinUser

def KiemTraUserPassword(email, password):
    user = DocThongTinUser(email, password)
    if user:
        return {
            "MaNV": user.MA_NV,
            "HoTen": user.HOTEN,
            "VaiTro": user.VaiTro  # alias từ SP
        }
    return None