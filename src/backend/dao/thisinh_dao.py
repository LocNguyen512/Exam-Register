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
        
    @staticmethod
    def get_thong_tin_thi_sinh_theo_sbd(sobaodanh):
        try:
            sql = text("EXEC sp_get_thi_sinh_theo_sbd :sobaodanh")
            row = db.session.execute(sql, {"sobaodanh": sobaodanh}).fetchone()
            if not row: return None
            return {
                "maTS": row[0], "tenTS": row[1], "cccd": row[2],
                "ngaySinh": row[3], "dienThoai": row[4], "email": row[5],
                "baoDanh": row[6]
            }
        except Exception as e:
            print("Lỗi khi lấy thông tin thí sinh:", str(e))
            raise e
        
    @staticmethod
    def get_danh_sach_chung_chi_theo_sbd(sobaodanh):
        try:
            sql = text("EXEC sp_get_chung_chi_dang_ky :sobaodanh")
            result = db.session.execute(sql, {"sobaodanh": sobaodanh}).fetchall()
            return [{"monThi": r[0], "ngayThi": r[1], "sobaodanh": sobaodanh} for r in result]
        except Exception as e:
            print("Lỗi khi lấy danh sách chứng chỉ theo SBD:", str(e))
            raise e

    @staticmethod
    def lay_so_lan_gia_han(sobaodanh):
        sql = text("EXEC SP_LAY_SO_LAN_GIA_HAN_THEO_SBD :sobaodanh")
        row = db.session.execute(sql, {"sobaodanh": sobaodanh}).fetchone()
        return row.SoLanGiaHan if row else 0

    @staticmethod
    def lay_ngay_thi_theo_sbd(sobaodanh):
        sql = text("EXEC SP_LAY_NGAY_THI_THEO_SBD :sobaodanh")
        row = db.session.execute(sql, {"sobaodanh": sobaodanh}).fetchone()
        return row[0] if row else None
