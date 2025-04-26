import React, { useState, useEffect } from 'react';
import './DonVi.css';

function CaNhan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);

  // Dữ liệu giả cho đơn vị
  const mockData = {
    tenDonVi: "David Smith",
    email: "TS0123",
    danhSachDangKy: [
      { ten: "IELTS", soLuong: 80, ngayThi: "20/10/2025", donGia: "5,000,000" },
      { ten: "MOS", soLuong: 100, ngayThi: "20/11/2025", donGia: "108,000" },
      { ten: "TOEIC", soLuong: 150, ngayThi: "20/5/2025", donGia: "1,080,000" },
    ],
    soTienCanTra: "6,188,000",
    tinhTrangThanhToan: "Chưa thanh toán"
  };

  useEffect(() => {
    if (searchTerm.toLowerCase() === 'david') {
      setData(mockData);
    } else {
      setData(null);
    }
  }, [searchTerm]);

  return (
    <div className="payment-form">
      <h2>🔍 Tìm kiếm (Mã phiếu đăng ký)</h2>
      <input
        type="text"
        placeholder="Nhập mã phiếu đăng ký..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {searchTerm !== '' && data ? (
        <>
          <div>
            <label>Tên đơn vị</label>
            <input type="text" value={data.tenDonVi} readOnly />
          </div>
          <div>
            <label>Email</label>
            <input type="text" value={data.email} readOnly />
          </div>

          <div>
            <h3>Danh sách đã đăng ký</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Tên chứng chỉ</th>
                  <th>Số lượng</th>
                  <th>Ngày thi</th>
                  <th>Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {data.danhSachDangKy.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ten}</td>
                    <td>{item.soLuong}</td>
                    <td>{item.ngayThi}</td>
                    <td>{item.donGia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <label>Số tiền cần trả</label>
            <input type="text" value={data.soTienCanTra} readOnly />
          </div>

          <div>
            <label>Tình trạng thanh toán</label>
            <input type="text" value={data.tinhTrangThanhToan} readOnly />
          </div>

          <div className="button-group">
            <button className="btn-confirm">Xác nhận thanh toán</button>
          </div>
        </>
      ) : (
        searchTerm !== '' && <p>❌ Không tìm thấy dữ liệu.</p>
      )}
    </div>
  );
}

export default CaNhan;
