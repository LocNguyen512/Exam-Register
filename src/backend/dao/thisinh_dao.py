from extensions import db
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
