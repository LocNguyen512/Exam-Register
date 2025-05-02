from flask import Blueprint, jsonify, request
from services.khachhangtudo_bus import KhachHangTuDoBUS
from services.chitietdangky_bus import ChiTietDangKyBUS

thanhtoancanhan_bp = Blueprint('thanhtoancanhan', __name__)

class MH_ThanhToanCaNhan:
    @thanhtoancanhan_bp.route('/timkiem_theo_cccd', methods=['GET'])
    def timkiem_theo_cccd():
        cccd = request.args.get('cccd')
        if not cccd:
            return jsonify({"error": "Thiếu CCCD"}), 400
        result = KhachHangTuDoBUS.tim_theo_cccd(cccd)
        return jsonify(result)

    @thanhtoancanhan_bp.route('/timkiem_theo_ma_ts', methods=['GET'])
    def timkiem_theo_ma_ts():
        ma_ts = request.args.get('ma_ts')
        if not ma_ts:
            return jsonify({"error": "Thiếu mã thí sinh"}), 400
        result = KhachHangTuDoBUS.tim_theo_ma_ts(ma_ts)
        return jsonify(result)

    @thanhtoancanhan_bp.route('/timkiem_theo_ten', methods=['GET'])
    def timkiem_theo_ten():
        hoten = request.args.get('hoten')
        if not hoten:
            return jsonify({"error": "Thiếu họ tên"}), 400
        result = KhachHangTuDoBUS.tim_theo_ten(hoten)
        return jsonify(result)

    @thanhtoancanhan_bp.route('/timkiem_theo_ma_ptt', methods=['GET'])
    def timkiem_theo_ma_ptt():
        ma_ptt = request.args.get('ma_ptt')
        if not ma_ptt:
            return jsonify({"error": "Thiếu mã phiếu thanh toán"}), 400
        result = KhachHangTuDoBUS.tim_theo_ma_ptt(ma_ptt)
        return jsonify(result)

    @thanhtoancanhan_bp.route('/timkiem_cc_theo_cccd', methods=['GET'])
    def timkiem_cc_theo_cccd():
        cccd = request.args.get('cccd')
        if not cccd:
            return jsonify({"error": "Thiếu CCCD"}), 400
        result = ChiTietDangKyBUS.tim_chungchi_theo_cccd(cccd)
        return jsonify(result)

    @thanhtoancanhan_bp.route('/timkiem_cc_theo_ma_ts', methods=['GET'])
    def timkiem_cc_theo_ma_ts():
        ma_ts = request.args.get('ma_ts')
        if not ma_ts:
            return jsonify({"error": "Thiếu mã thí sinh"}), 400
        result = ChiTietDangKyBUS.tim_chungchi_theo_ma_ts(ma_ts)
        return jsonify(result)

    @thanhtoancanhan_bp.route('/timkiem_cc_theo_ten', methods=['GET'])
    def timkiem_cc_theo_ten():
        hoten = request.args.get('hoten')
        if not hoten:
            return jsonify({"error": "Thiếu họ tên"}), 400
        result = ChiTietDangKyBUS.tim_chungchi_theo_ten(hoten)
        return jsonify(result)

    @thanhtoancanhan_bp.route('/timkiem_cc_theo_ma_ptt', methods=['GET'])
    def timkiem_cc_theo_ma_ptt():
        ma_ptt = request.args.get('ma_ptt')
        if not ma_ptt:
            return jsonify({"error": "Thiếu mã phiếu thanh toán"}), 400
        result = ChiTietDangKyBUS.tim_chungchicanhan_theo_ma_ptt(ma_ptt)
        return jsonify(result)
