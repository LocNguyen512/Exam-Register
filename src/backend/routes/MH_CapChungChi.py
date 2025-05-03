from flask import Blueprint, jsonify, request
from services.chungchi_bus import ChungChiBUS
from middlewares.auth_decorator import login_required
capchungchi_bp = Blueprint('Capchungchi', __name__)


@capchungchi_bp.route('/updateTrangThai', methods=['POST'])
@login_required
def capnhat_trang_thai_chung_chi():
    try:
        data = request.get_json()
        ma_chung_chi = data.get("ma_chung_chi")
        trang_thai_moi = data.get("trang_thai_moi")

        if not ma_chung_chi or not trang_thai_moi:
            return jsonify({"error": "Thiếu dữ liệu cần thiết"}), 400

        result = ChungChiBUS.CapNhatTrangThaiChungChi(ma_chung_chi, trang_thai_moi)

        if result.get("success"):
            return jsonify(result), 200
        else:
            return jsonify(result), 400

    except Exception as e:
        print(f"Lỗi khi cập nhật trạng thái chứng chỉ: {e}")
        return jsonify({"error": "Lỗi hệ thống"}), 500


@capchungchi_bp.route('/updateNote', methods=['POST'])
def cap_nhat_ghi_chu():
    data = request.get_json()
    ma_cc = data.get('ma_chung_chi')
    ghi_chu = data.get('ghi_chu')

    result = ChungChiBUS.CapNhatGhiChuChungChi(ma_cc, ghi_chu)
    return jsonify(result), 200 if result['success'] else 400


@capchungchi_bp.route('/kiemTraCCCD', methods=['GET'])
def kiem_tra_cccd():
    cccd = request.args.get('cccd')
    result = ChungChiBUS.KiemTraTonTaiCCCD(cccd)
    return jsonify(result), 200 if result["success"] else 404
