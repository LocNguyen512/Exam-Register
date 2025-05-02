import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderGiaHan from '../../component/Header/NVTiepNhan/HeaderNoBack';
import Footer from '../../component/Footer/Footer';
import './GiaHan.css';

function GiaHan() {
  const [sobaodanh, setSobaodanh] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (sobaodanh.trim()) {
      navigate(`/NVTN/GiaHan/${sobaodanh}`);
    }
  };

  return (
    <div className="giahan-page">
      <HeaderGiaHan />

      <div className="giahan-hero">
        <h1 className="giahan-title">XỬ LÝ GIA HẠN</h1>
        <div className="giahan-search-row">
          <input
            type="text"
            className="giahan-input"
            placeholder="Số báo danh"
            value={sobaodanh}
            onChange={(e) => setSobaodanh(e.target.value)}
          />
          <button onClick={handleSearch}>Tìm kiếm</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GiaHan;
