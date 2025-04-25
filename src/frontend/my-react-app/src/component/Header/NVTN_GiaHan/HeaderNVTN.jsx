import './HeaderNVTN.css';
function HeaderNVTN() {
    return (
        <header>
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="/"> Home </a></li>
                    <li><a href="LichThi"> Lịch thi </a></li>
                    <li><a href="LapPhieuDangKy"> Lập phiếu đăng ký </a></li>
                    <li><a href="GiaHan"> Xử lý gia hạn </a></li>
                    <li><a href="CapChungChi"> Cấp chứng chỉ </a></li>
                </ul>
            </nav>
            <button className="login-button">Đăng nhập</button>
        </header>
    )
}
export default HeaderNVTN