from flask import Blueprint, jsonify, request
from services.khachhangtudo_bus import KhachHangTuDoBUS
from services.chitietdangky_bus import ChiTietDangKyBUS
from services.phieudangky_bus import PhieuDangKyBus
from services.phieuthanhtoan_bus import PhieuThanhToanBUS
from middlewares.auth_decorator import login_required
thanhtoancanhan_bp = Blueprint('thanhtoancanhan', __name__)

class MH_ThanhToanCaNhan:
    @thanhtoancanhan_bp.route('/timkiem_theo_pdk', methods=['GET'])
    def tim_kiem_theo_pdk():
        ma_pdk = request.args.get('ma_pdk')
        if not ma_pdk:
            return jsonify({"status": "error", "message": "Thiếu mã phiếu đăng ký"}), 400

        try:
            # 1. Lấy thông tin phiếu
            phieu = PhieuDangKyBus.KiemTraPDK(ma_pdk)
            if not phieu:
                return jsonify({"status": "error", "message": "Không tìm thấy phiếu đăng ký"}), 404

            # 2. Lấy danh sách chứng chỉ đã đăng ký
            chung_chi = ChiTietDangKyBUS.LayDSMonThi(ma_pdk)
            if not chung_chi:
                return jsonify({"status": "error", "message": "Không tìm thấy chứng chỉ đã đăng ký"}), 404

            # 3. Lấy tình trạng thanh toán
            tinh_trang = PhieuThanhToanBUS.LayTinhTrang(ma_pdk)

            # 4. Nếu chưa có phiếu thanh toán thì tạo mới
            if not tinh_trang:
                PhieuThanhToanBUS.TaoPhieu(ma_pdk)
                tinh_trang = "Chưa thanh toán"

            # 5. Gắn tình trạng vào dữ liệu trả về
            phieu["TinhTrangThanhToan"] = tinh_trang

            return jsonify({
                "status": "success",
                "data": {
                    "phieu": phieu,
                    "chung_chi": chung_chi
                }
            }), 200

        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @thanhtoancanhan_bp.route('/xacnhan_thanh_toan_pdk', methods=['POST'])
    def xac_nhan_thanh_toan():
        try:
            
            data = request.get_json()
            
            ma_pdk = data.get("ma_pdk")
            ma_nv = data.get("ma_nv")
            if not ma_pdk:
                return jsonify({
                    "status": "error",
                    "message": "Thiếu mã phiếu đăng ký (ma_pdk)"
                }), 400

            # Gọi BUS để xác nhận thanh toán
            PhieuThanhToanBUS.cap_nhat_tinh_trang_thanh_toan(ma_pdk, ma_nv)
            return jsonify({
                "status": "success",
                "message": f"Đã cập nhật tình trạng thanh toán cho phiếu {ma_pdk}"
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 400