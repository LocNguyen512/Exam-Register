from extensions import db
from sqlalchemy import text

class LoaiDGNLDAO:
    @staticmethod
    def DocDSLoai():
        """
        Gọi stored procedure SP_LayDSChungChi để đọc danh sách loại chứng chỉ.
        Trả về danh sách dict {'id': ..., 'name': ...}.
        """
        try:
            sql = text("EXEC SP_LayDSChungChi")
            result_proxy = db.session.execute(sql)
            rows = result_proxy.fetchall()

            result = [{"id": row[0], "name": row[1]} for row in rows]
            return result
        except Exception as e:
            print("Lỗi khi đọc danh sách chứng chỉ:", str(e))
            raise e
        
    @staticmethod
    def LayTTChiTiet():
        """
        Gọi sp_LayDanhSachBangGia để lấy loại DGNL, lệ phí thi, phí gia hạn, ngày thi mới nhất
        Trả về: list of dicts
        """
        try:
            sql = text("EXEC sp_LayDanhSachBangGia")
            result = db.session.execute(sql).fetchall()
            return [
                {
                    "MaLoai": row[0],
                    "TenLoai": row[1],
                    "LePhiThi": row[2],
                    "PhiGiaHan": row[3],
                    "NgayThiMoiNhat": row[4]
                }
                for row in result
            ]
        except Exception as e:
            print("Lỗi khi lấy bảng giá:", str(e))
            raise