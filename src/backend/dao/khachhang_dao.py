from extensions import db
from sqlalchemy import text

class KhachHangDAO:
    @staticmethod
    def LuuThongTinKhachHang(ho_ten, sdt, email):
        """
        Gọi SP_ThemKhachHangTuDo để thêm khách hàng tự do.
        """
        sql = text("""
            EXEC SP_ThemKhachHangTuDo :HoTen, :SDT, :Email
        """)
            
        result = db.session.execute(sql, {
            'HoTen': ho_ten,
            'SDT': sdt,
            'Email': email
        })
        row = result.fetchone()
        return row[0] if row else None
