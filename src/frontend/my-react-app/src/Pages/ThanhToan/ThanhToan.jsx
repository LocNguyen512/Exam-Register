import React, { useState } from 'react';
import CaNhan from './CaNhan';
import DonVi from './DonVi';
import GiaHan from './GiaHan';
import Header from '../../component/Header/Header_thanhtoan';
import Footer from '../../component/Footer/Footer';
import './ThanhToan.css';

function ThanhToan() {
  const [selectedTab, setSelectedTab] = useState('');

  const renderContent = () => {
    switch (selectedTab) {
      case 'ca-nhan':
        return <CaNhan />;
      case 'don-vi':
        return <DonVi />;
      case 'gia-han':
        return <GiaHan />;
      default:
        return <div className="blank-page"><h1>Vui lòng chọn một tab để bắt đầu thanh toán</h1></div>;
    }
  };

  return (
    <div className="layout">
      <Header />

      <div className="container">
        <div className="main">
          <div className="sidebar">
            <h2 className="sidebar-title">💳Loại Thanh toán</h2>
            <button
              className={selectedTab === 'ca-nhan' ? 'active' : ''}
              onClick={() => setSelectedTab('ca-nhan')}
            >
              🔐 Thanh toán đăng ký cá nhân
            </button>
            <button
              className={selectedTab === 'don-vi' ? 'active' : ''}
              onClick={() => setSelectedTab('don-vi')}
            >
              🏢 Thanh toán đăng ký đơn vị
            </button>
            <button
              className={selectedTab === 'gia-han' ? 'active' : ''}
              onClick={() => setSelectedTab('gia-han')}
            >
              ⏳ Thanh toán gia hạn
            </button>
          </div>

          <div className="content">
            {renderContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ThanhToan;
