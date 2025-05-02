from flask import Flask
from config import Config  
from sqlalchemy import text
from routes.MH_DangNhap import dangnhap_bp
from routes.MH_ThemKhachHangTuDo import dangKyThi_bp
from routes.MH_ThongBao import thongbao_bp
from routes.MH_QuanLyChungChi import chungchi_bp
from routes.MH_CapChungChi import capchungchi_bp
from routes.MH_ThanhToanDonVi import thanhtoandonvi_bp
from routes.MH_ThanhToanCaNhan import thanhtoancanhan_bp
from routes.MH_ChiTietGiaHan import giahan_bp
from routes.MH_ChonLichThi import loadlichthi_bp
from routes.MH_LapPhieuGiaHan import phieugiahan_bp
from extensions import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(dangnhap_bp, url_prefix="/dangnhap")
app.register_blueprint(dangKyThi_bp, url_prefix="/dangKyThi")  
app.register_blueprint(thongbao_bp, url_prefix="/Thongbao") 
app.register_blueprint(chungchi_bp, url_prefix="/QLchungchi")
app.register_blueprint(capchungchi_bp, url_prefix="/Capchungchi")
app.register_blueprint(thanhtoandonvi_bp, url_prefix="/thanhtoandonvi")
app.register_blueprint(thanhtoancanhan_bp, url_prefix="/thanhtoancanhan")
app.register_blueprint(giahan_bp, url_prefix="/QLgiahan" )
app.register_blueprint(loadlichthi_bp, url_prefix="/Chonlichthi")
app.register_blueprint(phieugiahan_bp, url_prefix="/phieugiahan")


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
    
    