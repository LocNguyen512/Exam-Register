import Header from '../../component/Header/Header_thanhtoan';
import Footer from '../../component/Footer/Footer';
import Body from '../../component/Body/Body';
import './Home_thanhtoan.css';

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