from flask import Flask
from config import Config  
from sqlalchemy import text
from routes.MH_DangNhap import dangnhap_bp
from routes.MH_ThemKhachHangTuDo import dangKyThi_bp
from routes.MH_ThongBao import thongbao_bp
from routes.MH_BangGia import banggia_bp
from extensions import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.config.from_object(Config)
app.secret_key = 'your-secret-key'  # Để bảo vệ session
db.init_app(app)

app.register_blueprint(dangnhap_bp, url_prefix="/dangnhap")
app.register_blueprint(dangKyThi_bp, url_prefix="/dangKyThi")  
app.register_blueprint(thongbao_bp, url_prefix="/Thongbao") 
app.register_blueprint(banggia_bp, url_prefix="/bangGia")

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/test-db')
def test_db():
    try:
        result = db.session.execute(text("SELECT GETDATE();"))
        date = list(result)[0][0]
        return f"Kết nối SQL Server thành công! Giờ hiện tại: {date}"
    except Exception as e:
        return f"Kết nối thất bại: {str(e)}"
    
    
if __name__ == '__main__':
    app.run(debug=True)
    
    