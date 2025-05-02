from flask import Blueprint, request, jsonify
from services.lichthi_bus import LichThiBUS

loadlichthi_bp = Blueprint("Chonlichthi", __name__)

@loadlichthi_bp.route("/ngaycontrong", methods=["GET"])
def MH_ChonLichThiLoad():
    try:
        mon_thi = request.args.get("monThi")

        if not mon_thi:
            return jsonify({"error": "Thiếu môn thi"}), 400

        danh_sach_ngay = LichThiBUS.lay_danh_sach_ngay_con_trong(mon_thi)
        return jsonify(danh_sach_ngay), 200
    except Exception as e:
        print("Lỗi API lấy lịch thi:", str(e))
        return jsonify({"error": str(e)}), 500
