from extensions import db
from sqlalchemy import text

class PhieuThanhToanDAO:
    @staticmethod
    def cap_nhat_tinh_trang_thanh_toan(ma_pdk, ma_nv):
        try:
            
            query = text("EXEC sp_cap_nhat_tinh_trang_thanh_toan :ma_pdk , :ma_nv")
            db.session.execute(query, {
                "ma_pdk": ma_pdk,
                "ma_nv": ma_nv
            })
            db.session.commit()
            return {"success": True, "message": "Cập nhật tình trạng thành công"}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "message": f"Lỗi: {e}"}

    @staticmethod
    def lay_tinh_trang_theo_ma_pdk(ma_pdk):
        """
        Gọi stored procedure sp_lay_tinh_trang_thanh_toan để lấy tình trạng
        """
        try:
            sql = text("EXEC sp_lay_tinh_trang_thanh_toan :ma_pdk")
            result = db.session.execute(sql, {"ma_pdk": ma_pdk}).fetchone()
            return result[0] if result else None
        except Exception as e:
            print("❌ Lỗi lấy tình trạng thanh toán:", str(e))
            return None

    @staticmethod
    def insert_phieu_thanh_toan(ma_pdk):
        """
        Gọi stored procedure sp_tao_phieu_thanh_toan để tạo phiếu mới
        """
        try:
            sql = text("EXEC sp_tao_phieu_thanh_toan :ma_pdk")
            db.session.execute(sql, {"ma_pdk": ma_pdk})
            db.session.commit()
        except Exception as e:
            print("❌ Lỗi tạo phiếu thanh toán:", str(e))
            raise e