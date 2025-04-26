import './DKCN.css';
import Header from '../../component/Header/NVTN/Header';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';


  function Layout() {
    // Khách hàng
    const fullNameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const provinceRef = useRef();

    // Thí sinh
    const fullNameTSRef = useRef();
    const dobTSRef = useRef();
    const sdtTSRef = useRef();
    const emailTSRef = useRef();
    const cccdTSRef = useRef();

    // Kiểm tra thông tin khách hàng
    const [hasCheckedValid, setHasCheckedValid] = useState(false);  
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
      const fetchCertificates = async () => {
        try {
          const res = await axios.get('http://localhost:5000/loaidgnl/docds_dgnl');
          setCertificates(res.data);  // lưu danh sách vào state
        } catch (error) {
          console.error("Lỗi khi lấy danh sách chứng chỉ:", error);
        }
      };
    
      fetchCertificates();
    }, []);

    const handleCheckCustomer = async () => {
      const customer = {
        fullName: fullNameRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value,
        address: addressRef.current.value,
        city: cityRef.current.value,
        province: provinceRef.current.value,
      };
    
      const candidate = {
        fullName: fullNameTSRef.current.value,
        dob: dobTSRef.current.value,
        phone: sdtTSRef.current.value,
        email: emailTSRef.current.value,
        cccd: cccdTSRef.current.value,
      };
    
      try {
        const res = await axios.post('http://localhost:5000/thisinh/kiemtra', {
          customer,
          candidate,
        });
    
        alert(res.data.message); // ✅ Dữ liệu hợp lệ
        setHasCheckedValid(true);
      } catch (err) {
        alert(err.response?.data?.error || 'Đã xảy ra lỗi kết nối với máy chủ');
        setHasCheckedValid(false);
      }
    };
    
    const handlePrintRegistration = async () => {
      if (!hasCheckedValid) {
        alert("Vui lòng kiểm tra thông tin khách hàng trước khi in phiếu.");
        return;
      }
    
      // Nếu muốn xác nhận lại với backend, có thể gọi validateData() lại ở đây.
      alert("✅ Thông tin đã được xác minh. Tiến hành in phiếu...");
      // window.print(); hoặc chuyển trang
    };
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <div className="dkcn-header">
        <h1>Thêm khách hàng</h1>

        <div className="alert">🔔 Vui lòng nhập đủ thông tin để tiếp tục</div>
        </div>

        <div className="grid">
          <div className="sidebar">
            <h3>Thông tin khách hàng</h3>
            <div className="customer-type-selector">
              <button className="type-btn inactive">
                <img src="/building.png" alt="Đơn vị" />
                Khách hàng đơn vị
              </button>
              <button className="type-btn active">
                <img src="/user.png" alt="Tự do" />
                Khách hàng tự do
              </button>
            </div>
          </div>

          <div className="form-section">
          <fieldset>
            <legend>
              <img src="/field-input-dkcn.png" alt="icon" className="legend-icon" />
              Khách hàng tự do
            </legend>
            <div className="row">
              <div className="form-group">
                <label htmlFor="cus-full-name">Tên khách hàng</label>
                <input id="cus-full-name" placeholder="Full name" ref={fullNameRef} />
              </div>
              <div className="form-group">
                <label htmlFor="cus-phone">Số điện thoại</label>
                <input id="cus-phone" placeholder="Phone number" ref={phoneRef} />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="cus-email">Email</label>
                <input id="cus-email" placeholder="Email" ref={emailRef} />
              </div>
              <div className="form-group">
                <label htmlFor="cus-address">Địa chỉ nhà</label>
                <input id="cus-address" placeholder="Add address" ref={addressRef} />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="cus-city">Thành phố</label>
                <input id="cus-city" placeholder="City" ref={cityRef} />
              </div>
              <div className="form-group">
                <label htmlFor="cus-province">Tỉnh thành</label>
                <input id="cus-province" placeholder="Province" ref={provinceRef} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <img src="/field-input-dkcn.png" alt="icon" className="legend-icon" />
              Thông tin thí sinh
            </legend>
            <div className="row">
              <div className="form-group">
                <label htmlFor="can-name">Họ tên</label>
                <input id="can-name" placeholder="Name" ref={fullNameTSRef} />
              </div>
              <div className="form-group">
                <label htmlFor="can-dob">DOB</label>
                <input id="can-dob" type="date" ref={dobTSRef} />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="can-phone">Số điện thoại</label>
                <input id="can-phone" placeholder="Phone number" ref={sdtTSRef} />
              </div>
              <div className="form-group">
                <label htmlFor="can-email">Email</label>
                <input id="can-email" placeholder="Email" ref={emailTSRef} />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="can-cccd">Số CCCD</label>
                <input id="can-cccd" placeholder="CCCD" ref={cccdTSRef} />
              </div>
            </div>
            <button className="btn-blue" onClick={handleCheckCustomer}>Kiểm tra thông tin khách hàng</button>
          </fieldset> 
            <fieldset>
            <legend>
              <img src="/field-input-dkcn.png" alt="icon" class="legend-icon" />
              Chứng chỉ đăng ký
            </legend>
              <div className="row">
                <div class="form-group">  
                  <label for="exam-type">Loại chứng chỉ</label> 
                  <select>
                    {certificates.map((cert) => (
                      <option key={cert.id} value={cert.name}>
                        {cert.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="form-group">
                  <label for="exam-date">Ngày thi</label> 
                  <input id="exam-date" placeholder="mm/dd/yyyy" type="date" />
                </div>
              </div>
              <button className="btn-blue">Thêm</button>

              <table>
                <thead>
                  <tr>
                    <th>Chứng chỉ</th>
                    <th>Ngày thi</th>
                    <th></th> {/* <-- Cột thêm vào */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>IELTS</td>
                    <td>22/12/2025</td>
                    <td><button className="btn-delete">Xóa</button></td>
                  </tr>
                  <tr>
                    <td>MOS</td>
                    <td>22/12/2025</td>
                    <td><button className="btn-delete">Xóa</button></td>
                  </tr>
                </tbody>
              </table>

              <div className="text-right">
                <button className="btn-purple" onClick={handlePrintRegistration}>In phiếu đăng ký →</button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;