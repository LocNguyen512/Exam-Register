import './DKCN.css';
import Header from '../../component/Header/Header';
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
    const [selectedCertificate, setSelectedCertificate] = useState('');
    const [examDates, setExamDates] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null); // lưu cả object lịch thi
    const [selectedRegistrations, setSelectedRegistrations] = useState([]);

    useEffect(() => {
      const fetchCertificates = async () => {
        try {
          const res = await axios.get('http://localhost:5000/dangKyThi/docds_dgnl');
          setCertificates(res.data);  // lưu danh sách vào state
        } catch (error) {
          console.error("Lỗi khi lấy danh sách chứng chỉ:", error);
        }
      };
    
      fetchCertificates();
    }, []);

    const handleCertificateChange = async (e) => {
      const selectedName = e.target.value;
      setSelectedCertificate(selectedName);
    
      try {
        const res = await axios.post('http://localhost:5000/dangKyThi/dslichthi', {
          tenloai: selectedName
        });
        setExamDates(res.data);
        setSelectedExam(null); // reset selected exam khi đổi chứng chỉ
      } catch (error) {
        console.error("Lỗi khi lấy ngày thi:", error);
        setExamDates([]);
      }
    };

    const handleExamDateChange = (e) => {
      const selectedId = e.target.value;
      const exam = examDates.find(item => item.maLichThi === selectedId);
      setSelectedExam(exam || null);
    };

    const handleDeleteRegistration = (index) => {
      setSelectedRegistrations(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddRegistration = async () => {
      if (!selectedCertificate || !selectedExam) {
        alert('Vui lòng chọn loại chứng chỉ và ngày thi!');
        return;
      }
    
      try {
        const newItem = {
          certName: selectedCertificate,
          maLichThi: selectedExam.maLichThi,
          ngayThi: new Date(selectedExam.ngayThi).toLocaleDateString('vi-VN'),
          maPhong: selectedExam.maPhong,
          soGheTrong: selectedExam.soGheTrong
        };
    
        const res = await axios.post('http://localhost:5000/dangKyThi/themdsthi', {
          currentItems: selectedRegistrations,
          newItem: newItem
        });
    
        if (res.data.message) {
          // ✅ Nếu hợp lệ → thêm vào bảng
          setSelectedRegistrations(prev => [...prev, newItem]);
    
          // ✅ Reset combobox giao diện thôi:
          setSelectedCertificate('');
          setSelectedExam(null); // chỉ clear chọn ngày thi, giữ examDates lại
        }
      } catch (err) {
        alert(err.response?.data?.error || "Lỗi khi thêm đăng ký.");
      }
    };

    const handleCheckCustomer = async () => {
      const customer = {
        fullName: fullNameRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value
      };
    
      const candidate = {
        fullName: fullNameTSRef.current.value,
        dob: dobTSRef.current.value,
        phone: sdtTSRef.current.value,
        email: emailTSRef.current.value,
        cccd: cccdTSRef.current.value,
      };
    
      try {
        const res = await axios.post('http://localhost:5000/dangKyThi/kiemtra', {
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
    
      if (selectedRegistrations.length === 0) {
        alert("Vui lòng chọn ít nhất 1 chứng chỉ và ngày thi để đăng ký.");
        return;
      }
    
      // 1. Lấy dữ liệu chuẩn bị gửi
      const customer = {
        fullName: fullNameRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value,
      };
    
      const candidate = {
        fullName: fullNameTSRef.current.value,
        dob: dobTSRef.current.value,
        phone: sdtTSRef.current.value,
        email: emailTSRef.current.value,
        cccd: cccdTSRef.current.value,
      };
    
      const danhSachDangKy = selectedRegistrations.map(item => ({
        maPhong: item.maPhong,
        maLich: item.maLichThi
      }));
    
      const payload = {
        thongTinKhachHang: customer,
        thongTinThiSinh: candidate,
        thongTinPhieu: {
          maNV: "NV0001", // 🚀 Nếu bạn chưa có login nhân viên thì hardcode tạm
          danhSachDangKy: danhSachDangKy
        }
      };
    
      try {
        // 2. Gửi lên server
        const res = await axios.post('http://localhost:5000/dangKyThi/themkhachhangtudo', payload);
    
        if (res.data.maPDK) {
          alert(`✅ Đăng ký thành công! Mã phiếu: ${res.data.maPDK}`);
    
          // 3. Reset lại form sau khi thành công
          fullNameRef.current.value = '';
          phoneRef.current.value = '';
          emailRef.current.value = '';
          fullNameTSRef.current.value = '';
          dobTSRef.current.value = '';
          sdtTSRef.current.value = '';
          emailTSRef.current.value = '';
          cccdTSRef.current.value = '';
    
          setSelectedCertificate('');
          setSelectedExam(null);
          setExamDates([]);
          setSelectedRegistrations([]);
          setHasCheckedValid(false);
        }
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Đăng ký thất bại, vui lòng thử lại.");
      }
    };
    

    const resetValidation = () => {
      setHasCheckedValid(false);
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
                <input id="cus-full-name" placeholder="Full name" ref={fullNameRef} onChange={resetValidation}/>
              </div>
              <div className="form-group">
                <label htmlFor="cus-phone">Số điện thoại</label>
                <input id="cus-phone" placeholder="Phone number" ref={phoneRef} onChange={resetValidation}/>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="cus-email">Email</label>
                <input id="cus-email" placeholder="Email" ref={emailRef} onChange={resetValidation}/>
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
                <input id="can-name" placeholder="Name" ref={fullNameTSRef} onChange={resetValidation}/>
              </div>
              <div className="form-group">
                <label htmlFor="can-dob">DOB</label>
                <input id="can-dob" type="date" ref={dobTSRef} onChange={resetValidation}/>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="can-phone">Số điện thoại</label>
                <input id="can-phone" placeholder="Phone number" ref={sdtTSRef} onChange={resetValidation}/>
              </div>
              <div className="form-group">
                <label htmlFor="can-email">Email</label>
                <input id="can-email" placeholder="Email" ref={emailTSRef} onChange={resetValidation}/>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label htmlFor="can-cccd">Số CCCD</label>
                <input id="can-cccd" placeholder="CCCD" ref={cccdTSRef} onChange={resetValidation}/>
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
              <div className="form-group">
                <label htmlFor="exam-type">Loại chứng chỉ</label>
                <select id="exam-type" value={selectedCertificate} onChange={handleCertificateChange}>
                  <option value="">-- Chọn loại chứng chỉ --</option>
                  {certificates.map((cert) => (
                    <option key={cert.id} value={cert.name}>
                      {cert.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="exam-date">Ngày thi</label>
                <select id="exam-date" value={selectedExam?.maLichThi || ''} onChange={handleExamDateChange}>
                  <option value="">-- Chọn ngày thi --</option>
                  {examDates.map((exam, index) => (
                    <option key={index} value={exam.maLichThi}>
                      {new Date(exam.ngayThi).toLocaleDateString('vi-VN')} ({exam.maPhong} - còn {exam.soGheTrong} ghế)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-right">
              <button className="btn-blue" onClick={handleAddRegistration}>Thêm</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Chứng chỉ</th>
                  <th>Ngày thi</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {selectedRegistrations.map((item, index) => (
                  <tr key={index}>
                    <td>{item.certName}</td>
                    <td>{item.ngayThi}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteRegistration(index)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
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