from flask import Blueprint
from services.nvtn_controller import get_all_khach_hang, them_khach_hang

nvtn_bp = Blueprint('nhanvientn', __name__)

nvtn_bp.route("/get_all_khach_hang", methods=["GET"])(get_all_khach_hang)
nvtn_bp.route("/them_khach_hang_tu_do", methods=["POST"])(them_khach_hang)