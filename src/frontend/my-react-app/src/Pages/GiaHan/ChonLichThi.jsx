import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../component/Header/HeaderGiaHan";
import "./ChonLichThi.css";

const ChonLichThi = () => {
  const { cccd, monThi } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(2); // March
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    // Giả lập lấy ngày thi còn slot từ database
    setAvailableDates([
      "2025-03-10",
      "2025-03-24",
      "2025-04-07",
      "2025-04-21"
    ]);
  }, [monThi]);

  const handleDateClick = (dateStr) => {
    setSelectedDate(dateStr);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      navigate(`/GiaHan/${cccd}`, {
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
