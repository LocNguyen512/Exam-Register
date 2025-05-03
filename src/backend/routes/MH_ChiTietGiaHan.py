from flask import Blueprint, jsonify, request
from services.thisinh_bus import ThiSinhBUS
from services.chitietdangky_bus import ChiTietDangKyBUS
from services.phieugiahan_bus import phieugiahanBUS
from extensions import db
from middlewares.auth_decorator import login_required

giahan_bp = Blueprint("QLgiahan", __name__)

@giahan_bp.route("/tra-cuu", methods=["POST"])
@login_required
def MH_ChiTietGiaHanLoad():
    try:
        data = request.get_json()
        sobaodanh = data.get("sobaodanh")
        if not sobaodanh:
            return jsonify({"error": "Thiếu số báo danh"}), 400
        result = ThiSinhBUS.LayThongTinThiSinhVaChungChiTheoSBD(sobaodanh)

        if result:
            return jsonify(result), 200
        else:
            return jsonify({"message": "Không tìm thấy thí sinh"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@giahan_bp.route("/kiem-tra-gia-han", methods=["POST"])
@login_required
def buttonGiaHanClicked():
    try:
        data = request.get_json()
        sobaodanh = data.get("sobaodanh")
        if not sobaodanh:
            return jsonify({"hop_le": 0, "thong_bao": "Thiếu số báo danh"}), 400

        result = ThiSinhBUS.KiemTraDieuKienGiaHanTheoSBD(sobaodanh)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"hop_le": 0, "thong_bao": str(e)}), 500

@giahan_bp.route("/xac-nhan-gia-han", methods=["POST"])
@login_required
def ButtonGiaHanClicked():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Thiếu dữ liệu xác nhận"}), 400

        # ❷ Cập nhật lịch thi mới
        ChiTietDangKyBUS.cap_nhat_lich_thi_gia_han(
            data["sobaodanh"], data["mon"], data["ngay_gia_han"]
        )

        # ❸ Tạo phiếu gia hạn
        phieugiahanBUS.tao_phieu_gia_han(
            data["sobaodanh"], data["mon"], data["truong_hop"], data.get("ma_nvtn"), data.get("ma_nvkt")
        )

        # ❹ Tăng số lần gia hạn
        ChiTietDangKyBUS.cap_nhat_so_lan_gia_han(data["sobaodanh"])

        # ❺ Xoá số báo danh cũ
        ChiTietDangKyBUS.xoa_sbd_cu(data["sobaodanh"])

        db.session.commit()
        return jsonify({"message": "Xác nhận gia hạn thành công"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500