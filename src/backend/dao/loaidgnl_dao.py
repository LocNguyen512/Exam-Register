from extensions import db
from sqlalchemy import text

class LoaiDGNLDAO:
    @staticmethod
    def doc_danh_sach_loai():
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