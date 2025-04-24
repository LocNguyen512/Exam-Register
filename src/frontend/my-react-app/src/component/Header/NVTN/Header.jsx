import './Header.css';
function Header() {
    const location = useLocation();
    const hideNav = location.pathname === '/DangNhap'; // Ẩn menu khi ở trang đăng nhập
    return (
        <header className="header">
      <div className="header-left">
        <div className="logo">
            <img src="/Logo.png" alt="AlphaCenter Logo" />
        </div>
        <button className="icon-button" title="Trang chủ">
          <img src="/home.png" alt="Home" />
        </button>
      </div>

      <div className="header-right">
        <button className="logout-button">Đăng xuất</button>
        <div className="user-avatar">
          <span className="avatar-circle">🧑</span>
          <span>David Smith</span>
        </div>
      </div>
    </header>
    )
}
export default Header 