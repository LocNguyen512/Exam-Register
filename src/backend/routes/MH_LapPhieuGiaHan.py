from flask import Blueprint, request, jsonify
from services.phieugiahan_bus import phieugiahanBUS
from middlewares.auth_decorator import login_required
phieugiahan_bp = Blueprint("phieugiahan", __name__)

@phieugiahan_bp.route("/lay-phieu", methods=["POST"])
@login_required
def MH_LapPhieuLoad():
    try:
        data = request.get_json()
        cccd = data.get("cccd")
        if not cccd:
            return jsonify({"error": "Thiếu CCCD"}), 400
        phieu = phieugiahanBUS.LayPhieuChuaThanhToan(cccd)
        if phieu:
            return jsonify(phieu), 200
        else:
            return jsonify({"message": "Không có phiếu chưa thanh toán"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@phieugiahan_bp.route("/cap-nhat-thanh-toan", methods=["POST"])
def Button_XacNhanThanhToan_Click():
    try:
        data = request.get_json()
        ma_phieu = data.get("ma_phieu")
        ma_nv = data.get("ma_nvkt")
        phieugiahanBUS.CapNhatThanhToan(ma_phieu, ma_nv)
        return jsonify({"message": "Cập nhật tình trạng thành công!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500