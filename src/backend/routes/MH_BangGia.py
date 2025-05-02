from flask import Blueprint, request, jsonify
from services.user_bus import UserBus
from services.loaidgnl_bus import LoaiDGNLBUS

banggia_bp = Blueprint('bangGia', __name__)

class MH_BangGia:
    @staticmethod
    @banggia_bp.route("/laybanggia", methods=["GET"])
    def LayBangGia():
        """
        API lấy bảng giá từ dịch vụ.
        """
        try:
            bang_gia = LoaiDGNLBUS.LayBangGia()
            return jsonify(bang_gia), 200
        except Exception as e:
            print("Lỗi khi lấy bảng giá:", str(e))
            return jsonify({"error": str(e)}), 500  