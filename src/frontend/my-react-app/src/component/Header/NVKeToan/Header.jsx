import './Header.css';
function HeaderKT() {
    return (
        <header>
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="/NVKT"> Home </a></li>
                    <li><a href="/NVKT/BangGia"> Bảng giá </a></li>
                    <li><a href="/NVKT/ThanhToan"> Thanh toán đăng ký </a></li>
                    <li><a href="/NVKT/ThanhToanGiaHan"> Thanh toán gia hạn </a></li>
                </ul>
            </nav>
            <button className="login-button">Đăng xuất</button>
        </header>
    )
}
export default HeaderKT 