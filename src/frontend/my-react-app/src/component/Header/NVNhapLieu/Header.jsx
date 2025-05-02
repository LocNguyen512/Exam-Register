import './Header.css';
function HeaderNL() {
    return (
        <header>
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="/NVNL"> Home </a></li>
                    <li><a href="/NVNL/XuLyChungChi/QuanLy"> Quản lý chứng chỉ </a></li>
                    <li><a href="/NVNL/XuLyChungChi/CapChungChi"> Cấp chứng chỉ </a></li>
                </ul>
            </nav>
            <button className="login-button">Đăng xuất</button>
        </header>
    )
}
export default HeaderNL