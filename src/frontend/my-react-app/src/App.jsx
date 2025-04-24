import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage/Home';
import LichThi from './Pages/LichThi/LichThi';
import BangGia from './Pages/BangGia/BangGia';
import TraCuuChungChi from './Pages/TraCuuChungChi/TraCuuChungChi';
import DangKyCaNhan from './Pages/DangKyCaNhan/DKCN';
import DangNhap from './Pages/DangNhap/DangNhap';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BangGia" element={<BangGia />} />
          <Route path="/LichThi" element={<LichThi />} />
          <Route path="/ChungChi" element={<TraCuuChungChi />} />
          <Route path="/DangKy/DangKyCaNhan" element={<DangKyCaNhan />} />
          <Route path="/DangNhap" element={<DangNhap />} />
        </Routes>
    </Router>
  );
}

export default App;
