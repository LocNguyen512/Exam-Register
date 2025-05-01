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

    # Linh them
    # Khach hang tu do
    @staticmethod
    def tim_chungchi_theo_cccd(cccd):
        sql = text("EXEC SP_NVKT_TimChungChiKHTD_Theo_CCCD :cccd")
        result = db.session.execute(sql, {"cccd": cccd})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

    @staticmethod
    def tim_chungchi_theo_ma_ts(ma_ts):
        sql = text("EXEC SP_NVKT_TimChungChiKHTD_Theo_Ma_TS :ma_ts")
        result = db.session.execute(sql, {"ma_ts": ma_ts})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

    @staticmethod
    def tim_chungchi_theo_ten(hoten):
        sql = text("EXEC SP_NVKT_TimChungChiKHTD_Theo_Ten :hoten")
        result = db.session.execute(sql, {"hoten": hoten})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

    @staticmethod
    def tim_chungchi_theo_ma_ptt(ma_ptt):
        sql = text("EXEC SP_NVKT_TimChungChiKHTD_Theo_MA_PTT :ma_ptt")
        result = db.session.execute(sql, {"ma_ptt": ma_ptt})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]
    # Khach hang don vi
    @staticmethod
    def tim_chungchi_theo_ma_dv(ma_kh):
        query = text("EXEC SP_NVKT_TimChungChiKHDV_Theo_Ma_DV :MA_KH")
        result = db.session.execute(query, {'MA_KH': ma_kh})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

    @staticmethod
    def tim_chungchi_theo_ten_donvi(ten_donvi):
        query = text("EXEC SP_NVKT_TimChungChiKHDV_Theo_Ten :TENDONVI")
        result = db.session.execute(query, {'TENDONVI': ten_donvi})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

    @staticmethod
    def tim_chungchicanhan_theo_ma_ptt(ma_ptt):
        query = text("EXEC SP_NVKT_TimChungChiKHDV_Theo_MA_PTT :MA_PTT")
        result = db.session.execute(query, {'MA_PTT': ma_ptt})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]