import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage/Home';
import LichThi from './Pages/LichThi/LichThi';
import BangGia from './Pages/BangGia/BangGia';



import XuLyChungChi_Home from './Pages/XuLyChungChi/Homepage';
import XuLyChungChi_QuanLy from './Pages/XuLyChungChi/QuanLy';
import XuLyChungChi_LapChungChi from './Pages/XuLyChungChi/LapChungChi';
import XuLyChungChi_CapChungChi from './Pages/XuLyChungChi/CapChungChi';


import DangKyCaNhan from './Pages/DangKyCaNhan/DKCN';
import DangNhap from './Pages/DangNhap/DangNhap';

import GiaHan from './Pages/GiaHan/GiaHan';
import GiaHanDetail from './Pages/GiaHan/GiaHanDetail';
import PhieuGiaHan from './Pages/GiaHan/PhieuGiaHan';
import ChonLichThi from './Pages/GiaHan/ChonLichThi'
import TraCuuChungChi from './Pages/TraCuuChungChi/TraCuuChungChi';
import Homepage_TiepNhan from './Pages/HomePage/HomeNVTN';

import ThanhToan from './Pages/ThanhToan/ThanhToan'
import Home_thanhtoan from './Pages/HomePage/Home_thanhtoan'
import BangGia_thanhtoan from './Pages/BangGia/BangGia'

function App() {
  return (
    <Router>
        <Routes>
          {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/BangGia" element={<BangGia />} />
          <Route path="/LichThi" element={<LichThi />} />
          <Route path="/ChungChi" element={<TraCuuChungChi />} />

          {/* Nhân viên nhập liệu */}
          <Route path="/Homepage/NVNL" element={<XuLyChungChi_Home />} />
          <Route path="/XuLyChungChi/QuanLy" element={<XuLyChungChi_QuanLy />} />
          <Route path="/XuLyChungChi/LapChungChi" element={<XuLyChungChi_LapChungChi />} />
          

          {/* Đăng nhập */}
          <Route path="/DangNhap" element={<DangNhap />} />
        
          {/* Nhân viên tiếp nhận */}
          <Route path="/Homepage/NVTN" element={<Homepage_TiepNhan />} />
          <Route path="/GiaHan" element={<GiaHan />} />
          <Route path="/GiaHan/:cccd" element={<GiaHanDetail />} />
          <Route path="/GiaHan/:cccd/:monThi" element={<ChonLichThi />} />
          <Route path="/PhieuGiaHan" element={<PhieuGiaHan />} />
          <Route path="/capChungChi" element={<TraCuuChungChi />} />

          <Route path="/Homepage/DangKy/DangKyCaNhan" element={<DangKyCaNhan />} />
        
          <Route path="/XuLyChungChi/CapChungChi" element={<XuLyChungChi_CapChungChi />} />
        
          {/* Nhân viên kế toán */}
          <Route path="/Homepage/NVKT" element={<Home_thanhtoan />} />
          <Route path="/BangGia" element={<BangGia_thanhtoan />} />
          <Route path="/ThanhToan" element={<ThanhToan />} />
        </Routes>
    </Router>
  );
}

export default App;