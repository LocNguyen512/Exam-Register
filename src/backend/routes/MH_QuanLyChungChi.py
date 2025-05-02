from flask import Blueprint, jsonify, request
from services.chungchi_bus import ChungChiBUS
from services.thisinh_bus import ThiSinhBUS
import traceback


chungchi_bp = Blueprint('QLchungchi', __name__)

@chungchi_bp.route("/laychungchi", methods=["GET"])
def HienThiQuanLyChungChi():
    result = ChungChiBUS.LayDanhSachChungChi()
    return jsonify(result)

@chungchi_bp.route('/timkiemcccd', methods=['POST'])
def tim_kiem_chung_chi():
    # Lấy dữ liệu từ body dưới dạng JSON
    data = request.get_json()

    # Kiểm tra xem có CCCD không
    cccd = data.get('cccd')
    
    if not cccd:
        return jsonify({'error': 'Thiếu CCCD'}), 400  # Nếu thiếu CCCD thì trả về lỗi 400
    
    print(f"Đang tìm chứng chỉ cho CCCD: {cccd}")  # Logging thông tin CCCD để tiện theo dõi

    try:
        # Gọi service để tìm chứng chỉ theo CCCD
        ketqua = ChungChiBUS.TimChungChiTheoCCCD(cccd)
        
        if ketqua:  # Nếu có kết quả thì trả về dữ liệu
            return jsonify(ketqua), 200
        else:  # Nếu không có chứng chỉ nào
            return jsonify({'message': f'Không tìm thấy chứng chỉ cho CCCD: {cccd}'}), 404
    
    except Exception as e:
        # Logging chi tiết lỗi
        print(f"Lỗi khi tìm chứng chỉ cho CCCD {cccd}: {e}")
        # Xử lý lỗi hệ thống
        return jsonify({"error": "Đã xảy ra lỗi trong quá trình xử lý yêu cầu."}), 500
    
    
@chungchi_bp.route('/themChungChi', methods=['POST'])
def them_chung_chi():
    data = request.get_json()

    mon_thi = data.get('mon_thi')
    ngay_cap = data.get('ngay_cap')
    ket_qua = data.get('ket_qua')
    cccd_thi_sinh = data.get('cccd_thi_sinh')
    ma_nhan_vien = data.get('ma_nhan_vien')

    # Kiểm tra thiếu dữ liệu
    if not all([mon_thi, ngay_cap, ket_qua, cccd_thi_sinh, ma_nhan_vien]):
        return jsonify({"success": False, "message": "Thiếu thông tin để thêm chứng chỉ."}), 400

    try:
        result = ChungChiBUS.ThemChungChi(mon_thi, ngay_cap, ket_qua, cccd_thi_sinh, ma_nhan_vien)
        status_code = 200 if result.get("success") else 400
        return jsonify(result), status_code
    except Exception as e:
        print(f"Lỗi khi thêm chứng chỉ: {e}")
        return jsonify({"success": False, "message": "Lỗi hệ thống khi thêm chứng chỉ."}), 500
    
    

@chungchi_bp.route("/layDSLoaiDGNL", methods=["GET"])
def lay_loai_dgnl_chua_cap_chung_chi():
    """
    API lấy danh sách loại đánh giá năng lực chưa cấp chứng chỉ cho thí sinh theo CCCD.
    Yêu cầu: Truyền CCCD qua query string, ví dụ: /loai_dgnl_chua_cap_chung_chi?cccd=123456789012
    """
    try:
        cccd = request.args.get("cccd", "").strip()

        result = ThiSinhBUS.lay_loai_dgnl_chua_cap_chung_chi(cccd)
        if result["success"]:
            return jsonify(result["data"]), 200
        else:
            return jsonify({"error": result["message"]}), 400

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500