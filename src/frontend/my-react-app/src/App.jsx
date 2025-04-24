import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage/Home';
import LichThi from './Pages/LichThi/LichThi';
import BangGia from './Pages/BangGia/BangGia';
import TraCuuChungChi from './Pages/TraCuuChungChi/TraCuuChungChi';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BangGia" element={<BangGia />} />
          <Route path="/LichThi" element={<LichThi />} />
          <Route path="/ChungChi" element={<TraCuuChungChi />} />
        </Routes>
    </Router>
  );
}

export default App;