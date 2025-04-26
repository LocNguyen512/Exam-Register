import React, { useState, useEffect } from 'react';
import './GiaHan.css';

function GiaHan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);

  // Mock dữ liệu
  const mockData = {
    tenThiSinh: "David Smith",
    maThiSinh: "TS0123",
    ngaySinh: "20/03/2000",
    gioiTinh: "Nam",
    cccd: "089438163493",
    nguoiDangKy: "Trường Đại học ABC",
    danhSachGiaHan: [
      {
        tenChungChi: "IELTS",
        ngayThiCu: "20/03/2025",
        ngayThiGiaHan: "20/05/2025",
        phiGiaHan: "500,000",
      },
      {
        tenChungChi: "MOS",
        ngayThiCu: "10/04/2025",
        ngayThiGiaHan: "10/06/2025",
        phiGiaHan: "300,000",
      },
    ],
    soTienCanTra: "800,000",
    tinhTrangThanhToan: "Chưa thanh toán",
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
      <h2>🔍 Tìm kiếm gia hạn</h2>
      <input
        type="text"
        placeholder="Nhập tên thí sinh..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {searchTerm && data ? (
        <>
          <div>
            <label>Tên thí sinh</label>
            <input type="text" value={data.tenThiSinh} readOnly />
          </div>
          <div>
            <label>Mã thí sinh</label>
            <input type="text" value={data.maThiSinh} readOnly />
          </div>
          <div>
            <label>Ngày sinh</label>
            <input type="text" value={data.ngaySinh} readOnly />
          </div>
          <div>
            <label>Giới tính</label>
            <input type="text" value={data.gioiTinh} readOnly />
          </div>
          <div>
            <label>CCCD</label>
            <input type="text" value={data.cccd} readOnly />
          </div>
          <div>
            <label>Người đăng ký / Đơn vị đăng ký</label>
            <input type="text" value={data.nguoiDangKy} readOnly />
          </div>

          <div>
            <label>Danh sách gia hạn</label>
            <table>
              <thead>
                <tr>
                  <th>Tên chứng chỉ</th>
                  <th>Ngày thi cũ</th>
                  <th>Ngày thi gia hạn</th>
                  <th>Phí gia hạn</th>
                </tr>
              </thead>
              <tbody>
                {data.danhSachGiaHan.map((item, index) => (
                  <tr key={index}>
                    <td>{item.tenChungChi}</td>
                    <td>{item.ngayThiCu}</td>
                    <td>{item.ngayThiGiaHan}</td>
                    <td>{item.phiGiaHan}</td>
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
        searchTerm && <p>❌ Không tìm thấy thí sinh phù hợp.</p>
      )}
    </div>
  );
}

export default GiaHan;
