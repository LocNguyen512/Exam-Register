import './Header.css';
function Header() {
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
            <button className="login-button">Đăng nhập</button>
        </header>
    )
}
export default Header 