import React, { useState } from "react";
import Header from "../../component/Header/HeaderGiaHan";
import "./PhieuGiaHan.css";

const PhieuGiaHan = () => {
  const [cccd, setCccd] = useState("");
  const [phieu, setPhieu] = useState(null);

  const handleSearch = () => {
    // Giả lập fetch dữ liệu phiếu từ database
    setPhieu({
      maPhieu: "GH0001",
      mon: "TOEIC",
      truongHop: "Không đặc biệt",
      phi: "200,000",
      tinhTrang: "Chưa thanh toán",
      ngayLap: "10:51 AM 27/3/2025"
    });
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
              <button className="btn-confirm">In phiếu</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhieuGiaHan;
