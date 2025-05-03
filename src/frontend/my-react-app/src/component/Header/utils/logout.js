// utils/logout.js
export async function handleLogout() {
    try {
        const res = await fetch("http://localhost:5000/dangnhap/logout", {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
            alert("Đăng xuất thành công!");
            window.location.href = "/"; // hoặc route chính
        } else {
            alert("Đăng xuất thất bại!");
        }
    } catch (err) {
        alert("Lỗi khi đăng xuất!");
        console.error(err);
    }
}
