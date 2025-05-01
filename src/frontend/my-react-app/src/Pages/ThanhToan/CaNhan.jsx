import React, { useState } from 'react';
import './CaNhan.css';

function CaNhan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('hoten');
  const [candidateData, setCandidateData] = useState(null);
  const [certificateData, setCertificateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setNotFound(false);
    setCandidateData(null);
    setCertificateData([]);

    let urlInfo = '';
    let urlCert = '';
    let params = {};

    if (searchType === 'cccd') {
      urlInfo = 'http://127.0.0.1:5000/thanhtoancanhan/timkiem_theo_cccd';
      urlCert = 'http://127.0.0.1:5000/thanhtoancanhan/timkiem_cc_theo_cccd';
      params = { cccd: searchTerm };
    } else if (searchType === 'ma_ts') {
      urlInfo = 'http://127.0.0.1:5000/thanhtoancanhan/timkiem_theo_ma_ts';
      urlCert = 'http://127.0.0.1:5000/thanhtoancanhan/timkiem_cc_theo_ma_ts';
      params = { ma_ts: searchTerm };
    } else if (searchType === 'ma_ptt') {
      urlInfo = 'http://127.0.0.1:5000/thanhtoancanhan/timkiem_theo_ma_ptt';
      urlCert = 'http://127.0.0.1:5000/thanhtoancanhan/timkiem_cc_theo_ma_ptt';
      params = { ma_ptt: searchTerm };
    }

    const infoUrl = new URL(urlInfo);
    infoUrl.search = new URLSearchParams(params).toString();

    const certUrl = new URL(urlCert);
    certUrl.search = new URLSearchParams(params).toString();

    try {
      const infoRes = await fetch(infoUrl);
      const infoData = await infoRes.json();

      console.log("📥 Dữ liệu thí sinh:", infoData);

      if (!infoData || infoData.error) {
        setNotFound(true);
        return;
      }

      setCandidateData(infoData[0]);

      const certRes = await fetch(certUrl);
      const certData = await certRes.json();

      console.log("📥 Dữ liệu chứng chỉ:", certData);

      if (Array.isArray(certData)) {
        setCertificateData(certData);
      }
    } catch (err) {
      console.error('❌ Lỗi khi tìm kiếm:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn thanh toán?');
    if (!confirmed) return;

    try {
      const res = await fetch('http://127.0.0.1:5000/thanhtoandonvi/capnhat_trangthai_thanhtoan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ma_ptt: searchTerm }),
      });

      const result = await res.json();
      if (result.success) {
        alert('✅ Thanh toán thành công!');
        handleSearch(); // Tải lại trạng thái mới
      } else {
        alert('⚠️ Có lỗi khi thanh toán.');
      }
    } catch (error) {
      console.error('❌ Lỗi hệ thống:', error);
      alert('Lỗi hệ thống. Vui lòng thử lại sau.');
    }
  };

  const calculateTotalAmount = () => {
    if (!certificateData) return 0;
    return certificateData.reduce((total, item) => {
      return total + (item.GIATIEN);
    }, 0);
  };

  return (
    <div className="payment-form">
      <h2>🔍 Tìm kiếm thí sinh</h2>

      <div>
        <label>Chọn loại tìm kiếm</label>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="cccd">CCCD</option>
          <option value="ma_ts">Mã thí sinh</option>
          <option value="ma_ptt">Mã phiếu thanh toán</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Đang tìm...' : 'Tìm kiếm'}
      </button>

      {notFound && <p style={{ color: 'red' }}>❌ Không tìm thấy thí sinh phù hợp.</p>}

      {candidateData && (
        <>
          <div>
            <label>Tên thí sinh</label>
            <input type="text" value={candidateData.HOTEN} readOnly />
          </div>
          <div>
            <label>Ngày sinh</label>
            <input type="text" value={candidateData.NGAYSINH} readOnly />
          </div>
          <div>
            <label>CCCD</label>
            <input type="text" value={candidateData.CCCD} readOnly />
          </div>
          <div>
            <label>Mã thí sinh</label>
            <input type="text" value={candidateData.MA_TS} readOnly />
          </div>  
          <div>
            <label>Người đăng ký</label>
            <input type="text" value={candidateData.NguoiDangKy} readOnly />
          </div>

          <div>
            <label>Chứng chỉ đăng ký</label>
            <table>
              <thead>
                <tr>
                  <th>Tên chứng chỉ</th>
                  <th>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {certificateData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.TenChungChi}</td>
                    <td>{item.GIATIEN}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <label>Số tiền cần trả</label>
            <input type="text" value={calculateTotalAmount() + ' VNĐ'} readOnly />
          </div>

          <div>
            <label>Tình trạng thanh toán</label>
            <input type="text" value={candidateData.TinhTrangThanhToan} readOnly />
          </div>

          {candidateData.TinhTrangThanhToan === 'Chưa thanh toán' && (
            <div>
              <button onClick={handlePayment}>Xác nhận thanh toán</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CaNhan;
