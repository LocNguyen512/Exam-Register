import './Header.css';
function Header() {
    return (
        <header>
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="/XuLyChungChi/Home"> Home </a></li>
                    <li><a href="/XuLyChungChi/QuanLy"> Quản lý chứng chỉ </a></li>
                    <li><a href="/XuLyChungChi/CapChungChi"> Cấp chứng chỉ </a></li>
                </ul>
            </nav>
            <button className="login-button">Đăng xuất</button>
        </header>
    )
}
export default Header 