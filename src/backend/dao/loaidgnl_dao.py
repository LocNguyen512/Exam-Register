from extensions import db
from sqlalchemy import text

def DocDSLoai():
    try:
        # Gọi Stored Procedure SP_LayDSChungChi
        sql = text("EXEC SP_LayDSChungChi")
        result_proxy = db.session.execute(sql)
        rows = result_proxy.fetchall()

        result = [{"id": row[0], "name": row[1]} for row in rows]
        return result
    except Exception as e:
        print("Lỗi khi đọc danh sách chứng chỉ:", str(e))
        raise e