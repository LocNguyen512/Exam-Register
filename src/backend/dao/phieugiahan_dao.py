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
        
    
    @staticmethod
    def lay_phieu_gia_han_chua_thanh_toan(cccd):
        try:
            sql = text("EXEC sp_get_phieu_gia_han_chua_tt :cccd")
            result = db.session.execute(sql, {"cccd": cccd})
            row = result.fetchone()
            if row:
                return {
                    "maPhieu": row.MA_PGH,
                    "mon": row.MON,
                    "truongHop": row.TRUONGHOP,
                    "phi": row.PHI,
                    "tinhTrang": row.TINHTRANG,
                    "ngayLap": row.NGAYLAP.strftime("%d/%m/%Y")
                }
            return None
        except Exception as e:
            print("Lỗi khi lấy phiếu gia hạn:", str(e))
            raise e
    @staticmethod
    def cap_nhat_tinh_trang_thanh_toan(ma_phieu, ma_nvkt):
        try:
            sql = text("EXEC sp_cap_nhat_tinh_trang_thanh_toan_pgh :ma_phieu, :ma_nvkt")
            db.session.execute(sql, {"ma_phieu": ma_phieu, "ma_nvkt": ma_nvkt})
            db.session.commit()
        except Exception as e:
            print("Lỗi cập nhật tình trạng thanh toán:", str(e))
            raise e