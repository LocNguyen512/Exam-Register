from flask import request, jsonify
from sqlalchemy import text
from extensions import db
from dao.user_dao import UserDAO

class UserBus:
    @staticmethod
    def KiemTraUserPassword(email, password):
        """
        Kiểm tra thông tin người dùng.
        :param email: Email của người dùng.
        :param password: Mật khẩu của người dùng.
        :return: Thông tin người dùng nếu thành công, None nếu thất bại.
        """
        try:            # Gọi phương thức từ DAO để kiểm tra thông tin người dùng
            user = UserDAO.DocThongTinUser(email, password)
            if user:
                return {
                    "MaNV": user.MA_NV,
                    "HoTen": user.HOTEN,
                    "VaiTro": user.VaiTro  # alias từ SP
                }
            return None
        except Exception as e:
            print("Lỗi khi kiểm tra thông tin người dùng:", str(e))
            raise e
