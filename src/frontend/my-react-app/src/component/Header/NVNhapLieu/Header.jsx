import './Header.css';
import {handleLogout} from '../utils/logout.js';
import { useContext } from 'react';
import UserContext from '../utils/context.js';
function HeaderNL() {
    const userInfo = useContext(UserContext); // 👈 Lấy dữ liệu từ context
    return (
        <header>
            <div className="logo">
                <img src="/Logo.png" alt="AlphaCenter Logo" />
            </div>
            <nav>
                <ul>
                    <li><a href="/NVNL"> Home </a></li>
                    <li><a href="/NVNL/XuLyChungChi/QuanLy"> Quản lý chứng chỉ </a></li>
                </ul>
            </nav>

            <div className="header-right">
                <button className="login-button" onClick={handleLogout} >Đăng xuất</button>
                <div className="user-info">
                <div className="user-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12Zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8Z"/>
                    </svg>
                </div>
                    <span className="user-name">
                        {userInfo?.ho_ten || "Chưa đăng nhập"}
                    </span>
                </div>
            </div>
            
        </header>
    )
}
export default HeaderNL