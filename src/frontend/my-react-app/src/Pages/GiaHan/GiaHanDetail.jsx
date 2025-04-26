import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './GiaHanDetail.css';
import HeaderGiaHan from '../../component/Header/HeaderBack';

function GiaHanDetail() {
  const { cccd } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [info, setInfo] = useState(null);
  const [giaHanData, setGiaHanData] = useState(null);

  useEffect(() => {
    if (!cccd) {
      navigate('/');
      return;
    }

    // TODO: gọi API thực tế
    const mockData = {
      info: {
        maTS: 'TS0123',
        tenTS: 'David Smith',
        baoDanh: '012849343',
        cccd: cccd,
        maPhieu: 'DT0123',
        email: 'BoGia2000@gmail.com',
        ngaySinh: '20/3/2000',
        dienThoai: '0835731943',
      },
      dangKy: [
        { monThi: 'MOS', ngayThi: '2025-09-25' },
        { monThi: 'TOEIC', ngayThi: '2025-01-01' },
      ]
    };

    setInfo(mockData);

    if (
      location.state &&
      location.state.autoOpenDetail &&
      location.state.monThi &&
      location.state.newDate
    ) {
      const selected = mockData.dangKy.find(d => d.monThi === location.state.monThi);
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
  }, [cccd, navigate, location.state]);

  const handleClickGiaHan = (monThi) => {
    const selected = info.dangKy.find(d => d.monThi === monThi);
    setGiaHanData({
      monThi: selected.monThi,
      ngayThi: selected.ngayThi,
      ngayGiaHan: '',
      lanGiaHan: 1,
      db: false,
      kdb: false
    });
  };

  const handleXacNhan = () => {
    alert(`Gia hạn cho môn ${giaHanData.monThi} - ngày thi mới: ${giaHanData.ngayGiaHan}`);
    // TODO: gửi dữ liệu lên server
  };

  if (!info) return <div>Đang tải...</div>;

  return (
    <div className="giahan-detail">
      <HeaderGiaHan />
      <div className="section">
        <div className="section-title">🧾 Thông tin thí sinh</div>
        <div className="grid-2col">
          <div><label>Mã thí sinh</label><input readOnly value={info.info.maTS} /></div>
          <div><label>Mã phiếu dự thi</label><input readOnly value={info.info.maPhieu} /></div>
          <div><label>Tên thí sinh</label><input readOnly value={info.info.tenTS} /></div>
          <div><label>Email</label><input readOnly value={info.info.email} /></div>
          <div><label>Số báo danh</label><input readOnly value={info.info.baoDanh} /></div>
          <div><label>Ngày sinh</label><input readOnly value={info.info.ngaySinh} /></div>
          <div><label>CCCD</label><input readOnly value={info.info.cccd} /></div>
          <div><label>Số điện thoại</label><input readOnly value={info.info.dienThoai} /></div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">📘 Danh sách chứng chỉ đã đăng ký</div>
        <table className="table">
          <thead>
            <tr><th>Môn thi</th><th>Ngày thi hiện tại</th><th></th></tr>
          </thead>
          <tbody>
            {info.dangKy.map((item) => (
              <tr key={item.monThi}>
                <td>{item.monThi}</td>
                <td>{item.ngayThi}</td>
                <td><button onClick={() => handleClickGiaHan(item.monThi)}>Gia hạn</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {giaHanData && (
        <div className="section">
          <div className="section-title">📄 Chi tiết gia hạn</div>
          <table className="table">
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
                <td>{giaHanData.ngayThi}</td>
                <td>
                  <input
                    type="text"
                    readOnly
                    value={giaHanData.ngayGiaHan || "Chọn ngày"}
                    onClick={() =>
                      navigate(`/GiaHan/${cccd}/${giaHanData.monThi}`, {
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
                    /> ĐB
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={giaHanData.kdb}
                      onChange={(e) =>
                        setGiaHanData(prev => ({ ...prev, kdb: e.target.checked }))
                      }
                    /> KĐB
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
          <div className="center-button">
            <button onClick={handleXacNhan}>XÁC NHẬN</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GiaHanDetail;
