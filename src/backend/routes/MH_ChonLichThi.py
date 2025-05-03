from flask import Blueprint, request, jsonify
from services.lichthi_bus import LichThiBUS
from middlewares.auth_decorator import login_required

loadlichthi_bp = Blueprint("Chonlichthi", __name__)

@loadlichthi_bp.route("/ngaycontrong", methods=["GET"])
@login_required
def MH_ChonLichThiLoad():
    try:
        mon_thi = request.args.get("monThi")
        sobaodanh = request.args.get("sobaodanh")

    
        if not mon_thi or not sobaodanh:
            return jsonify({"error": "Thiếu dữ liệu"}), 400


        danh_sach_ngay = LichThiBUS.lay_danh_sach_ngay_con_trong(mon_thi, sobaodanh)
        return jsonify(danh_sach_ngay), 200
    except Exception as e:
        print("Lỗi API lấy lịch thi:", str(e))