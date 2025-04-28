from sqlalchemy import text
from extensions import db

class ChungChiDAO:
    @staticmethod
    def DocDSChungChi():
        try:
            sql = text("EXEC SP_LAY_THONG_TIN_CHUNG_CHI")
            result = db.session.execute(sql)
            rows = result.fetchall()

            data = []
            for row in rows:
                data.append({
                    "ma_chung_chi": row[0],
                    "mon_thi": row[1],
                    "ngay_cap": row[2],
                    "ket_qua": row[3],
                    "cccd_thi_sinh": row[4],
                    "ma_nhan_vien_nhap": row[5]
                })
            return data
        
        except Exception as e:
            db.session.rollback()
            print(f"Lỗi khi lấy thông tin chứng chỉ: {e}")
            return None

    @staticmethod
    def TimChungChiTheoCCCD(cccd):
        try:
            # Thực thi stored procedure với tham số CCCD
            sql = text("EXEC SP_LAY_CHUNGCHI_THEO_CCCD :cccd")
            result = db.session.execute(sql, {"cccd": cccd})
            rows = result.fetchall()

            # Chuyển dữ liệu thành list of dict cho dễ sử dụng
            data = []
            for row in rows:
                data.append({
                    "ma_chung_chi": row[0],
                    "mon_thi": row[1],
                    "ngay_cap": row[2],
                    "ket_qua": row[3],
                    "cccd_thi_sinh": row[4],
                    "ma_nhan_vien_nhap": row[5]
                })
            return data

        except Exception as e:
            db.session.rollback()
            print(f"Lỗi khi tìm chứng chỉ theo CCCD: {e}")
            return None