import React, { useState, useEffect } from "react";
import Header from "../../component/Header/NVNhapLieu/HeaderNoBack";
import { useNavigate } from "react-router-dom";
import "./QuanLy.css";

function QuanLyCC() {
    const [chungChiList, setChungChiList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState("1");
    const [notFound, setNotFound] = useState(false);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllCertificates();
    }, []);

    const fetchAllCertificates = () => {
        fetch("http://localhost:5000/QLchungchi/laychungchi", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.data)) {
                    setChungChiList(data.data);
                    setNotFound(false);
                    setCurrentPage(1);
                } else {
                    setChungChiList([]);
                    setNotFound(true);
                }
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API:", err);
                setChungChiList([]);
                setNotFound(true);
            });
    };

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
                if (data.error || !Array.isArray(data) || data.length === 0) {
                    console.error("Không tìm thấy chứng chỉ:", data.error || "Không có dữ liệu");
                    setChungChiList([]);
                    setNotFound(true);
                } else {
                    setChungChiList(data);
                    setNotFound(false);
                    setCurrentPage(1);
                }
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API tìm kiếm:", err);
                setChungChiList([]);
                setNotFound(true);
            });
    };

    const handleJumpPage = () => {
        let page = Number(inputPage);
        if (!page || page < 1) page = 1;
        else if (page > totalPages) page = totalPages;

        setCurrentPage(page);
        setInputPage("");
    };

    const handleCreateCertificate = () => {
        navigate("LapChungChi");
    };

    const totalPages = Math.ceil(chungChiList.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(chungChiList)
        ? chungChiList.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="layout">
            <Header />
            <div className="certificate-container" style={{ overflowY: "hidden" }}>
                <div className="certificate-actions">
                    <h2>Danh sách chứng chỉ</h2>
                    <input
                        type="text"
                        placeholder="🔍 CCCD thí sinh"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                    />
                    <button className="search-btn" onClick={handleSearch}>
                        Tìm kiếm
                    </button>
                    <button className="create-btn" onClick={handleCreateCertificate}>
                        + Lập chứng chỉ mới
                    </button>
                </div>

                {!notFound ? (
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
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((cc, index) => (
                                        <tr key={index}>
                                            <td>{cc.ma_chung_chi}</td>
                                            <td>{cc.mon_thi}</td>
                                            <td>{cc.ngay_cap}</td>
                                            <td>{cc.ket_qua}</td>
                                            <td>{cc.cccd_thi_sinh}</td>
                                            <td>{cc.ma_nhan_vien_nhap}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Không có chứng chỉ nào</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
                        ❌ Không tìm thấy chứng chỉ với CCCD này.
                    </p>
                )}

                <div className="pagination">
                    <span>
                        Hiển thị {indexOfFirstItem + 1} đến{" "}
                        {Math.min(indexOfLastItem, chungChiList.length)} trong tổng{" "}
                        {chungChiList.length} kết quả
                    </span>

                    <div className="page-numbers">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
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
                                    <button
                                        key={page}
                                        className={page === currentPage ? "active" : ""}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                );
                            }

                            if (
                                (page === 2 && currentPage > 4) ||
                                (page === totalPages - 1 && currentPage < totalPages - 3)
                            ) {
                                return <span key={page}>...</span>;
                            }

                            return null;
                        })}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            {">"}
                        </button>

                        <div style={{ display: "inline-block", marginLeft: "10px" }}>
                            <input
                                type="text"
                                value={inputPage}
                                onChange={(e) =>
                                    setInputPage(e.target.value.replace(/\D/g, ""))
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleJumpPage();
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

export default QuanLyCC;
