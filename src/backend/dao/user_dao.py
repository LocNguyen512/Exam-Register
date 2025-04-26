from extensions import db
from sqlalchemy import text

class UserDAO:
    @staticmethod
    def DocThongTinUser(email, password):
        try:
            sql = text("EXEC SP_LOGIN :email, :password")
            result = db.session.execute(sql, {"email": email, "password": password}).fetchone()
            return result
        except Exception as e:
            print("Lỗi khi đọc thông tin người dùng:", str(e))
            raise e