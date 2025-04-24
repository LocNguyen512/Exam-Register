import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage/Home';
import LichThi from './Pages/LichThi/LichThi';
import BangGia from './Pages/BangGia/BangGia';
import TraCuuChungChi from './Pages/TraCuuChungChi/TraCuuChungChi';
// Lĩnh thêm
import ThanhToan from './Pages/ThanhToan/ThanhToan'
import Home_thanhtoan from './Pages/HomePage/Home_thanhtoan'
import BangGia_thanhtoan from './Pages/BangGia/BangGia_thanhtoan'
function App() {
  return (
    <Router>
        <Routes>
          {/* Lĩnh sửa */}
          {/* <Route path="/" element={<Home />} />
          <Route path="/BangGia" element={<BangGia />} />
          <Route path="/LichThi" element={<LichThi />} />
          <Route path="/ChungChi" element={<TraCuuChungChi />} /> */}

          <Route path="/" element={<Home_thanhtoan />} />
          <Route path="/BangGia" element={<BangGia_thanhtoan />} />
          <Route path="/ThanhToan" element={<ThanhToan />} />
        </Routes>
    </Router>
  );
}

export default App;
