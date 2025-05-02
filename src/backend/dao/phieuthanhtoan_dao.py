from extensions import db
from sqlalchemy import text

class PhieuThanhToanDAO:
    @staticmethod
    def cap_nhat_tinh_trang_thanh_toan(ma_ptt):
        try:
            query = text("EXEC SP_NVKT_CapNhat_TinhTrangThanhToan :ma_ptt")
            db.session.execute(query, {
                "ma_ptt": ma_ptt
            })
            db.session.commit()
            return {"success": True, "message": "Cập nhật tình trạng thành công"}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "message": f"Lỗi: {e}"}

    def them_phieu_thanh_toan(ma_nv, ma_pdk):
        cursor = db.cursor()

        try:
            # Gọi stored procedure với OUTPUT
            cursor.execute("""
                DECLARE @MA_PTT CHAR(6);
                EXEC TaoPhieuThanhToan ?, ?, @MA_PTT OUTPUT;
                SELECT @MA_PTT AS MA_PTT;
            """, (ma_nv, ma_pdk))

            # Lấy kết quả trả về
            result = cursor.fetchone()
            db.commit()

            if result and result.MA_PTT:
                return result.MA_PTT
            else:
                return None

        except Exception as e:
            db.rollback()
            print("Lỗi khi gọi SP TaoPhieuThanhToan:", e)
            return None