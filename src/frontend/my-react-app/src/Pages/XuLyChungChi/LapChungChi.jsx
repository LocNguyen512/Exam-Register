import React, { useState } from 'react';
import Header from '../../component/Header/NVNhapLieu/HeaderBack';
import './LapChungChi.css';

function TaoChungChi() {
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tạm thời chỉ hiển thị lỗi mô phỏng
    setError(true);
  };

  return (
    <div className="layout">
      <Header />
      <div className="form-container">
        <h2>Lập chứng chỉ</h2>
        <form className="certificate-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <input type="text" id="monThi" required />
                <label htmlFor="monThi">Chứng chỉ</label>
            </div>
            <div className="input-group">
                <input type="text" id="ketQua" required />
                <label htmlFor="ketQua">Kết quả</label>
            </div>
            <div className="input-group">
                <input type="date" id="ngayCap" required />
                <label htmlFor="ngayCap">Ngày cấp</label>
            </div>
            <div className="input-group">
                <input type="text" id="cccdThiSinh" required />
                <label htmlFor="cccdThiSinh">CCCD thí sinh</label>
            </div>
            <div className="input-group">
                <input type="text" id="maNhanVien" required />
                <label htmlFor="maNhanVien">Mã nhân viên nhập</label>
            </div>
            <button type="submit" className="submit-btn">LẬP CHỨNG CHỈ</button>
        </form>
    </div>
          {error && (
          <p className="error-msg">
            LỖI CHỨNG CHỈ ĐÃ TỒN TẠI. VUI LÒNG NHẬP LẠI HOẶC HỦY NHẬP
          </p>
        )}
    </div>
  );
}

export default TaoChungChi;