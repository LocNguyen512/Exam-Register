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

4. Cài đặt tất cả các gói trong file `requirements.txt` vào môi trường ảo  
   `pip install -r requirements.txt`  

5. Khi muốn cài đặt một gói mới vào môi trường ảo
   - Cài đặt gói mới  
     `pip install [package]`
   - Cập nhật lại `requirements.txt`  
     `pip freeze > requirements.txt`  

6. Chạy backend
   `py app.py`

7. Kết thúc làm việc, tắt môi trường ảo:
   `deactivate`


### Frontend
Vào thu mục frontend
1. Cài đặt các gói cần thiết từ `package.json`
   
   Di chuyển vào thư mục frontend và chạy:
   `cd my-react-app`
   
   Sau khi di chuyển vào thư mục my-react-app chạy:
   `npm install`  

3. Sau khi hoản tất các bước trên, chạy:
   `npm run dev`
   
   Server sẽ được mở trên local host hiển thị ở terminal, hãy Ctrl + Click chuột vào đường dẫn đó để mở
