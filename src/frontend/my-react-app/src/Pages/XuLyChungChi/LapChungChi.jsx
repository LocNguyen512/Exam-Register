import React, { useState } from "react";
import Header from "../../component/Header/NVNhapLieu/HeaderBack";
import "./LapChungChi.css";

function TaoChungChi() {
    const [monThi, setMonThi] = useState("");
    const [ketQua, setKetQua] = useState("");
    const [ngayCap, setNgayCap] = useState("");
    const [cccdThiSinh, setCccdThiSinh] = useState("");
    const [maNhanVien, setMaNhanVien] = useState("");
    const [error, setError] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let message = "";

        switch (name) {
            case "monThi":
                if (!value.trim()) message = "Vui lòng nhập tên chứng chỉ.";
                break;
            case "ketQua":
                if (!value.trim() || isNaN(value) || value < 0 || value > 100) {
                    message = "Kết quả phải là số từ 0 đến 100.";
                }
                break;
            case "ngayCap":
                if (!value.trim()) {
                    message = "Vui lòng chọn ngày cấp.";
                } else {
                    const today = new Date().toISOString().split("T")[0];
                    if (value < today)
                        message = "Ngày cấp không được nhỏ hơn ngày hiện tại.";
                }
                break;
            case "cccdThiSinh":
                if (!/^\d{12}$/.test(value))
                    message = "CCCD phải gồm đúng 12 chữ số.";
                break;
            case "maNhanVien":
                if (!value.trim()) message = "Vui lòng nhập mã nhân viên. (Mẫu: NV0001)";
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: message }));
    };

    const validateInputs = () => {
        validateField("monThi", monThi);
        validateField("ketQua", ketQua);
        validateField("ngayCap", ngayCap);
        validateField("cccdThiSinh", cccdThiSinh);
        validateField("maNhanVien", maNhanVien);

        return (
            monThi.trim() &&
            ketQua.trim() &&
            !isNaN(ketQua) &&
            ketQua >= 0 &&
            ketQua <= 100 &&
            ngayCap.trim() &&
            /^\d{12}$/.test(cccdThiSinh) &&
            maNhanVien.trim()
        );
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);
      setSuccessMsg('');
      if (!validateInputs()) return;
    
      try {
        const response = await fetch('http://localhost:5000/QLchungchi/themChungChi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mon_thi: monThi,
            ket_qua: parseInt(ketQua),
            ngay_cap: ngayCap,
            cccd_thi_sinh: cccdThiSinh,
            ma_nhan_vien: maNhanVien,
          }),
        });
    
        const data = await response.json();
    
        if (data.success) {
          setSuccessMsg('LẬP CHỨNG CHỈ THÀNH CÔNG!');
          setMonThi('');
          setKetQua('');
          setNgayCap('');
          setCccdThiSinh('');
          setMaNhanVien('');
          setErrors({});
        } else {
          if (data.message && data.message.includes("không tìm thấy")) {
            setSuccessMsg('');
            setError(data.message);
          } else {
            setError("LỖI: KHÔNG THỂ LẬP CHỨNG CHỈ. VUI LÒNG KIỂM TRA DỮ LIỆU.");
          }
        }
      } catch (err) {
        console.error('Lỗi khi gửi yêu cầu:', err);
        setError("LỖI HỆ THỐNG: KHÔNG THỂ KẾT NỐI MÁY CHỦ.");
      }
    };
    

    return (
        <div className="layout">
            <Header />
            <div className="form-container">
                <h2>Lập chứng chỉ</h2>
                <form className="certificate-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            id="monThi"
                            value={monThi}
                            onChange={(e) => setMonThi(e.target.value)}
                            onBlur={() => validateField("monThi", monThi)}
                            required
                        />
                        <label htmlFor="monThi">Chứng chỉ</label>
                        {errors.monThi && (
                            <p className="error-msg">{errors.monThi}</p>
                        )}
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            id="ketQua"
                            value={ketQua}
                            onChange={(e) => setKetQua(e.target.value)}
                            onBlur={() => validateField("ketQua", ketQua)}
                            required
                        />
                        <label htmlFor="ketQua">Kết quả</label>
                        {errors.ketQua && (
                            <p className="error-msg">{errors.ketQua}</p>
                        )}
                    </div>
                    <div className="input-group">
                        <input
                            type="date"
                            id="ngayCap"
                            value={ngayCap}
                            onChange={(e) => setNgayCap(e.target.value)}
                            onBlur={() => validateField("ngayCap", ngayCap)}
                            required
                        />
                        <label htmlFor="ngayCap">Ngày cấp</label>
                        {errors.ngayCap && (
                            <p className="error-msg">{errors.ngayCap}</p>
                        )}
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            id="cccdThiSinh"
                            value={cccdThiSinh}
                            onChange={(e) => setCccdThiSinh(e.target.value)}
                            onBlur={() =>
                                validateField("cccdThiSinh", cccdThiSinh)
                            }
                            required
                        />
                        <label htmlFor="cccdThiSinh">CCCD thí sinh</label>
                        {errors.cccdThiSinh && (
                            <p className="error-msg">{errors.cccdThiSinh}</p>
                        )}
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            id="maNhanVien"
                            value={maNhanVien}
                            onChange={(e) => setMaNhanVien(e.target.value)}
                            onBlur={() =>
                                validateField("maNhanVien", maNhanVien)
                            }
                            required
                        />
                        <label htmlFor="maNhanVien">Mã nhân viên nhập</label>
                        {errors.maNhanVien && (
                            <p className="error-msg">{errors.maNhanVien}</p>
                        )}
                    </div>
                    <button type="submit" className="submit-btn">
                        LẬP CHỨNG CHỈ
                    </button>
                </form>
            </div>
            {(successMsg || error) && (
              <div className={`toast ${successMsg ? 'success' : 'error'}`}>
                {successMsg || error}
              </div>
            )}

        </div>
    );
}

export default TaoChungChi;
