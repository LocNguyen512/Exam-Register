from extensions import db
from sqlalchemy import text

class phieugiahanDAO:
    @staticmethod
    def tao_phieu_gia_han(sobaodanh, mon, truonghop, ma_nvtn, ma_nvkt):
        sql = text("EXEC SP_TAO_PHIEU_GIA_HAN :sbd, :MON, :TRUONGHOP, :MA_NVTN, :MA_NVKT")
        db.session.execute(sql, {
            "sbd": sobaodanh,
            "MON": mon,
            "TRUONGHOP": truonghop,
            "MA_NVTN": ma_nvtn,
            "MA_NVKT": ma_nvkt
        })
