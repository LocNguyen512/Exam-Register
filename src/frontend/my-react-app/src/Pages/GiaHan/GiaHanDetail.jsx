import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './GiaHanDetail.css';
import HeaderGiaHan from '../../component/Header/NVTiepNhan/HeaderBack';
import userContext from '../../component/Header/utils/context';
import { useContext } from 'react';
function GiaHanDetail() {
  const { sobaodanh } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useContext(userContext);
  const [info, setInfo] = useState(null);
  const [giaHanData, setGiaHanData] = useState(null);

  useEffect(() => {
    if (!sobaodanh) {
      navigate('/NVTN');
      return;
    }

    // TODO: gọi API thực tế
    fetch("http://localhost:5000/QLgiahan/tra-cuu", {
      method: "POST",
      credentials: "include", // Gửi cookie session đến Flask
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sobaodanh }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Không tìm thấy thí sinh");
        return res.json();
      })
      .then((data) => {
        setInfo(data);

        if (
          location.state &&
          location.state.autoOpenDetail &&
          location.state.monThi &&
          location.state.newDate
        ) {
          const selected = data.dangKy.find(d => d.monThi === location.state.monThi);
          if (selected) {
            setGiaHanData({
              monThi: selected.monThi,
              ngayThi: selected.ngayThi,
              ngayGiaHan: location.state.newDate,
              lanGiaHan: 1,
              db: false,
              kdb: false
            });
          }
        }
      })
      .catch((err) => alert(err.message));
  }, [sobaodanh, navigate, location.state]);

  const handleClickGiaHan = (monThi) => {
    // Tìm dòng môn thi tương ứng để lấy số báo danh
    const mon = info.dangKy.find((m) => m.monThi === monThi);
    if (!mon || !mon.sobaodanh) {
      alert("Không tìm thấy số báo danh của môn thi này.");
      return;
    }
  
    // Gọi API kiểm tra điều kiện gia hạn theo SBD
    fetch("http://localhost:5000/QLgiahan/kiem-tra-gia-han", {
      method: "POST",
      credentials: "include", // Gửi cookie session đến Flask
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sobaodanh: mon.sobaodanh })
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.hop_le) {
          setGiaHanData({
            monThi: mon.monThi,
            ngayThi: mon.ngayThi,
            ngayGiaHan: '',
            lanGiaHan: result.lan_gia_han || 0,
            db: false,
            kdb: false
          });
        } else {
          alert(result.thong_bao || "Không đủ điều kiện gia hạn.");
        }
      })
      .catch((err) => alert("Lỗi kiểm tra điều kiện gia hạn: " + err.message));
  };
  
  const handleXacNhan = async () => {
    if (!giaHanData || !giaHanData.ngayGiaHan) {
      alert("Vui lòng chọn ngày gia hạn.");
      return;
    }

    const truongHop = giaHanData.db ? "Đặc biệt" : giaHanData.kdb ? "Không đặc biệt" : "";
    if (!truongHop) {
      alert("Vui lòng chọn trường hợp gia hạn.");
      return;
    }

    const payload = {
      sobaodanh,
      mon: giaHanData.monThi,
      ngay_gia_han: giaHanData.ngayGiaHan,
      truong_hop: truongHop,
      ma_nvtn: userInfo?.ma_nhan_vien,
      ma_nvkt: null
    };

    try {
      const res = await fetch("http://localhost:5000/QLgiahan/xac-nhan-gia-han", {
        method: "POST",
        credentials: "include", // Gửi cookie session đến Flask
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (res.ok) {
        alert("✅ " + result.message);
        navigate('/NVTN/GiaHan');
        setGiaHanData(null);
      } else {
        alert("❌ Lỗi: " + (result.error || "Không rõ lỗi"));
      }
    } catch (err) {
      alert("Lỗi xử lý: " + err.message);
    }
  };

  if (!info) return <div>Đang tải...</div>;

  return (
    <div className="gh-giahan-detail">
      <HeaderGiaHan />
      <div className="gh-section">
        <div className="gh-section-title">🧾 Thông tin thí sinh</div>
        <div className="gh-grid-2col">
          <div><label>Mã thí sinh</label><input readOnly value={info.info.maTS} /></div>
          <div><label>Tên thí sinh</label><input readOnly value={info.info.tenTS} /></div>
          <div><label>Email</label><input readOnly value={info.info.email} /></div>
          <div><label>Số báo danh</label><input readOnly value={info.info.baoDanh} /></div>
          <div><label>Ngày sinh</label><input readOnly value={new Date(info.info.ngaySinh).toLocaleDateString('vi-VN')} /></div>
          <div><label>CCCD</label><input readOnly value={info.info.cccd} /></div>
          <div><label>Số điện thoại</label><input readOnly value={info.info.dienThoai} /></div>
        </div>
      </div>

      <div className="gh-section">
        <div className="gh-section-title">📘 Danh sách chứng chỉ đã đăng ký</div>
        <table className="gh-table">
          <thead>
            <tr><th>Môn thi</th><th>Ngày thi hiện tại</th><th></th></tr>
          </thead>
          <tbody>
            {info.dangKy.map((item) => (
              <tr key={item.monThi}>
                <td>{item.monThi}</td>
                <td>{new Date(item.ngayThi).toLocaleDateString("vi-VN")}</td>
                <td><button onClick={() => handleClickGiaHan(item.monThi)}>Gia hạn</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {giaHanData && (
        <div className="gh-section">
          <div className="gh-section-title">📄 Chi tiết gia hạn</div>
          <table className="gh-table">
            <thead>
              <tr>
                <th>Môn thi</th>
                <th>Ngày thi hiện tại</th>
                <th>Ngày gia hạn</th>
                <th>Trường hợp gia hạn</th>
                <th>Số lần gia hạn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{giaHanData.monThi}</td>
                <td>{new Date(giaHanData.ngayThi).toLocaleDateString("vi-VN")}</td>
                <td>
                  <input
                    type="text"
                    readOnly
                    value={giaHanData.ngayGiaHan || "Chọn ngày"}
                    onClick={() =>
                      navigate(`/NVTN/GiaHan/${sobaodanh}/${giaHanData.monThi}`, {
                        state: { autoOpenDetail: true }
                      })
                    }
                    className="clickable-date"
                  />
                </td>

                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={giaHanData.db}
                      onChange={(e) =>
                        setGiaHanData(prev => ({ ...prev, db: e.target.checked }))
                      }
                    /> Đặc biệt
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={giaHanData.kdb}
                      onChange={(e) =>
                        setGiaHanData(prev => ({ ...prev, kdb: e.target.checked }))
                      }
                    /> Không đặc biệt
                  </label>
                </td>
                <td>
                  <input
                    type="number"
                    min={1}
                    value={giaHanData.lanGiaHan}
                    onChange={(e) =>
                      setGiaHanData(prev => ({ ...prev, lanGiaHan: parseInt(e.target.value) }))
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="gh-center-button">
            <button onClick={handleXacNhan}>XÁC NHẬN</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GiaHanDetail;
