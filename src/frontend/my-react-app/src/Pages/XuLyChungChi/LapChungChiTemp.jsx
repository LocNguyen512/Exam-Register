import React, { useState } from 'react';
import Header from '../../component/Header/NVNhapLieu/Header';
import './QuanLy.css';

function TaoChungChi() {
  const [formData, setFormData] = useState({
    monThi: '',
    ketQua: '',
    ngayCap: '',
    maThiSinh: '',
    maNhanVien: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi dữ liệu về backend
      const response = await fetch('http://localhost:3001/api/chung-chi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Lập chứng chỉ thành công!');
        // Reset form
        setFormData({
          monThi: '',
          ketQua: '',
          ngayCap: '',
          maThiSinh: '',
          maNhanVien: ''
        });
        setError('');
      } else {
        setError(result.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError('Lỗi máy chủ hoặc kết nối.');
    }
  };

  return (
    <div className="layout">
      <Header />
      <div className="form-container">
        <h2>Hãy nhập thông tin chứng chỉ</h2>
        <form onSubmit={handleSubmit} className="certificate-form">
          <input
            type="text"
            name="monThi"
            placeholder="Môn thi"
            value={formData.monThi}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ketQua"
            placeholder="Kết quả"
            value={formData.ketQua}
            onChange={handleChange}
          />
          <input
            type="date"
            name="ngayCap"
            placeholder="Ngày cấp"
            value={formData.ngayCap}
            onChange={handleChange}
          />
          <input
            type="text"
            name="maThiSinh"
            placeholder="Mã thí sinh"
            value={formData.maThiSinh}
            onChange={handleChange}
          />
          <input
            type="text"
            name="maNhanVien"
            placeholder="Mã nhân viên nhập"
            value={formData.maNhanVien}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">LẬP CHỨNG CHỈ</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}

export default TaoChungChi;
