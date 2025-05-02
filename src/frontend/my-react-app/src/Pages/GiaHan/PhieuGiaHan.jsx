import React, { useState } from "react";
import Header from "../../component/Header/NVKeToan/HeaderBack";
import "./PhieuGiaHan.css";

const PhieuGiaHan = () => {
  const [cccd, setCccd] = useState("");
  const [phieu, setPhieu] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await fetch("http://localhost:5000/phieugiahan/lay-phieu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cccd })
      });
  
      const result = await res.json();
      if (res.ok) {
        setPhieu(result);
      } else {
        alert(result.message || result.error || "Không tìm thấy phiếu");
        setPhieu(null);
      }
    } catch (err) {
      alert("Lỗi gọi API: " + err.message);
    }
  };
  
  const handlePrint = () => {
    alert("✅ In phiếu gia hạn thành công!");
  };
  

  return (
    <div className="giahan-layout">
      <Header />
      <div className="giahan-body">
        <h2>Lập phiếu gia hạn</h2>

        <div className="search-row">
          <input
            type="text"
            placeholder="CCCD"
            value={cccd}
            onChange={(e) => setCccd(e.target.value)}
          />
          <button className="btn-search" onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>

        {phieu && (
          <div className="phieu-container">
            <div className="phieu-title-row">
              <h3>Phiếu gia hạn</h3>
              <div className="phieu-date">Ngày lập &nbsp; {phieu.ngayLap}</div>
            </div>

            <div className="section-box">
              <div className="section-title">🧾 Thông tin gia hạn</div>
              <div className="info-grid">
                <div className="form-group">
                  <label>Mã phiếu gia hạn</label>
                  <input value={phieu.maPhieu} disabled />
                </div>
                <div className="form-group">
                  <label>Môn</label>
                  <input value={phieu.mon} disabled />
                </div>
                <div className="form-group">
                  <label>Trường hợp gia hạn</label>
                  <input value={phieu.truongHop} disabled />
                </div>
                <div className="form-group">
                  <label>Phí gia hạn</label>
                  <input value={phieu.phi} disabled />
                </div>
                <div className="form-group">
                  <label>Tình trạng</label>
                  <input value={phieu.tinhTrang} disabled />
                </div>
              </div>
            </div>

            <div className="print-center">
              <button className="btn-confirm" onClick={handlePrint}>In phiếu</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhieuGiaHan;
