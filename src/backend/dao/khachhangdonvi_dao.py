from extensions import db
from sqlalchemy import text

class KhachHangDonViDAO:

    @staticmethod
    def tim_kiem_theo_ten_don_vi(ten_don_vi):
        sql = text("EXEC SP_NVKT_TimKiemKHDV_Theo_Ten :TENDONVI")
        result = db.session.execute(sql, {"TENDONVI": ten_don_vi})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

    @staticmethod
    def tim_kiem_theo_ma_kh(ma_kh):
        sql = text("EXEC SP_NVKT_TimKiemKHDV_Theo_Ma_DV :MA_KH")
        result = db.session.execute(sql, {"MA_KH": ma_kh})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]


    @staticmethod
    def tim_kiem_theo_ma_ptt(ma_ptt):
        sql = text("EXEC SP_NVKT_TimKiemKHDV_Theo_MA_PTT :MA_PTT")
        result = db.session.execute(sql, {"MA_PTT": ma_ptt})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]
