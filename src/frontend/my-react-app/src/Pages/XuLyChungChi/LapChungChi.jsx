import React, { useState, useEffect } from "react";
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
    const [isFormValid, setIsFormValid] = useState(false); // Trạng thái kiểm tra form hợp lệ
    const [showCertificateModal, setShowCertificateModal] = useState(false); // Trạng thái hiển thị modal danh sách chứng chỉ
    const [availableCertificates, setAvailableCertificates] = useState([]);

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
                if (!value.trim()) {
                    message = "Vui lòng nhập mã nhân viên. (Mẫu: NV0001)";
                } else if (!/^NV\d{4}$/.test(value)) {
                    message =
                        "Mã nhân viên phải theo mẫu: NV0001 (2 ký tự 'NV' và 4 chữ số).";
                }
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: message }));
        return message === ""; // Trả về true nếu không có lỗi, false nếu có lỗi
    };

    const validateInputs = () => {
        const monThiValid = validateField("monThi", monThi);
        const ketQuaValid = validateField("ketQua", ketQua);
        const ngayCapValid = validateField("ngayCap", ngayCap);
        const cccdThiSinhValid = validateField("cccdThiSinh", cccdThiSinh);
        const maNhanVienValid = validateField("maNhanVien", maNhanVien);

        return (
            monThiValid &&
            ketQuaValid &&
            ngayCapValid &&
            cccdThiSinhValid &&
            maNhanVienValid
        );
    };

    useEffect(() => {
        // Gọi API danh sách chứng chỉ
        const fetchCertificates = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/QLchungchi/docds_dgnl"
                );
                const data = await response.json();

                if (Array.isArray(data)) {
                    // Lưu toàn bộ object để sử dụng name sau
                    setAvailableCertificates(data);
                } else {
                    console.error("API trả về không đúng định dạng:", data);
                }
            } catch (err) {
                console.error("Lỗi khi gọi API chứng chỉ:", err);
            }
        };

        fetchCertificates();
    }, []); // chỉ gọi một lần khi component mount

    useEffect(() => {
        setIsFormValid(validateInputs()); // kiểm tra form
    }, [monThi, ketQua, ngayCap, cccdThiSinh, maNhanVien]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setSuccessMsg("");

        // Kiểm tra lại tính hợp lệ của form ngay trước khi submit
        if (!isFormValid) {
            setError("Vui lòng kiểm tra lại thông tin.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/QLchungchi/themChungChi",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mon_thi: monThi,
                        ket_qua: parseInt(ketQua),
                        ngay_cap: ngayCap,
                        cccd_thi_sinh: cccdThiSinh,
                        ma_nhan_vien: maNhanVien,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuccessMsg("LẬP CHỨNG CHỈ THÀNH CÔNG!");
                setMonThi("");
                setKetQua("");
                setNgayCap("");
                setCccdThiSinh("");
                setMaNhanVien("");
                setErrors({});
            } else {
                if (data.message && data.message.includes("không tìm thấy")) {
                    setSuccessMsg("");
                    setError(data.message);
                } else {
                    setError(
                        "LỖI: KHÔNG THỂ LẬP CHỨNG CHỈ. VUI LÒNG KIỂM TRA DỮ LIỆU."
                    );
                }
            }
        } catch (err) {
            console.error("Lỗi khi gửi yêu cầu:", err);
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
                        <button
                            type="button"
                            onClick={() => setShowCertificateModal(true)}
                        >
                            Chọn chứng chỉ
                        </button>
                    </div>

                    {/* Modal hiển thị danh sách chứng chỉ */}
                    {/* Modal hiển thị danh sách chứng chỉ */}
                    {showCertificateModal && (
                        <div
                            className="modal"
                            style={{
                                position: "fixed",
                                top: "20%",
                                left: "70%",
                            }}
                        >
                            <div className="modal-content">
                                <span
                                    className="close-btn"
                                    onClick={() =>
                                        setShowCertificateModal(false)
                                    }
                                >
                                    &times;
                                </span>
                                <h3>Chọn chứng chỉ</h3>
                                <ul className="certificate-list">
                                    {availableCertificates.map(
                                        (certificate, index) => (
                                            <li
                                                key={index}
                                                className="certificate-item"
                                                onClick={() => {
                                                    setMonThi(certificate.name);
                                                    setShowCertificateModal(
                                                        false
                                                    );
                                                }}
                                            >
                                                {certificate.name}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

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
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={!isFormValid}
                    >
                        Lập chứng chỉ
                    </button>
                </form>
                {(successMsg || error) && (
                    <div
                        className={`toast ${successMsg ? "success" : "error"}`}
                    >
                        {successMsg || error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaoChungChi;

// Kiểm tra mã thí sinh và mã nhân viên có tồn tại trong database
