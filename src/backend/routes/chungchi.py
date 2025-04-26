from flask import Blueprint, jsonify, request
from services.chungchi_bus import ChungChiService

chungchi_bp = Blueprint('chungchi', __name__)

@chungchi_bp.route("/laychungchi", methods=["GET"])
def HienThiQuanLyChungChi():
    result = ChungChiService.LayDanhSachChungChi()
    return jsonify(result)

@chungchi_bp.route('/timkiemcccd', methods=['GET'])
def tim_kiem_chung_chi():
    # Lấy dữ liệu từ body dưới dạng JSON
    data = request.get_json()
    cccd = data.get('cccd')  # Lấy giá trị CCCD từ JSON
    print(cccd)
    if not cccd:
        return jsonify({'error': 'Thiếu CCCD'}), 400  # Nếu thiếu CCCD thì trả về lỗi 400

    try:
        # Gọi service để tìm chứng chỉ theo CCCD
        ketqua = ChungChiService.TimChungChiTheoCCCD(cccd)
        if ketqua:  # Nếu có kết quả thì trả về dữ liệu
            return jsonify(ketqua), 200
        else:  # Nếu không có chứng chỉ nào
            return jsonify({'message': 'Không tìm thấy chứng chỉ'}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Xử lý lỗi nếu có