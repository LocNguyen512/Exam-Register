import './Header_thanhtoan.css';
function Header() {
    return (
        <header>
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="/"> Home </a></li>
                    <li><a href="BangGia"> Bảng giá </a></li>
                    <li><a href="ThanhToan"> Thanh toán </a></li>
                </ul>
            </nav>
            <button className="login-button">Đăng xuất</button>
        </header>
    )
}
export default Header 