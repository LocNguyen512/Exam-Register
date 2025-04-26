from flask import Blueprint, request, jsonify
from services.thisinh_bus import KiemTraThongTin 

thisinh_bp = Blueprint('thisinh', __name__)

@thisinh_bp.route("/kiemtra", methods=["POST"])

def kiemtra():
    data = request.get_json()
    customer = data.get('customer', {})
    candidate = data.get('candidate', {})

    customer_error = KiemTraThongTin(customer, candidate)
    if customer_error:
        return jsonify({'error': customer_error}), 400

    return jsonify({'message': '✅ Dữ liệu hợp lệ.'}), 200