import React, { useState, useContext } from 'react';
import UserContext from '../../component/Header/utils/context';


function CaNhan() {
  const userInfo = useContext(UserContext); // Lấy thông tin nhân viên từ context
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [candidateData, setCandidateData] = useState(null);
  const [certificateData, setCertificateData] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("⚠️ Vui lòng nhập mã phiếu đăng ký!");
      return;
    }
  
    setLoading(true);
    setNotFound(false);
    setCandidateData(null);
    setCertificateData([]);
  
    try {
      const url = new URL('http://localhost:5000/thanhtoancanhan/timkiem_theo_pdk');
      url.searchParams.append('ma_pdk', searchTerm.trim());
  
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
  
      const data = await res.json();
  
      if (data.status !== 'success') {
        setNotFound(true);
        return;
      }
  
      const phieu = data.data.phieu;
      const chungChiList = data.data.chung_chi || [];
  
      if (phieu.NGAYLAP) {
        phieu.NGAYLAP_FORMATTED = new Date(phieu.NGAYLAP).toLocaleDateString('vi-VN');
      }
  
      if (!phieu.TinhTrangThanhToan) {
        phieu.TinhTrangThanhToan = 'Chưa thanh toán';
      }
  
      setCandidateData(phieu);
      setCertificateData(chungChiList);
    } catch (err) {
      console.error('❌ Lỗi khi fetch:', err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };
  

  const calculateTotalAmount = () => {
    return certificateData.reduce((sum, item) => sum + (item.GIATIEN || 0), 0);
  };

  const handlePayment = async () => {
    if (!candidateData?.MA_PDK) return;


    try {
      const res = await fetch('http://localhost:5000/thanhtoancanhan/xacnhan_thanh_toan_pdk', {
        method: 'POST',
        credentials: 'include', // Gửi cookie session đến Flask
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ma_pdk: candidateData.MA_PDK,
          ma_nv: userInfo?.ma_nhan_vien
        }),
      });

      const data = await res.json();
      if (data.status === 'success') {
        alert('✅ Thanh toán thành công!');
        setCandidateData({
          ...candidateData,
          TinhTrangThanhToan: 'Đã thanh toán',
        });
      } else {
        alert('❌ Thanh toán thất bại: ' + data.message);
      }
    } catch (err) {
      alert('❌ Lỗi xác nhận thanh toán: ' + err.message);
    }
  };

  return (
    <div className="payment-form">
      <h2>🔍 Thanh toán phiếu đăng ký</h2>

      <input
        type="text"
        placeholder="Nhập mã phiếu đăng ký (VD: DK0001)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Đang tìm...' : 'Tìm kiếm'}
      </button>

      {notFound && <p style={{ color: 'red' }}>❌ Không tìm thấy phiếu đăng ký.</p>}

      {candidateData && (
        <>
          <div><label>Mã phiếu đăng ký</label><input type="text" value={candidateData.MA_PDK} readOnly /></div>
          <div><label>Ngày lập</label><input type="text" value={candidateData.NGAYLAP_FORMATTED || ''} readOnly /></div>
          <div><label>Số lượng thí sinh</label><input type="text" value={candidateData.SOLUONG} readOnly /></div>
          <div><label>Mã khách hàng</label><input type="text" value={candidateData.MA_KH} readOnly /></div>
          <div><label>Loại khách hàng</label><input type="text" value={candidateData.LOAIKH} readOnly /></div>
          <div><label>Mã nhân viên lập</label><input type="text" value={candidateData.MA_NV} readOnly /></div>

          <div>
            <label>📜 Chứng chỉ đã đăng ký</label>
            {certificateData.length > 0 ? (
              <table>
                <thead>
                  <tr><th>Tên chứng chỉ</th><th>Giá tiền</th></tr>
                </thead>
                <tbody>
                  {certificateData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.TenChungChi}</td>
                      <td>{item.GIATIEN.toLocaleString('vi-VN')} VNĐ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>Không có chứng chỉ nào được đăng ký.</p>}
          </div>

          <div>
            <label>💰 Tổng tiền</label>
            <input type="text" value={calculateTotalAmount().toLocaleString('vi-VN') + ' VNĐ'} readOnly />
          </div>

          <div>
            <label>🏷️ Tình trạng thanh toán</label>
            <input type="text" value={candidateData.TinhTrangThanhToan} readOnly />
          </div>

          {candidateData.TinhTrangThanhToan !== 'Đã thanh toán' && (
            <div>
              <button onClick={handlePayment}>✅ Xác nhận thanh toán</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CaNhan;
