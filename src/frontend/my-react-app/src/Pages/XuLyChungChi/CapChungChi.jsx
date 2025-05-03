import React, { useState, useEffect } from "react";
import Header from "../../component/Header/NVTiepNhan/HeaderNoBack";
import { useNavigate } from "react-router-dom";
import "./CapChungChi.css";

function CapCC() {
    const [chungChiList, setChungChiList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [inputPage, setInputPage] = useState("1");

    const navigate = useNavigate();

    const fetchAllCertificates = () => {
        fetch("http://localhost:5000/QLchungchi/laychungchi", {
            method: "GET",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.data)) {
                    setChungChiList(data.data);
                } else {
                    setChungChiList([]);
                }
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API:", err);
            });
    };

    useEffect(() => {
        fetchAllCertificates();
    }, []);

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            fetchAllCertificates();
            return;
        }

        fetch("http://localhost:5000/QLchungchi/timkiemcccd", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cccd: searchTerm }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.error("Không tìm thấy chứng chỉ:", data.error);
                    setChungChiList([]);
                } else {
                    setChungChiList(data);
                    setCurrentPage(1);
                }
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API tìm kiếm:", err);
                setChungChiList([]);
            });
    };

    const handleJumpPage = () => {
        let page = Number(inputPage);
        if (!page || page < 1) {
            page = 1;
        } else if (page > totalPages) {
            page = totalPages;
        }
        setCurrentPage(page);
        setInputPage("");
    };

    const handleToggleConfirm = (item) => {
        const newStatus = item.trang_thai === "Đã nhận" ? "Chưa nhận" : "Đã nhận";

        fetch("http://localhost:5000/Capchungchi/updateTrangThai", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ma_chung_chi: item.ma_chung_chi,
                trang_thai_moi: newStatus,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const updatedList = chungChiList.map((cc) =>
                        cc.ma_chung_chi === item.ma_chung_chi ? { ...cc, trang_thai: newStatus } : cc
                    );
                    setChungChiList(updatedList);
                } else {
                    alert("Không thể cập nhật trạng thái: " + (data.message || ""));
                }
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API cập nhật:", err);
                alert("Có lỗi xảy ra khi cập nhật trạng thái.");
            });
    };

    const handleUpdateNote = (ma_chung_chi, newNote) => {
        fetch("http://localhost:5000/Capchungchi/updateNote", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ma_chung_chi,
                ghi_chu: newNote,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const updatedList = chungChiList.map((cc) =>
                        cc.ma_chung_chi === ma_chung_chi ? { ...cc, ghi_chu: newNote } : cc
                    );
                    setChungChiList(updatedList);
                } else {
                    alert("Không thể cập nhật ghi chú: " + (data.message || ""));
                }
            })
            .catch((err) => {
                console.error("Lỗi khi cập nhật ghi chú:", err);
                alert("Có lỗi xảy ra khi cập nhật ghi chú.");
            });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(chungChiList) ? chungChiList.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalPages = Math.ceil(chungChiList.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="layout">
            <Header />
            <div className="certificate-container">
                <div className="certificate-actions">
                    <h2>Danh sách chứng chỉ</h2>
                    <input
                        type="text"
                        placeholder="🔍 CCCD thí sinh"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />
                    <button className="search-btn" onClick={handleSearch}>
                        Tìm kiếm
                    </button>
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>MÃ CHỨNG CHỈ</th>
                                <th>Môn thi</th>
                                <th>NGÀY CẤP</th>
                                <th>KẾT QUẢ</th>
                                <th>CCCD THÍ SINH</th>
                                <th>MÃ NHÂN VIÊN NHẬP</th>
                                <th>TRẠNG THÁI</th>
                                <th>GHI CHÚ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((cc, index) => (
                                    <tr key={index}>
                                        <td style={{ width: "130px" }}>{cc.ma_chung_chi}</td>
                                        <td style={{ width: "130px" }}>{cc.mon_thi}</td>
                                        <td style={{ width: "130px" }}>{cc.ngay_cap }</td>
                                        <td style={{ width: "130px" }}>{cc.ket_qua}</td>
                                        <td style={{ width: "130px" }}>{cc.cccd_thi_sinh}</td>
                                        <td style={{ width: "130px" }}>{cc.ma_nhan_vien_nhap}</td>
                                        <td style={{ width: "130px" }}>
                                            <button
                                                onClick={() => handleToggleConfirm(cc)}
                                                className={cc.trang_thai === "Đã nhận" ? "confirm-btn" : "cancel-btn"}
                                            >
                                                {cc.trang_thai === "Đã nhận" ? "Đã nhận" : "Chưa nhận"}
                                            </button>
                                        </td>
                                        <td>
                                            {cc.isEditingNote ? (
                                                <input
                                                    type="text"
                                                    defaultValue={cc.ghi_chu || ""}
                                                    onBlur={(e) => {
                                                        handleUpdateNote(cc.ma_chung_chi, e.target.value);
                                                        cc.isEditingNote = false;
                                                        setChungChiList([...chungChiList]);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleUpdateNote(cc.ma_chung_chi, e.target.value);
                                                            cc.isEditingNote = false;
                                                            setChungChiList([...chungChiList]);
                                                        }
                                                    }}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span
                                                    onClick={() => {
                                                        cc.isEditingNote = true;
                                                        setChungChiList([...chungChiList]);
                                                    }}
                                                    style={{ cursor: "pointer", fontStyle: cc.ghi_chu ? "normal" : "italic", color: cc.ghi_chu ? "inherit" : "#888" }}
                                                >
                                                    {cc.ghi_chu || "<Thêm ghi chú>"}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">Không có chứng chỉ nào</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <span>
                        Hiển thị {indexOfFirstItem + 1} đến {Math.min(indexOfLastItem, chungChiList.length)} trong tổng {chungChiList.length} kết quả
                    </span>

                    <div className="page-numbers">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            {"<"}
                        </button>

                        {Array.from({ length: totalPages }).map((_, idx) => {
                            const page = idx + 1;
                            if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                                return (
                                    <button key={page} className={page === currentPage ? "active" : ""} onClick={() => handlePageChange(page)}>
                                        {page}
                                    </button>
                                );
                            }
                            if ((page === 2 && currentPage > 4) || (page === totalPages - 1 && currentPage < totalPages - 3)) {
                                return <span key={page}>...</span>;
                            }
                            return null;
                        })}

                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            {">"}
                        </button>

                        <div style={{ display: "inline-block", marginLeft: "10px" }}>
                            <input
                                type="text"
                                value={inputPage}
                                onChange={(e) => setInputPage(e.target.value.replace(/\D/g, ""))}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleJumpPage();
                                    }
                                }}
                                onBlur={handleJumpPage}
                                placeholder="Trang"
                                style={{ width: "50px", textAlign: "center" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CapCC;
