from sqlalchemy import text
from extensions import db
from sqlalchemy.exc import SQLAlchemyError

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
                    "ma_nhan_vien_nhap": row[5],
                    "trang_thai": row[6],
                    "ghi_chu": row[7]
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
            sql = text("EXEC SP_LAY_CHUNGCHI_THEO_CCCD @cccd=:cccd")
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
        
    @staticmethod
    def ThemChungChi(mon_thi, ngay_cap, ket_qua, cccd, ma_nv):
        try:
            sql = text("""
                EXEC SP_THEM_CHUNGCHI 
                    @MONTHI = :mon_thi, 
                    @NGAYCAP = :ngay_cap, 
                    @KETQUA = :ket_qua, 
                    @CCCD = :cccd, 
                    @MA_NV = :ma_nv
            """)
            db.session.execute(sql, {
                "mon_thi": mon_thi,
                "ngay_cap": ngay_cap,
                "ket_qua": ket_qua,
                "cccd": cccd,
                "ma_nv": ma_nv
            })
            db.session.commit()
            return True

        except SQLAlchemyError as e:
            db.session.rollback()
            # e.orig chứa lỗi gốc từ database, có thể chứa thông điệp RAISERROR
            error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
            print(f"[DAO] Lỗi khi thêm chứng chỉ: {error_msg}")
            return error_msg
        
        
    @staticmethod
    def CapNhatTrangThaiChungChi(ma_chung_chi, trang_thai_moi):
        try:
            sql = text("""
                EXEC sp_CapNhatTrangThaiChungChi
                    @MACC = :ma_chung_chi, 
                    @TRANGTHAIMOI = :trang_thai_moi
            """)
            db.session.execute(sql, {
                "ma_chung_chi": ma_chung_chi,
                "trang_thai_moi": trang_thai_moi
            })
            db.session.commit()
            return True

        except SQLAlchemyError as e:
            db.session.rollback()
            error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
            print(f"[DAO] Lỗi khi cập nhật trạng thái chứng chỉ: {error_msg}")
            return error_msg
        
        
    @staticmethod
    def CapNhatGhiChuChungChi(ma_chung_chi, ghi_chu_moi):
        try:
            sql = text("""
                EXEC sp_CapNhatGhiChuChungChi 
                    @MA_CC = :ma_chung_chi, 
                    @GHICHU = :ghi_chu_moi
            """)
            db.session.execute(sql, {
                "ma_chung_chi": ma_chung_chi,
                "ghi_chu_moi": ghi_chu_moi
            })
            db.session.commit()
            return True

        except SQLAlchemyError as e:
            db.session.rollback()
            error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
            print(f"[DAO] Lỗi khi cập nhật ghi chú chứng chỉ: {error_msg}")
            return error_msg


    