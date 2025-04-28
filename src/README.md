# PTTKHTTT - Exam Register

## Set up

### Backend

1. Tạo môi trường ảo  
   Chỉ tạo lần đầu.
   Di chuyển vào thư mục backend và chạy:
   `python -m venv env-er`

2. Kích hoạt môi trường ảo  
   Kích hoạt mỗi lần phát triển backend.
   
   `.\env-er\Scripts\activate.bat`  

4. Cài đặt tất cả các gói trong file `requirments.txt` vào môi trường ảo  
   `pip install -r requirments.txt`  

5. Khi muốn cài đặt một gói mới vào môi trường ảo
   - Cài đặt gói mới  
     `pip install [package]`
   - Cập nhật lại `requirments.txt`  
     `pip freeze > requirments.txt`  

6. Chạy backend
   `py app.py`

7. Kết thúc làm việc, tắt môi trường ảo:
   `deactivate`


### Frontend

1. Cài đặt các gói cần thiết từ `package.json` 
   Di chuyển vào thư mục frontend và chạy:  
   `cd my-react-app`
   `npm install`  


2. Chạy frontend
   `npm run dev`  