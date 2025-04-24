import React, { useState, useEffect } from 'react';
import './CaNhan.css';

function CaNhan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);

  // Mock dữ liệu ban đầu
  const mockData = {
    tenThiSinh: "David Smith",
    ngaySinh: "20/03/2000",
    cccd: "089438163493",
    maThiSinh: "TS0123",
    gioiTinh: "Nam",
    nguoiDangKy: "Taylor Swift",
    chungChiDangKy: [
      { ten: "Toeic", gia: "1,080,000" },
      { ten: "MOS", gia: "108,000" },
      { ten: "IELTS", gia: "5,000,000" },
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
      <h2>🔍 Tìm kiếm thí sinh</h2>
      <input
        type="text"
        placeholder="Nhập tên thí sinh..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {searchTerm !== '' && data ? (
        <>
          <div>
            <label>Tên thí sinh</label>
            <input type="text" value={data.tenThiSinh} readOnly />
          </div>
          <div>
            <label>Ngày sinh</label>
            <input type="text" value={data.ngaySinh} readOnly />
          </div>
          <div>
            <label>CCCD</label>
            <input type="text" value={data.cccd} readOnly />
          </div>
          <div>
            <label>Mã thí sinh</label>
            <input type="text" value={data.maThiSinh} readOnly />
          </div>
          <div>
            <label>Giới tính</label>
            <input type="text" value={data.gioiTinh} readOnly />
          </div>
          <div>
            <label>Người đăng ký</label>
            <input type="text" value={data.nguoiDangKy} readOnly />
          </div>

          <div>
            <label>Chứng chỉ đăng ký</label>
            <table>
              <thead>
                <tr>
                  <th>Tên chứng chỉ</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {data.chungChiDangKy.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ten}</td>
                    <td>{item.gia}</td>
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

          <div>
            <button>Xác nhận thanh toán</button>
          </div>
        </>
      ) : (
        searchTerm !== '' && <p>❌ Không tìm thấy thí sinh phù hợp.</p>
      )}
    </div>
  );
}

export default CaNhan;
