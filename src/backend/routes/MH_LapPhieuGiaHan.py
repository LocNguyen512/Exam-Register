from flask import Blueprint, request, jsonify
from services.phieugiahan_bus import phieugiahanBUS

phieugiahan_bp = Blueprint("phieugiahan", __name__)

@phieugiahan_bp.route("/lay-phieu", methods=["POST"])
def lay_phieu():
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
