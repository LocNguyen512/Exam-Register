import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../component/Header/NVTiepNhan/HeaderBack";
import "./ChonLichThi.css";

const ChonLichThi = () => {
  const { sobaodanh, monThi } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(2); // March
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    // Gọi API thật để lấy danh sách ngày thi còn trống
    const fetchAvailableDates = async () => {
      try {
        const res = await fetch(`http://localhost:5000/Chonlichthi/ngaycontrong?monThi=${monThi}&sobaodanh=${sobaodanh}`,
          {
            method: "GET",
            credentials: "include" // ⚠️ Gửi session cookie đến Flask
          }
        );
        if (!res.ok) throw new Error("Không thể lấy danh sách lịch thi");
        const data = await res.json();
        setAvailableDates(data); // data là mảng ngày dạng ["2025-03-10", "2025-04-07", ...]
      } catch (err) {
        alert("Lỗi khi tải lịch thi: " + err.message);
      }
    };
  
    fetchAvailableDates();
  }, [monThi, sobaodanh]);
  

  const handleDateClick = (dateStr) => {
    setSelectedDate(dateStr);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      navigate(`/NVTN/GiaHan/${sobaodanh}`, {
        state: {
          newDate: selectedDate,
          monThi: monThi,
          autoOpenDetail: true
        }
      });
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const renderMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const dates = [];
    const startOffset = (firstDay + 6) % 7; // convert Sunday=0 to last column

    for (let i = 0; i < startOffset; i++) dates.push(null);
    for (let i = 1; i <= daysInMonth; i++) dates.push(i);

    const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;

    return (
      <div className="month-box">
        <div className="month-title">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric"
          })}
        </div>
        <div className="calendar-grid">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div className="day-label" key={d}>{d}</div>
          ))}
          {dates.map((day, idx) => {
            if (day === null) return <div key={idx} />;
            const dateStr = `${monthStr}-${String(day).padStart(2, "0")}`;
            const isAvailable = availableDates.includes(dateStr);
            return (
              <div
                key={idx}
                className={`day-cell ${isAvailable ? "available" : ""} ${selectedDate === dateStr ? "selected" : ""}`}
                onClick={() => isAvailable && handleDateClick(dateStr)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="giahan-layout">
      <Header />
      <div className="giahan-body">
        <h2 style={{ textAlign: "center" }}>Chọn lịch thi</h2>

        <div className="calendar-header">
          <div className="left-input">
            <label>Môn thi</label>
            <input value={monThi} disabled />
          </div>
        </div>

        <div className="calendar-wrapper">
          <button className="arrow-btn" onClick={handlePrevMonth}>◀</button>
          <div className="dual-months">
            {renderMonth(currentYear, currentMonth)}
            {renderMonth(
              currentMonth === 11 ? currentYear + 1 : currentYear,
              (currentMonth + 1) % 12
            )}
          </div>
          <button className="arrow-btn" onClick={handleNextMonth}>▶</button>
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button className="btn-confirm" onClick={handleConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChonLichThi;
