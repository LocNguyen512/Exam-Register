import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Phương châm của chúng tôi</h3>
                    <ul>
                        <li>Đăng ký dễ dàng!</li>
                        <li>Hỗ trợ tận tâm!</li>
                        <li>Kết quả nhanh chóng!</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Khóa học của chúng tôi</h3>
                    <ul>
                        <li>IELTS</li>
                        <li>TOEIC</li>
                        <li>MOS</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>AlphaCenter</h3>
                    <ul>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>FAQs</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Follow us</h3>
                    <div className="social-links">
                        <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
                        <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                    <div className="contact-info">
                        <p>From: Nhóm 11, HCMUS</p>
                        <p>alphacenter@gmail.com</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer; 