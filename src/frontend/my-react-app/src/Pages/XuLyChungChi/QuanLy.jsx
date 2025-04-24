import Header from '../../component/Header/NVNhapLieu/Header';
import { useNavigate } from 'react-router-dom';
import './QuanLy.css';

function Layout() {
    const navigate = useNavigate();
    const handleCreateCertificate = () => {
        navigate('/XuLyChungChi/LapChungChi'); // Đường dẫn tới trang mới
    };
return (
    <div className="layout">
      <Header />

      <div className="certificate-container">
        <div className="certificate-actions">
            <h2>Danh sách chứng chỉ</h2>
          <input type="text" placeholder="🔍 CCCD thí sinh" />
          <button className="search-btn">Tìm kiếm</button>
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
              {[
                ['CC0001', 'IELTS', '01/01/2025', 80, '000000000001', 'NV0001'],
                ['CC0002', 'TOEIC', '01/01/2025', 90, '000000000001', 'NV0001'],
                ['CC0003', 'MOS', '01/01/2025', 75, '000000000001', 'NV0001'],
                ['CC0004', 'TOÁN', '01/01/2025', 50, '000000000001', 'NV0001'],
                ['CC0005', 'VĂN', '01/01/2025', 100, '000000000002', 'NV0002'],
                ['CC0006', 'ANH', '01/01/2025', 70, '000000000002', 'NV0002'],
                ['CC0007', 'TIN HỌC', '01/01/2025', 90, '000000000002', 'NV0002'],
                ['CC0008', 'SỬ', '01/01/2025', 100, '000000000002', 'NV0002'],
                ['CC0009', 'ĐỊA', '01/01/2025', 70, '000000000002', 'NV0002'],
                ['CC0010', 'HÓA', '01/01/2025', 80, '000000000002', 'NV0002']
              ].map((item, index) => (
                <tr key={index}>
                  {item.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span>Show 1 to 10 of 200 results</span>
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
