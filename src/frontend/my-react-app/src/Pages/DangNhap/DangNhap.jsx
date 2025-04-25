import './DangNhap.css';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import illustration from '/public/illustration-login.png'; // Adjust the path as necessary
import { useState } from 'react';
import Header from '../../component/Header/Customer/Header';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <Header />
      <div className="login-left">
        <div className="login-card">
          <h2>Welcome back <span className="wave">👋</span></h2>
          <p>Nhân viên đăng nhập</p>

          <div className="input-group">
            <Mail size={20} color="#9ca3af" />
            <input type="email" placeholder="Email" />
          </div>

          <div className="input-group">
            <Lock size={20} color="#9ca3af" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="actions">
            <a href="#">Quên mật khẩu</a>
          </div>

          <button className="btn-login">Đăng nhập</button>
        </div>
      </div>

      <div className="login-right">
        <img src={illustration} alt="Login Illustration" className="illustration" />
      </div>
    </div>
  );
}

export default Login;