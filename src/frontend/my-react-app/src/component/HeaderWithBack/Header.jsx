import './Header.css';
function Header() {
    return (
        <header>
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <button className="home-btn">Trang chủ</button>
            <button className="back-btn">Back</button>
            <button className="login-button">Đăng xuất</button>
            
        </header>
    )
}
export default Header 