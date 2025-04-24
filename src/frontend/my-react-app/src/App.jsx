import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage/Home';
import LichThi from './Pages/LichThi/LichThi';
import BangGia from './Pages/BangGia/BangGia';
import TraCuuChungChi from './Pages/TraCuuChungChi/TraCuuChungChi';

import XuLyChungChi_Home from './Pages/XuLyChungChi/Homepage';
import XuLyChungChi_QuanLy from './Pages/XuLyChungChi/QuanLy';
import XuLyChungChi_LapChungChi from './Pages/XuLyChungChi/LapChungChi';
import XuLyChungChi_CapChungChi from './Pages/XuLyChungChi/CapChungChi';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BangGia" element={<BangGia />} />
          <Route path="/LichThi" element={<LichThi />} />
          <Route path="/ChungChi" element={<TraCuuChungChi />} />
          <Route path="/XuLyChungChi/Home" element={<XuLyChungChi_Home />} />
          <Route path="/XuLyChungChi/QuanLy" element={<XuLyChungChi_QuanLy />} />
          <Route path="/XuLyChungChi/LapChungChi" element={<XuLyChungChi_LapChungChi />} />
          <Route path="/XuLyChungChi/CapChungChi" element={<XuLyChungChi_CapChungChi />} />
        </Routes>
    </Router>
  );
}

export default App;
