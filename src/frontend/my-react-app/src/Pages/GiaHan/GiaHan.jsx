import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderGiaHan from '../../component/Header/HeaderGiaHan';
import Footer from '../../component/Footer/Footer';
import './GiaHan.css';

function GiaHan() {
  const [cccd, setCccd] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (cccd.trim()) {
        navigate(`/GiaHan/${cccd}`);
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
            placeholder="CCCD thí sinh"
            value={cccd}
            onChange={(e) => setCccd(e.target.value)}
          />
          <button onClick={handleSearch}>Tìm kiếm</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GiaHan;
