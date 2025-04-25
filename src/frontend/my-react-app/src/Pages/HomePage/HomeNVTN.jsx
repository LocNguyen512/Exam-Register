import Header from '../../component/Header/HeaderNVTN';
import Footer from '../../component/Footer/Footer';
import Body from '../../component/Body/Body';
import './Home.css';

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