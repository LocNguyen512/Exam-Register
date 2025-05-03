import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./context";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/test-session", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.ma_nhan_vien) setUserInfo(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Đang kiểm tra đăng nhập...</div>;
    if (!userInfo) return <Navigate to="/DangNhap" />;

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default ProtectedRoute;