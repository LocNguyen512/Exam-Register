from flask import Blueprint, request, jsonify

thongbao_bp = Blueprint('Thongbao', __name__)

class ThongBaoController:
    def ThongBao(self, message):
        """
        Hiển thị thông báo cho người dùng.
        """
        print(message) 