from flask import Flask, request, jsonify
from config import Config  
from sqlalchemy import text
from routes.user import user_bp
from routes.thisinh import thisinh_bp
from routes.loaidgnl import loaidgnl_bp 
from extensions import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5174"])
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(thisinh_bp, url_prefix="/thisinh")
app.register_blueprint(loaidgnl_bp, url_prefix="/loaidgnl")

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
    
    