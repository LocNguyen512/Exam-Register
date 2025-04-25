from extensions import db
from sqlalchemy import text

def DocThongTinUser(email, password):
    sql = text("EXEC SP_LOGIN :email, :password")
    result = db.session.execute(sql, {"email": email, "password": password}).fetchone()
    return result