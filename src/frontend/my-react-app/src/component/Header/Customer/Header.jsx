import './Header.css';
import { useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isLogin = location.pathname === '/DangNhap';

    return (
        <header className="header">
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="/" className={isHome ? 'active' : ''}>Home</a></li>
                    {isHome && (
                        <>
                            <li><a href="/LichThi">Lịch thi</a></li>
                            <li><a href="/BangGia">Bảng giá</a></li>
                            <li><a href="/ChungChi">Tra cứu chứng chỉ</a></li>
                        </>
                    )}
                </ul>
            </nav>
            <a href="/DangNhap">
                <button className={`login-button ${isLogin ? 'active' : ''}`}>
                    Đăng nhập
                </button>
            </a>
        </header>
    );
}

export default Header;