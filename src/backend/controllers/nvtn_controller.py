from flask import request, jsonify
from sqlalchemy import text
from extensions import db

def them_khach_hang_tu_do_controller(data):
    try:
        sdt = data.get("SDT")
        email = data.get("EMAIL")
        loaikh = data.get("LOAIKH")     # luôn là "Tự do"
        hoten = data.get("HOTEN")       # tên người dùng

        # Kiểm tra dữ liệu đầu vào
        if not all([sdt, email, loaikh, hoten]):
            return jsonify(msg="Thiếu thông tin khách hàng tự do"), 400

        # Gọi Stored Procedure
        result = db.session.execute(
            text("""
                DECLARE @MaKH CHAR(6);
                EXEC @MaKH = sp_them_khach_hang 
                    @SDT = :sdt,
                    @EMAIL = :email,
                    @LOAIKH = :loaikh,
                    @HOTEN = :hoten,
                    @TENDONVI = NULL,
                    @DIACHI = NULL;
                SELECT @MaKH AS MaKhachHangMoi;
            """),
            {
                "sdt": sdt,
                "email": email,
                "loaikh": loaikh,
                "hoten": hoten
            }
        )
        db.session.commit()
        row = result.fetchone()

        if row and row.MaKhachHangMoi:
            return jsonify(msg="Thêm khách hàng tự do thành công", ma_kh=row.MaKhachHangMoi), 201
        else:
            return jsonify(msg="Không thể tạo khách hàng"), 500

    except Exception as e:
        if "duplicate key" in str(e):
            return jsonify(msg="Số điện thoại hoặc email đã tồn tại"), 400
        return jsonify(msg=f"Lỗi: {str(e)}"), 500
    
def get_all_khach_hang():
    try:
        result = db.session.execute(text("EXEC SP_GET_KH"))
        rows = result.fetchall()

        kh_list = []
        for row in rows:
            kh_list.append({
                "ma_kh": row.MA_KH,
                "ten_kh": row.TEN_KH,
                "dia_chi": row.DIA_CHI,
                "so_dien_thoai": row.SO_DIEN_THOAI,
                "email": row.EMAIL
            })

        return jsonify(kh_list), 200

    except Exception as e:
        return jsonify(msg=f"Lỗi khi lấy danh sách khách hàng: {str(e)}"), 500