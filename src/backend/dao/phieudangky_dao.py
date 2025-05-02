from extensions import db
from sqlalchemy import text

class PhieuDangKyDAO:
    @staticmethod
    def ThemPhieuDangKy(ma_nv, ma_kh, so_luong):
        sql = text("""
            EXEC SP_ThemPhieuDangKy :MaNV, :MaKH, :SoLuong
        """)
        result = db.session.execute(sql, {
            'MaNV': ma_nv,
            'MaKH': ma_kh,
            'SoLuong': so_luong
        })
        row = result.fetchone()
        return row[0] if row else None
