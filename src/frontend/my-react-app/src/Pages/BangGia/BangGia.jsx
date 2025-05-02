import React, { useEffect, useState } from 'react';
import './BangGia.css';
import Header from '../../component/Header/ThanhToan/Header_thanhtoan';
import Footer from '../../component/Footer/Footer';
import axios from 'axios';

function BangGia() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchBangGia = async () => {
            try {
                const res = await axios.get('http://localhost:5000/bangGia/laybanggia'); // hoặc gọi SP qua API
                setData(res.data);
            } catch (err) {
                console.error('Lỗi lấy dữ liệu bảng giá:', err);
            }
        };
        fetchBangGia();
    }, []);

    return (
        <div className="layout-banggia">
            <Header />

            <div className="container-banggia">
                <h1 className="banggia-title">Bảng giá</h1>

                <table className="banggia-table">
                    <thead>
                        <tr>
                            <th>LOẠI ĐGNL</th>
                            <th>LỆ PHÍ THI</th>
                            <th>PHÍ GIA HẠN</th>
                            <th>LỊCH THI MỚI NHẤT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.TenLoai}</td>
                                <td>{parseInt(item.LePhiThi).toLocaleString('vi-VN')}</td>
                                <td>{parseInt(item.PhiGiaHan).toLocaleString('vi-VN')}</td>
                                <td>{new Date(item.NgayThiMoiNhat).toLocaleDateString('vi-VN')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </div>
    );
}

export default BangGia;
