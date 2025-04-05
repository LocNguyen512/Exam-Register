import './Body.css';

function Home() {
    return (
        <div className="home">
            <section className="hero">
                <h1>Trung tâm AlphaCenter</h1>
                <p className="subtitle">
                    Chúng tôi cung cấp nền tảng đăng ký chứng chỉ nhanh chóng, tiện lợi và đáng tin cậy, 
                    giúp bạn chinh phục mục tiêu học tập và sự nghiệp.
                </p>
            </section>

            <section className="register-section">
                <div className="register-content">
                    <h2>Đăng ký thi ngay!</h2>
                    <p>
                        Chọn chứng chỉ phù hợp, theo dõi lịch thi và nhận 
                        hỗ trợ chi tiết từ đội ngũ chuyên nghiệp của chúng tôi.
                    </p>
                    <button className="register-button">Đăng ký ngay</button>
                </div>
                <div className="register-image">
                    <div className="placeholder-image">
                        <img src="/Student.png" alt="Student Picture" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home; 