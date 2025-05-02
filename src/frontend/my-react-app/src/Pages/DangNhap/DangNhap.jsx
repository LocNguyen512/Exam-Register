import './DangNhap.css';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import illustration from '/public/illustration-login.png'; // Adjust the path as necessary
import { useState } from 'react';
import Header from '../../component/Header/Customer/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg('');
    try {
      const response = await axios.post(
        'http://localhost:5000/dangnhap/login',
        { email, password },
        { withCredentials: true } // 👈 bắt buộc để gửi cookie session
      );
      
      if (response.data.success) {
        const vaiTro = response.data.user.VaiTro;

        alert('Đăng nhập thành công!');

        // 👉 Chuyển hướng theo VaiTro
        if (vaiTro === 'Nhân viên tiếp nhận') {
          navigate('/NVTN');
        } else if (vaiTro === 'Nhân viên kế toán') {
          navigate('/NVKT');
        } else if (vaiTro === 'Nhân viên nhập liệu') { 
          navigate('/NVNL');
        }
      } else {
        setErrorMsg(response.data.message || 'Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      setErrorMsg('Lỗi kết nối đến server hoặc sai định dạng');
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      {/* <Header /> */}
      <div className="login-left">
        <div className="login-card">
          <h2>Welcome back <span className="wave">👋</span></h2>
          <p>Nhân viên đăng nhập</p>

          <div className="input-group">
            <Mail size={20} color="#9ca3af" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <Lock size={20} color="#9ca3af" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="actions">
            <a href="#">Quên mật khẩu</a>
          </div>

          <button className="btn-login" onClick={handleLogin}>Đăng nhập</button>
        </div>
      </div>

      <div className="login-right">
        <img src={illustration} alt="Login Illustration" className="illustration" />
      </div>
    </div>
  );
}

export default Login;