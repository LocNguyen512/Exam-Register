from flask import Blueprint, jsonify, request
from services.khachhangdonvi_bus import KhachHangDonViBUS
from services.phieuthanhtoan_bus import PhieuThanhToanBUS
from services.chitietdangky_bus import ChiTietDangKyBUS

thanhtoandonvi_bp = Blueprint('thanh_toan_don_vi', __name__)

@thanhtoandonvi_bp.route('/timkiem_theo_ten_don_vi', methods=['GET'])
def tim_theo_ten_don_vi():
    ten_don_vi = request.args.get("ten_don_vi")  # Lấy tham số từ query string
    
    if not ten_don_vi:
        return jsonify({"error": "Thiếu tên đơn vị"}), 400

    ketqua = KhachHangDonViBUS.tim_kiem_theo_ten_don_vi(ten_don_vi)
    return jsonify(ketqua), 200


@thanhtoandonvi_bp.route('/timkiem_theo_ma_kh', methods=['GET'])
def tim_theo_ma_kh():
    ma_kh = request.args.get("ma_kh")  # Lấy tham số từ query string
    
    if not ma_kh:
        return jsonify({"error": "Thiếu mã khách hàng"}), 400

    ketqua = KhachHangDonViBUS.tim_kiem_theo_ma_kh(ma_kh)
    return jsonify(ketqua), 200


@thanhtoandonvi_bp.route('/timkiem_theo_ma_ptt', methods=['GET'])
def tim_theo_ma_ptt():
    ma_ptt = request.args.get("ma_ptt")  # Lấy tham số từ query string
    
    if not ma_ptt:
        return jsonify({"error": "Thiếu mã phiếu thanh toán"}), 400

    ketqua = KhachHangDonViBUS.tim_kiem_theo_ma_ptt(ma_ptt)
    return jsonify(ketqua), 200


@thanhtoandonvi_bp.route('/capnhat_trangthai_thanhtoan', methods=['POST'])
def capnhat_tinh_trang_thanh_toan():
    data = request.get_json()
    ma_ptt = data.get("ma_ptt")
    tinh_trang = data.get("tinh_trang")

    if not ma_ptt or not tinh_trang:
        return jsonify({"success": False, "message": "Thiếu mã phiếu thanh toán hoặc trạng thái"}), 400

    try:
        result = PhieuThanhToanBUS.cap_nhat_tinh_trang_thanh_toan(ma_ptt, tinh_trang)
        return jsonify(result), 200 if result.get("success") else 400
    except Exception as e:
        return jsonify({"success": False, "message": "Lỗi hệ thống khi cập nhật thanh toán."}), 500


@thanhtoandonvi_bp.route('/timkiem_cc_theo_ma_dv', methods=['GET'])
def tim_cc_theo_ma_dv():
    ma_kh = request.args.get("ma_kh")  # Lấy tham số từ query string
    
    if not ma_kh:
        return jsonify({"error": "Thiếu mã khách hàng"}), 400

    ketqua = ChiTietDangKyBUS.tim_chungchi_theo_ma_dv(ma_kh)
    return jsonify(ketqua), 200


@thanhtoandonvi_bp.route('/timkiem_cc_theo_ten_don_vi', methods=['GET'])
def tim_cc_theo_ten_don_vi():
    ten_don_vi = request.args.get("ten_don_vi")  # Lấy tham số từ query string
    
    if not ten_don_vi:
        return jsonify({"error": "Thiếu tên đơn vị"}), 400

    ketqua = ChiTietDangKyBUS.tim_chungchi_theo_ten_donvi(ten_don_vi)
    return jsonify(ketqua), 200


@thanhtoandonvi_bp.route('/timkiem_cc_theo_ma_ptt', methods=['GET'])
def tim_cc_theo_ma_ptt():
    ma_ptt = request.args.get("ma_ptt")  # Lấy tham số từ query string
    
    if not ma_ptt:
        return jsonify({"error": "Thiếu mã phiếu thanh toán"}), 400

    ketqua = ChiTietDangKyBUS.tim_chungchi_theo_ma_ptt_dv(ma_ptt)
    return jsonify(ketqua), 200
