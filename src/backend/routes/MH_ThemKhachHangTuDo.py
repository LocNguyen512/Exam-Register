from flask import Blueprint, request, jsonify
import traceback
from services.khachhang_bus import KhachHangBUS
from services.thisinh_bus import ThiSinhBUS
from services.phieudangky_bus import PhieuDangKyBus
from services.chitietdangky_bus import ChiTietDangKyBUS
from services.lichthi_bus import LichThiBUS
from services.khachhang_bus import  KhachHangBUS
from services.chitietlichthi_bus import ChiTietLichThiBUS
from services.loaidgnl_bus import LoaiDGNLBUS   

dangKyThi_bp = Blueprint('dangKyThi', __name__)

class MH_ThemKhachHangTuDo:
    @staticmethod
    @dangKyThi_bp.route("/kiemtra", methods=["POST"])
    def btnKiemTraThongTinKH_Click():
        data = request.get_json()
        customer = data.get('customer', {})
        candidate = data.get('candidate', {})

        customer_error = ThiSinhBUS.KiemTraThongTin(customer, candidate) # Chỉ kiểm tra nghiệp vụ không gọi DAO
        if customer_error:
            return jsonify({'error': customer_error}), 400

        return jsonify({'message': '✅ Dữ liệu hợp lệ.'}), 200
    
    @staticmethod
    @dangKyThi_bp.route("/themdsthi", methods=["POST"])
    def btnThemClick():
        """
        API kiểm tra và thêm 1 mục đăng ký thi (kiểm tra nghiệp vụ).
        """
        try:
            data = request.get_json()
            current_items = data.get("currentItems", [])  # danh sách hiện tại trong bảng
            new_item = data.get("newItem")                # mục mới muốn thêm

            result = PhieuDangKyBus.KiemTraDSDangKy(current_items, new_item)
            return jsonify(result)
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 40
    
    
    @staticmethod
    @dangKyThi_bp.route("/themkhachhangtudo", methods=["POST"])
    def btnInPhieuDangKy_Click():
        try:
            data = request.get_json()
            
            thong_tin_khach_hang = data['thongTinKhachHang']
            thong_tin_thi_sinh = data['thongTinThiSinh']
            thong_tin_phieu = data['thongTinPhieu']
            # 1. Thêm khách hàng tự do
            maKH = KhachHangBUS.ThemKhachHang(
                ho_ten=thong_tin_khach_hang['fullName'],
                sdt=thong_tin_khach_hang['phone'],
                email=thong_tin_khach_hang['email']
            )
            if not maKH:
                raise Exception("Không thể thêm khách hàng.")

            # 2. Thêm thí sinh
            maTS = ThiSinhBUS.ThemThiSinh(
                ho_ten=thong_tin_thi_sinh['fullName'],
                cccd=thong_tin_thi_sinh['cccd'],
                ngay_sinh=thong_tin_thi_sinh['dob'],
                sdt=thong_tin_thi_sinh['phone'],
                email=thong_tin_thi_sinh['email']
            )
            if not maTS:
                raise Exception("Không thể thêm thí sinh.")

            # 3. Tạo phiếu đăng ký
            maNV = thong_tin_phieu['maNV']
            danh_sach_dang_ky = thong_tin_phieu['danhSachDangKy']

            maPDK = PhieuDangKyBus.ThemPhieuDangKy(
                ma_nv=maNV,
                ma_kh=maKH,
                so_luong=len(danh_sach_dang_ky)
            )
            if not maPDK:
                raise Exception("Không thể tạo phiếu đăng ký.")

            # 4. Thêm chi tiết phiếu đăng ký và giảm ghế
            for dk in danh_sach_dang_ky:
                maPhong = dk['maPhong']
                maLich = dk['maLich']

                ChiTietDangKyBUS.ThemChiTietPhieuDangKy(
                    ma_pdk=maPDK,
                    ma_ts=maTS,
                    ma_phong=maPhong,
                    ma_lich=maLich
                )

                ChiTietLichThiBUS.CapNhatSoGheTrong(
                    ma_lich_thi=maLich,
                    ma_phong=maPhong
                )
            return jsonify({
            "message": "Thêm phiếu đăng ký thành công!",
            "maPDK": maPDK
        }), 201
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500  
        return message

    @staticmethod
    @dangKyThi_bp.route("/docds_dgnl", methods=["GET"])
    def cbbMonThi():
        """
        API lấy danh sách loại đánh giá năng lực (DGNL).
        """
        try:
            certificates = LoaiDGNLBUS.LayDSLoaiDGNL()
            return jsonify(certificates)
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500
        
    @staticmethod
    @dangKyThi_bp.route("/dslichthi", methods=["POST"])
    def cbbNgayDangKy_Selected(tenloai=None):
        """
        API lấy danh sách lịch thi, nhận tên loại từ JSON body.
        """
        try:
            data = request.get_json()
            ten_loai = data.get("tenloai") if data else None
            print(f"Tên loại nhận được từ frontend: {ten_loai}")
            danh_sach = LichThiBUS.LayDSLichThi(ten_loai)
            return jsonify(danh_sach)
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500

     
        