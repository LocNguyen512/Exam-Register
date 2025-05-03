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
    
    @staticmethod
    def lay_thong_tin_phieu(ma_pdk):
        sql = text("EXEC sp_lay_thong_tin_phieu_dang_ky :ma_pdk")
        result = db.session.execute(sql, {"ma_pdk": ma_pdk}).fetchone()
        return dict(result._mapping) if result else None
    
    
        if so_ngay > 3:
            raise Exception(f"❌ Phiếu lập đã quá {so_ngay} ngày (> 3 ngày)")

        return phieu  # hoặc tiếp tục xử lý khác  
