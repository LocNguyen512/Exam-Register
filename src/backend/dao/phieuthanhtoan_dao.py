from extensions import db
from sqlalchemy import text

class PhieuThanhToanDAO:
    @staticmethod
    def cap_nhat_tinh_trang_thanh_toan(ma_ptt, tinh_trang):
        try:
            query = text("EXEC SP_NVKT_CapNhat_TinhTrangThanhToan :ma_ptt, :tinh_trang")
            db.session.execute(query, {
                "ma_ptt": ma_ptt,
                "tinh_trang": tinh_trang
            })
            db.session.commit()
            return {"success": True, "message": "Cập nhật tình trạng thành công"}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "message": f"Lỗi: {e}"}
