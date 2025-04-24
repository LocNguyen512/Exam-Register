import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage/HomeNVTN';
import LichThi from './Pages/LichThi/LichThi';
import GiaHan from './Pages/GiaHan/GiaHan';
import GiaHanDetail from './Pages/GiaHan/GiaHanDetail';
import PhieuGiaHan from './Pages/GiaHan/PhieuGiaHan';
import ChonLichThi from './Pages/GiaHan/ChonLichThi'
import TraCuuChungChi from './Pages/TraCuuChungChi/TraCuuChungChi';


function AppNVTN() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LichThi" element={<LichThi />} />
          <Route path="/GiaHan" element={<GiaHan />} />
          <Route path="/GiaHan/:cccd" element={<GiaHanDetail />} />
          <Route path="/GiaHan/:cccd/:monThi" element={<ChonLichThi />} />
          <Route path="/PhieuGiaHan" element={<PhieuGiaHan />} />
          <Route path="/capChungChi" element={<TraCuuChungChi />} />
        </Routes>
    </Router>
  );
}

export default AppNVTN;
