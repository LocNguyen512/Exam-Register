from flask import Blueprint, request, jsonify
from services.loaidgnl_bus import LayDSLoaiDGNL
import traceback

loaidgnl_bp = Blueprint('loaidgnl', __name__)

@loaidgnl_bp.route("/docds_dgnl", methods=["GET"])

def get_certificates():
    try:
        certificates = LayDSLoaiDGNL()
        return jsonify(certificates)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500