import React, { useState, useEffect } from 'react';
import Header from '../../component/Header/NVNhapLieu/Header';
import { useNavigate } from 'react-router-dom';
import './QuanLy.css';

function Layout() {
  const [chungChiList, setChungChiList] = useState([]);  // Dữ liệu chứng chỉ từ API
  const [searchTerm, setSearchTerm] = useState('');  // Search term CCCD
  const navigate = useNavigate();
  useEffect(() => {
    // Gọi API để lấy danh sách chứng chỉ
    fetch("http://localhost:5000/chungchi/laychungchi")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setChungChiList(data.data); // Giả sử backend trả về dữ liệu đúng
        } else {
          console.error("Không lấy được dữ liệu chứng chỉ");
        }
      })
      .catch(err => {
        console.error("Lỗi khi gọi API:", err);
      });
  }, []);

  const handleCreateCertificate = () => {
      navigate('/XuLyChungChi/LapChungChi'); // Đường dẫn tới trang mới
  };
  const handleSearch = () => {
    // Bạn có thể gọi API tìm kiếm với searchTerm nếu cần
    console.log("Tìm kiếm với CCCD:", searchTerm);
  };
return (
    <div className="layout">
      <Header />

      <div className="certificate-container">
        <div className="certificate-actions">
            <h2>Danh sách chứng chỉ</h2>
          <input type="text" placeholder="🔍 CCCD thí sinh" />
          <button className="search-btn" onClick={handleSearch}>Tìm kiếm</button>
          <button className="create-btn" onClick={handleCreateCertificate}>+ Lập chứng chỉ mới</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>MÃ CHỨNG CHỈ</th>
                <th>Môn thi</th>
                <th>NGÀY CẤP</th>
                <th>KẾT QUẢ</th>
                <th>CCCD</th>
                <th>NHÂN VIÊN NHẬP</th>
              </tr>
            </thead>
            <tbody>
              {chungChiList.length > 0 ? (
                chungChiList.map((cc, index) => (
                  <tr key={index}>
                    <td>{cc.ma_chung_chi}</td>
                    <td>{cc.mon_thi}</td>
                    <td>{new Date(cc.ngay_cap).toLocaleDateString()}</td>
                    <td>{cc.ket_qua}</td>
                    <td>{cc.cccd_thi_sinh}</td>
                    <td>{cc.ma_nhan_vien_nhap}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Không có chứng chỉ nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span>Show 1 to 10 of {chungChiList.length} results</span>
          <div className="page-numbers">
            {[1, 2, 3, 4, 10, 11].map((p) => (
              <button key={p} className={p === 1 ? 'active' : ''}>{p}</button>
            ))}
          </div>
      </div>
      
      </div>
    </div>
  );
}

export default Layout;
