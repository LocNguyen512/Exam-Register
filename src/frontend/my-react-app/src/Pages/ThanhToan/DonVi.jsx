import React, { useState } from 'react';

function DonVi() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('ten_don_vi');
  const [customerData, setCustomerData] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    let url = '';
    const params = { [searchType]: searchTerm };

    if (searchType === 'ten_don_vi') {
      url = 'http://127.0.0.1:5000/thanhtoandonvi/timkiem_theo_ten_don_vi';
    } else if (searchType === 'ma_kh') {
      url = 'http://127.0.0.1:5000/thanhtoandonvi/timkiem_theo_ma_kh';
    } else if (searchType === 'ma_ptt') {
      url = 'http://127.0.0.1:5000/thanhtoandonvi/timkiem_theo_ma_ptt';
    }

    const urlWithParams = new URL(url, window.location.origin);
    urlWithParams.search = new URLSearchParams(params).toString();

    setLoading(true);
    setNotFound(false);

    try {
      const customerResponse = await fetch(urlWithParams);
      const rawData = await customerResponse.json();
      console.log('📦 Kết quả trả về từ API khách hàng:', rawData);

      let customer = null;
      if (Array.isArray(rawData) && rawData.length > 0) {
        customer = rawData[0];
      } else if (rawData && typeof rawData === 'object') {
        customer = rawData;
      }

      if (customer) {
        setCustomerData(customer);
        if (searchType === 'ma_ptt') {
          fetchCertificates(null, customer.ma_ptt);
        } else {
          fetchCertificates(customer.ma_kh);
        }
      } else {
        setCustomerData(null);
        setCertificateData(null);
        setNotFound(true);
      }
    } catch (error) {
      console.error('❌ Lỗi khi tìm kiếm khách hàng:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificates = async (ma_kh = null, ma_ptt = null) => {
    let url = '';
    let params = {};

    if (searchType === 'ten_don_vi') {
      url = 'http://127.0.0.1:5000/thanhtoandonvi/timkiem_cc_theo_ten_don_vi';
      params = { ten_don_vi: searchTerm };
    } else if (searchType === 'ma_kh') {
      url = 'http://127.0.0.1:5000/thanhtoandonvi/timkiem_cc_theo_ma_dv';
      params = { ma_kh: searchTerm };
    } else if (searchType === 'ma_ptt') {
      url = 'http://127.0.0.1:5000/thanhtoandonvi/timkiem_cc_theo_ma_ptt';
      params = { ma_ptt: searchTerm };
    }

    const urlWithParams = new URL(url, window.location.origin);
    urlWithParams.search = new URLSearchParams(params).toString();

    try {
      const response = await fetch(urlWithParams);
      const data = await response.json();
      console.log('📄 Danh sách chứng chỉ:', data);

      if (Array.isArray(data) && data.length > 0) {
        setCertificateData(data);
      } else {
        setCertificateData([]);
      }
    } catch (error) {
      console.error('❌ Lỗi khi tìm chứng chỉ:', error);
    }
  };

  const handleConfirmPayment = async () => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn thanh toán cho khách hàng này không?');

    if (isConfirmed) {
      const ma_ptt = searchTerm;
      try {
        const response = await fetch('http://127.0.0.1:5000/thanhtoandonvi/capnhat_trangthai_thanhtoan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ma_ptt })
        });

        const result = await response.json();

        if (result.success) {
          alert('✅ Thanh toán thành công!');
          setCustomerData((prev) => ({ ...prev }));
        } else {
          alert('⚠️ Có lỗi khi thanh toán. Vui lòng thử lại!');
        }
      } catch (error) {
        console.error('❌ Lỗi khi cập nhật trạng thái thanh toán:', error);
        alert('Lỗi hệ thống. Vui lòng thử lại sau.');
      }
    }
  };

  // Tính tổng tiền
  const calculateTotalAmount = () => {
    if (!certificateData) return 0;
    return certificateData.reduce((total, item) => {
      return total + (item.SOLUONG * item.TongTienCanTra);
    }, 0);
  };

  return (
    <div className="payment-form">
      <h2>🔍 Tìm kiếm khách hàng</h2>

      <div>
        <label>Chọn loại tìm kiếm</label>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="ten_don_vi">Tên đơn vị</option>
          <option value="ma_kh">Mã khách hàng</option>
          <option value="ma_ptt">Mã phiếu thanh toán</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Nhập từ khóa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Đang tìm...' : 'Tìm kiếm'}
      </button>

      {notFound && <p style={{ color: 'red' }}>❌ Không tìm thấy khách hàng phù hợp.</p>}

      {customerData && !loading && (
        <div>
          <h3>📋 Thông tin khách hàng</h3>
          <div>
            <label>Tên đơn vị</label>
            <input type="text" value={customerData.TENDONVI} readOnly />
          </div>
          <div>
            <label>Email</label>
            <input type="text" value={customerData.EMAIL} readOnly />
          </div>
          <div>
            <label>Trạng thái thanh toán</label>
            <input type="text" value={customerData.TinhTrangThanhToan} readOnly />
          </div>

          <h3>📚 Danh sách chứng chỉ</h3>
          {certificateData && certificateData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Tên chứng chỉ</th>
                  <th>Số lượng</th>
                  <th>Ngày thi</th>
                  <th>Đơn giá</th>
                </tr>
              </thead>
              <tbody>
                {certificateData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.TenChungChi}</td>
                    <td>{item.SOLUONG}</td>
                    <td>{item.NGAYTHI}</td>
                    <td>{item.TongTienCanTra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có chứng chỉ nào.</p>
          )}

          {/*Tổng số tiền cần thanh toán */}
          <div>
            <label>Số tiền cần trả</label>
            <input type="text" value={calculateTotalAmount() + ' VNĐ'} readOnly />
          </div>

          {/* Trạng thái thanh toán */}
          <div>
            <label>Tình trạng thanh toán</label>
            <input type="text" value={customerData.TinhTrangThanhToan} readOnly />
          </div>

          <button style={{ marginTop: '16px' }} onClick={handleConfirmPayment}>
            Xác nhận thanh toán
          </button>
        </div>
      )}
    </div>
  );
}

export default DonVi;
