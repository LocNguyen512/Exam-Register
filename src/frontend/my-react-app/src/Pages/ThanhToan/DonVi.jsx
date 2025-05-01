import React, { useState, useEffect } from 'react';

function DonVi() {
  const [searchTerm, setSearchTerm] = useState('');  // Từ khóa tìm kiếm
  const [searchType, setSearchType] = useState('ten_don_vi');  // Loại tìm kiếm
  const [customerData, setCustomerData] = useState(null);  // Dữ liệu khách hàng
  const [certificateData, setCertificateData] = useState(null);  // Dữ liệu chứng chỉ
  const [loading, setLoading] = useState(false);  // Trạng thái tìm kiếm

  // Xử lý sự kiện nhấn nút tìm kiếm
  const handleSearch = async () => {
    let url = '';  // Biến để chứa URL của API
    const params = { [searchType]: searchTerm };  // Tạo đối tượng chứa tham số gửi đi

    // Chọn URL API dựa vào loại tìm kiếm
    if (searchType === 'ten_don_vi') {
      url = 'http://127.0.0.1:5000/thanhtoandonvi/timkiem_theo_ten_don_vi';  // API tìm theo tên đơn vị
    } else if (searchType === 'ma_kh') {
      url = 'http://127.0.0.1:5000/thanhtoandonvi/timkiem_theo_ma_kh';  // API tìm theo mã khách hàng
    } else if (searchType === 'ma_ptt') {
      url = 'http://127.0.0.1:5000/thanhtoandonvi/timkiem_cc_theo_ma_ptt';  // API tìm theo mã phiếu thanh toán
    }

    // Tạo URL với tham số query string
    const urlWithParams = new URL(url, window.location.origin);
    urlWithParams.search = new URLSearchParams(params).toString();  // Tạo query string từ params

    setLoading(true);  // Đặt trạng thái loading khi bắt đầu tìm kiếm

    try {
      // Gửi yêu cầu GET với query string
      const customerResponse = await fetch(urlWithParams, {
        method: 'GET',  // Dùng GET
        headers: {
          'Content-Type': 'application/json',  // Nội dung là JSON
        },
      });

      const customerData = await customerResponse.json();  // Nhận kết quả trả về từ API
      console.log('Kết quả tìm kiếm khách hàng:', customerData);

      if (customerData) {
        setCustomerData(customerData);  // Lưu dữ liệu khách hàng vào state
        fetchCertificates(customerData.ma_kh);  // Tìm chứng chỉ liên quan đến khách hàng
      } else {
        setCustomerData(null);  // Nếu không có dữ liệu, reset state
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm khách hàng:', error);  // Log lỗi nếu có
    } finally {
      setLoading(false);  // Kết thúc trạng thái loading
    }
  };

  // Lấy danh sách chứng chỉ
  const fetchCertificates = async (ma_kh) => {
    let url = '';
    const params = { ma_kh };

    // Chọn URL API tìm chứng chỉ theo loại tìm kiếm
    if (searchType === 'ten_don_vi') {
      url = '/timkiem_cc_theo_ten_don_vi';
    } else if (searchType === 'ma_kh') {
      url = '/timkiem_cc_theo_ma_kh';
    } else if (searchType === 'ma_ptt') {
      url = '/timkiem_cc_theo_ma_ptt';
    }

    // Tạo URL với tham số query string
    const urlWithParams = new URL(url, window.location.origin);
    urlWithParams.search = new URLSearchParams(params).toString();

    try {
      // Gửi yêu cầu GET với query string
      const certificateResponse = await fetch(urlWithParams, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',  // Nội dung là JSON
        },
      });

      const certificateData = await certificateResponse.json();  // Nhận kết quả trả về từ API
      console.log('Danh sách chứng chỉ:', certificateData);

      if (certificateData) {
        setCertificateData(certificateData);  // Lưu danh sách chứng chỉ vào state
      } else {
        setCertificateData(null);  // Nếu không có chứng chỉ, reset state
      }
    } catch (error) {
      console.error('Lỗi khi tìm chứng chỉ:', error);  // Log lỗi nếu có
    }
  };

  // Hàm xử lý xác nhận thanh toán
  const handleConfirmPayment = async () => {
    // Hiển thị hộp thoại xác nhận
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn thanh toán cho khách hàng này không?');
    
    if (isConfirmed) {
      const ma_ptt = customerData?.ma_ptt;  // Lấy mã phiếu thanh toán từ dữ liệu khách hàng
      const tinh_trang = 'Đã thanh toán';  // Trạng thái thanh toán

      // Gửi yêu cầu API cập nhật tình trạng thanh toán
      try {
        const response = await fetch('/capnhat_trangthai_thanhtoan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Nội dung là JSON
          },
          body: JSON.stringify({ ma_ptt, tinh_trang }),  // Gửi mã phiếu thanh toán và trạng thái
        });

        const result = await response.json();
        if (result.success) {
          alert('Thanh toán thành công!');
          // Cập nhật lại trạng thái của khách hàng
          setCustomerData((prevData) => ({ ...prevData, tinhTrangThanhToan: tinh_trang }));
        } else {
          alert('Có lỗi khi thanh toán. Vui lòng thử lại!');
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái thanh toán:', error);  // Log lỗi nếu có
        alert('Lỗi hệ thống. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <div className="payment-form">
      <h2>🔍 Tìm kiếm khách hàng</h2>

      {/* Lựa chọn loại tìm kiếm */}
      <div>
        <label>Chọn loại tìm kiếm</label>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="ten_don_vi">Tên đơn vị</option>
          <option value="ma_kh">Mã khách hàng</option>
          <option value="ma_ptt">Mã phiếu thanh toán</option>
        </select>
      </div>

      {/* Input cho từ khóa tìm kiếm */}
      <input
        type="text"
        placeholder="Nhập từ khóa..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Nút tìm kiếm */}
      <button onClick={handleSearch}>Tìm kiếm</button>

      {/* Hiển thị thông báo khi đang tìm kiếm */}
      {loading && <p>🔄 Đang tìm kiếm...</p>}

      {/* Hiển thị thông tin khách hàng và chứng chỉ nếu có */}
      {customerData && !loading && (
        <div>
          <h3>Thông tin khách hàng</h3>
          <div>Tên đơn vị: {customerData.tenDonVi}</div>
          <div>Email: {customerData.email}</div>

          <h3>Danh sách chứng chỉ</h3>
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
              {certificateData && certificateData.map((item, index) => (
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
      )}

      {/* Nút xác nhận thanh toán */}
      {customerData && !loading && (
        <button onClick={handleConfirmPayment}>Xác nhận thanh toán</button>
      )}
    </div>
  );
}

export default DonVi;
