from extensions import db
from sqlalchemy import text

class LichThiDAO:
    @staticmethod
    def DocDSLich(ten_loai=None):
        """
        Gọi stored procedure SP_LayDSLichThi với tham số tên loại (nếu có).
        """
        try:
            if ten_loai:
                sql = text("EXEC SP_LayDSLichThi @TenLoai = :ten_loai")
                result_proxy = db.session.execute(sql, {"ten_loai": ten_loai})
            else:
                sql = text("EXEC SP_LayDSLichThi")
                result_proxy = db.session.execute(sql)

            rows = result_proxy.fetchall()

            result = []
            for row in rows:
                result.append({
                    "maLichThi": row[0],
                    "ngayThi": row[1],
                    "maPhong": row[2],
                    "soGheTrong": row[3]
                })
            return result
        except Exception as e:
            print("Lỗi khi đọc danh sách lịch thi:", str(e))
            raise e
    
    @staticmethod
    def lay_ngay_thi_con_trong(mon_thi, sobaodanh):
        try:
            sql = text("""
                EXEC sp_get_ngay_thi_con_ghe_trong :mon_thi, :sobaodanh
            """)
            result = db.session.execute(sql, {
                "mon_thi": mon_thi,
                "sobaodanh": sobaodanh
            })
            rows = result.fetchall()
            return [str(row[0]) for row in rows]
        except Exception as e:
            print("Lỗi DAO lấy ngày thi theo SBD:", str(e))
            raise e
        
        