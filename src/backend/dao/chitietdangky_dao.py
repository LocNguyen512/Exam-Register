from extensions import db
from sqlalchemy import text

class ChiTietDangKyDAO:
    @staticmethod
    def ThemChiTietPhieuDangKy(ma_pdk, ma_ts, ma_phong, ma_lich):
        sql = text("""
            EXEC SP_ThemChiTietDangKy :MaPDK, :MaTS, :MaPhong, :MaLich
        """)
        db.session.execute(sql, {
            'MaPDK': ma_pdk,
            'MaTS': ma_ts,
            'MaPhong': ma_phong,
            'MaLich': ma_lich
        })
        db.session.commit()  # Vì chỉ insert nên cần commit