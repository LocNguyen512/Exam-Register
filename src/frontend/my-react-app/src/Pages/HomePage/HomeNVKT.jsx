import Header from '../../component/Header/NVKeToan/Header';
import Footer from '../../component/Footer/Footer';
import Body from '../../component/Body/Body';
import './HomeNVKT.css';

function Layout({ children }) {
    return (
        <div className="layout">
            <Header />
            <Body />
            <Footer />
        </div>
    );
}

export default Layout;  