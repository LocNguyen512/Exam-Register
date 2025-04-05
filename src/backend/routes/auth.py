from flask import Blueprint, request
from controllers.auth_controller import login

auth_bp = Blueprint('auth', __name__)

auth_bp.route("/login", methods=["POST"])(login)
auth_bp.route("/get_all_khach_hang", methods=["GET"])(login)  