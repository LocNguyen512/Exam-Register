from extensions import db
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
import datetime

class ThiSinhDAO:
    @staticmethod
    def ThemTS(ho_ten, cccd, ngay_sinh, sdt, email):
        # Nếu là datetime.date, format thành yyyy-mm-dd string
        if isinstance(ngay_sinh, datetime.date):
            ngay_sinh = ngay_sinh.strftime('%Y-%m-%d')

        conn = db.engine.raw_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(
                "EXEC SP_ThemThiSinh ?, ?, ?, ?, ?",
                (ho_ten, ngay_sinh, sdt, email, cccd)   # <<< đúng thứ tự
            )
            row = cursor.fetchone()
            conn.commit()
            return row[0] if row else None
        finally:
            cursor.close()
            conn.close()
            
    @staticmethod
    def LayLoaiDGNLChuaCapChungChi(cccd):
        try:
            sql = text("""
                EXEC SP_LayLoaiDGNL_ChuaCapChungChi @CCCD = :cccd
            """)
            result = db.session.execute(sql, {"cccd": cccd})
            rows = result.fetchall()

            data = []
            for row in rows:
                data.append({
                    "ma_loai": row[0],
                    "ten_loai": row[1]
                })
            return data

        except SQLAlchemyError as e:
            db.session.rollback()
            error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
            print(f"[DAO] Lỗi khi gọi SP_LayLoaiDGNL_ChuaCapChungChi: {error_msg}")
            return None
