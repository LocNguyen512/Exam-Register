import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './component/Header/utils/ProtectedRoute'; // 👈 thêm dòng này
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
import Home_thanhtoan from './Pages/HomePage/HomeNVKT'
import BangGia_thanhtoan from './Pages/BangGia/BangGia'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BangGia" element={<BangGia />} />
          <Route path="/LichThi" element={<LichThi />} />
          <Route path="/ChungChi" element={<TraCuuChungChi />} />
          {/* Đăng nhập */}
          <Route path="/DangNhap" element={<DangNhap />} />

           {/* Nhân viên nhập liệu */}
        <Route
          path="/NVNL"
          element={
            <ProtectedRoute>
              <XuLyChungChi_Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVNL/XuLyChungChi/QuanLy"
          element={
            <ProtectedRoute>
              <XuLyChungChi_QuanLy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVNL/XuLyChungChi/QuanLy/LapChungChi"
          element={
            <ProtectedRoute>
              <XuLyChungChi_LapChungChi />
            </ProtectedRoute>
          }
        />

          

          
        
        {/* Nhân viên tiếp nhận */}
        <Route
          path="/NVTN"
          element={
            <ProtectedRoute>
              <Homepage_TiepNhan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVTN/GiaHan"
          element={
            <ProtectedRoute>
              <GiaHan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVTN/GiaHan/:sobaodanh"
          element={
            <ProtectedRoute>
              <GiaHanDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVTN/GiaHan/:sobaodanh/:monThi"
          element={
            <ProtectedRoute>
              <ChonLichThi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVTN/DangKy/DangKyCaNhan"
          element={
            <ProtectedRoute>
              <DangKyCaNhan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVTN/CapChungChi"
          element={
            <ProtectedRoute>
              <XuLyChungChi_CapChungChi />
            </ProtectedRoute>
          }
        />
        
          {/* Nhân viên kế toán */}
        <Route
          path="/NVKT"
          element={
            <ProtectedRoute>
              <Home_thanhtoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVKT/BangGia"
          element={
            <ProtectedRoute>
              <BangGia_thanhtoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVKT/ThanhToan"
          element={
            <ProtectedRoute>
              <ThanhToan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/NVKT/ThanhToanGiaHan"
          element={
            <ProtectedRoute>
              <PhieuGiaHan />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;