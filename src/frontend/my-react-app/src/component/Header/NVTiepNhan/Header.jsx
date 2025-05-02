import './Header.css';
function HeaderNVTN() {
    return (
        <header>
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="/NVTN"> Home </a></li>
                    <li><a href="/NVTN/DangKy/DangKyCaNhan"> Lập phiếu đăng ký </a></li>
                    <li><a href="/NVTN/GiaHan"> Xử lý gia hạn </a></li>
                    <li><a href="/NVTN/CapChungChi"> Cấp chứng chỉ </a></li>
                </ul>
            </nav>
            <button className="login-button">Đăng nhập</button>
        </header>
    )
}
export default HeaderNVTN