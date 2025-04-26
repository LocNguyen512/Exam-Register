from extensions import db
from sqlalchemy import text

class ChiTietLichThiDAO:
    @staticmethod
    def CapNhatSoGheTrong(ma_lich_thi, ma_phong):
        sql = text("""
            EXEC SP_GiamSoGheTrong :MaLichThi, :MaPhong
        """)
        db.session.execute(sql, {
            'MaLichThi': ma_lich_thi,
            'MaPhong': ma_phong
        })
        db.session.commit()