import Header from '../../component/Header/Customer/Header';
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