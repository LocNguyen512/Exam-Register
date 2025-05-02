import { useNavigate } from "react-router-dom";
import './Header.css';
function Header() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/DangNhap");
    }
    return (
        <header>
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="/"> Home </a></li>
                    <li><a href="LichThi"> Lịch thi </a></li>
                    <li><a href="BangGia"> Bảng giá </a></li>
                    <li><a href="ChungChi"> Tra cứu chứng chỉ </a></li>
                </ul>
            </nav>
            <button className="login-button" onClick={handleLoginClick}>Đăng nhập</button>
        </header>
    )
}
export default Header 