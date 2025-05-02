from extensions import db
from sqlalchemy import text

class KhachHangTuDoDAO:
    @staticmethod
    def tim_theo_cccd(cccd):
        sql = text("EXEC SP_NVKT_TimKiemKHTD_Theo_CCCD :cccd")
        result = db.session.execute(sql, {"cccd": cccd})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

    @staticmethod
    def tim_theo_ma_ts(ma_ts):
        sql = text("EXEC SP_NVKT_TimKiemKHTD_Theo_MA_TS :ma_ts")
        result = db.session.execute(sql, {"ma_ts": ma_ts})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

    @staticmethod
    def tim_theo_ten(hoten):
        sql = text("EXEC SP_NVKT_TimKiemKHTD_Theo_Ten_TS :hoten")
        result = db.session.execute(sql, {"hoten": hoten})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

    @staticmethod
    def tim_theo_ma_ptt(ma_ptt):
        sql = text("EXEC SP_NVKT_TimKiemKHTD_Theo_MA_PTT :ma_ptt")
        result = db.session.execute(sql, {"ma_ptt": ma_ptt})
        rows = result.fetchall()
        columns = result.keys()  # Lấy tên cột
        return [dict(zip(columns, row)) for row in rows]

