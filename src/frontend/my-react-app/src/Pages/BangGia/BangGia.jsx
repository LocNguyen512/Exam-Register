import React from 'react';
import './BangGia.css';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';

function BlankPage() {
    return (
        <div className='layout'>
            <Header></Header>
            
            <div className="blank-page">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="Under Construction"
                    className="blank-icon"
                />
                <h1>Trang đang được phát triển</h1>
                <p>Chúng tôi sẽ quay lại sớm!</p>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default BlankPage;
