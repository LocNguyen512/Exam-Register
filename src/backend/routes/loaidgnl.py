from flask import Blueprint, request, jsonify
from services.loaidgnl_bus import LoaiDGNLBUS
import traceback

loaidgnl_bp = Blueprint('loaidgnl', __name__)

class LoaiDGNLController:
    @staticmethod
    @loaidgnl_bp.route("/docds_dgnl", methods=["GET"])
    def get_certificates():
        """
        API lấy danh sách loại đánh giá năng lực (DGNL).
        """
        try:
            certificates = LoaiDGNLBUS.lay_danh_sach_loai_dgnl()
            return jsonify(certificates)
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500