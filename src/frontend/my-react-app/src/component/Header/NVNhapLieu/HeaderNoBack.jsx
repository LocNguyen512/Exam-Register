import React from 'react';
import './HeaderBack.css';

function HeaderGiaHan() {
  const goHome = () => window.location.href = '/Homepage/NVNL';

  return (
    <header className="header-giahan">
      <div className="header-left">
        <img src="/Logo.png" alt="AlphaCenter Logo" className="logo" />

        {/* Icon Home */}
        <svg className="svg-icon" onClick={goHome} xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
        </svg>
      </div>

      <div className="header-right">
        <button className="logout-button">Đăng xuất</button>
        <div className="user-info">
          <div className="user-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12Zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8Z"/>
            </svg>
          </div>
          <span className="user-name">David Smith</span>
        </div>
      </div>
    </header>
  );
}

export default HeaderGiaHan;
