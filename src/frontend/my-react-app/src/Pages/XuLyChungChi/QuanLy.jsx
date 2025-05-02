import React, { useState, useEffect } from "react";
import Header from "../../component/Header/NVNhapLieu/HeaderNoBack";
import { useNavigate } from "react-router-dom";
import "./QuanLy.css";

function QuanLyCC() {
    const [chungChiList, setChungChiList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [inputPage, setInputPage] = useState("1");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/QLchungchi/laychungchi")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setChungChiList(data.data);
                } else {
                    console.error("Không lấy được dữ liệu chứng chỉ");
                }
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API:", err);
            });
    }, []);

    const handleCreateCertificate = () => {
        navigate("/XuLyChungChi/LapChungChi");
    };

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            // Nếu ô tìm kiếm rỗng thì load lại danh sách toàn bộ chứng chỉ
            fetch("http://localhost:5000/QLchungchi/laychungchi")
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setChungChiList(data.data);
                        setCurrentPage(1); // Reset về trang đầu
                    } else {
                        console.error("Không lấy được dữ liệu chứng chỉ");
                        setChungChiList([]);
                    }
                })
                .catch((err) => {
                    console.error("Lỗi khi gọi API:", err);
                    setChungChiList([]);
                });
            return;
        }

        // Gọi API tìm kiếm theo CCCD
        fetch("http://localhost:5000/QLchungchi/timkiemcccd", {
            method: "POST", // Gửi POST request
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cccd: searchTerm }), // Truyền CCCD vào body của yêu cầu
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.error("Không tìm thấy chứng chỉ:", data.error);
                    setChungChiList([]); // Nếu không có kết quả, làm rỗng danh sách
                } else {
                    setChungChiList(data); // Cập nhật danh sách chứng chỉ tìm được
                    setCurrentPage(1); // Reset về trang đầu
                }
            })
            .catch((err) => {
                console.error("Lỗi khi gọi API tìm kiếm:", err);
                setChungChiList([]); // Xử lý lỗi và làm rỗng danh sách
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
        setInputPage(String(page)); // Update input luôn đúng trang
        setInputPage("");
    };

    // Tính toán các item cần hiển thị theo trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = chungChiList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(chungChiList.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="layout">
            <Header />
            <div className="certificate-container" style={{ overflowY: 'hidden' }}>
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
                    <button
                        className="create-btn"
                        onClick={handleCreateCertificate}
                    >
                        + Lập chứng chỉ mới
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

                <div className="pagination">
                    <span>
                        Hiển thị {indexOfFirstItem + 1} đến{" "}
                        {Math.min(indexOfLastItem, chungChiList.length)} trong
                        tổng {chungChiList.length} kết quả
                    </span>

                    <div className="page-numbers">
                        {/* Prev button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            {"<"}
                        </button>

                        {/* Trang số đầu tiên */}
                        {Array.from({ length: totalPages }).map((_, idx) => {
                            const page = idx + 1;

                            // Chỉ hiện trang 1, 2, 3 hoặc trang cuối và cận cuối
                            if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 &&
                                    page <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={page}
                                        className={
                                            page === currentPage ? "active" : ""
                                        }
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                );
                            }

                            // Thêm "..." chỉ 1 lần
                            if (
                                (page === 2 && currentPage > 4) ||
                                (page === totalPages - 1 &&
                                    currentPage < totalPages - 3)
                            ) {
                                return <span key={page}>...</span>;
                            }

                            return null;
                        })}

                        {/* Next button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            {">"}
                        </button>

                        {/* Input để nhập số trang */}
                        <div
                            style={{
                                display: "inline-block",
                                marginLeft: "10px",
                            }}
                        >
                            <input
                                type="text"
                                value={inputPage}
                                onChange={(e) => {
                                    const value = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    ); // Chỉ nhận số
                                    setInputPage(value);
                                }}
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

export default QuanLyCC;
