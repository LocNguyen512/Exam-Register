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
    
    @staticmethod
    def cap_nhat_lich_thi_gia_han(sobaodanh, mon, ngay_thi):
        sql = text("EXEC sp_update_lich_thi_gia_han :SOBAODANH, :MON_THI, :NGAY_THI")
        db.session.execute(sql, {
            "SOBAODANH": sobaodanh,
            "MON_THI": mon,
            "NGAY_THI": ngay_thi
        })

    @staticmethod
    def cap_nhat_so_lan_gia_han(sobaodanh):
        sql = text("EXEC sp_cap_nhat_so_lan_gia_han :SOBAODANH")
        db.session.execute(sql, {"SOBAODANH": sobaodanh})

    @staticmethod
    def xoa_sbd_cu(sobaodanh):
        sql = text("EXEC sp_xoa_sbd_cu :SOBAODANH")
        db.session.execute(sql, {"SOBAODANH": sobaodanh})