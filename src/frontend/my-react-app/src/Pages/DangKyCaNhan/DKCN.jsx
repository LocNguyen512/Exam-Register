import './DKCN.css';
import Header from '../../component/Header/Header';

function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <div className="dkcn-header">
        <h1>Thêm khách hàng</h1>

        <div className="alert">🔔 Vui lòng nhập đủ thông tin để tiếp tục</div>
        </div>

        <div className="grid">
          <div className="sidebar">
            <h3>Thông tin khách hàng</h3>
            <div className="customer-type-selector">
              <button className="type-btn inactive">
                <img src="/building.png" alt="Đơn vị" />
                Khách hàng đơn vị
              </button>
              <button className="type-btn active">
                <img src="/user.png" alt="Tự do" />
                Khách hàng tự do
              </button>
            </div>
          </div>

          <div className="form-section">
            <fieldset>
            <legend>
              <img src="/field-input-dkcn.png" alt="icon" class="legend-icon" />
              Khách hàng tự do
            </legend>
              <div className="row">
                <div class="form-group">
                  <label for="full-name">Tên khách hàng</label>
                  <input id="full-name" placeholder="Full name" />
                </div>
                  <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input id="phone" placeholder="Phone number" />
                  </div>
              </div>
              <div className="row">
                <div class="form-group">
                      <label for="email">Email</label>
                      <input id="email" placeholder="Email" />
                </div>
                <div class="form-group">
                  <label for="address">Địa chỉ nhà</label>
                  <input id="address" placeholder="Add address" />
                </div>
              </div>
              <div className="row">
                <div class="form-group">
                  <label for="city">Thành phố</label>
                  <input id="city" placeholder="City" />
                </div>
                <div class="form-group">
                  <label for="province">Tỉnh thành</label>   
                  <input id="province" placeholder="Province" />   
                </div>
              </div>
            </fieldset>

            <fieldset>
            <legend>
              <img src="/field-input-dkcn.png" alt="icon" class="legend-icon" />
              Thông tin thí sinh
            </legend>
              <div className="row">
                <div class="form-group">
                  <label for="name">Họ tên</label>
                  <input id="name" placeholder="Name" />
                </div>
                <div class="form-group">  
                  <label for="DOB">DOB</label>
                  <input id="DOB" placeholder="mm/dd/yyyy" type="date" />  
                </div>
              </div>
              <div className="row">
                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input id="phone" placeholder="Phone number" />
                </div>
                <div class="form-group">
                      <label for="email">Email</label>
                      <input id="email" placeholder="Email" />
                </div>
              </div>
              <div className="row">
                <div class="form-group">
                  <label for="CCCD">Số CCCD</label>
                  <input id="CCCD" placeholder="CCCD" />
                </div>
              </div>
              <button className="btn-blue">Kiểm tra thông tin khách hàng</button>
            </fieldset>

            <fieldset>
            <legend>
              <img src="/field-input-dkcn.png" alt="icon" class="legend-icon" />
              Chứng chỉ đăng ký
            </legend>
              <div className="row">
                <div class="form-group">  
                  <label for="exam-type">Loại chứng chỉ</label> 
                  <select>
                  <option>Tiếng anh</option><option>MOS</option>
                </select>
                </div>
                <div class="form-group">
                  <label for="exam-date">Ngày thi</label> 
                  <input id="exam-date" placeholder="mm/dd/yyyy" type="date" />
                </div>
              </div>
              <button className="btn-blue">Thêm</button>

              <table>
                <thead>
                  <tr>
                    <th>Chứng chỉ</th>
                    <th>Ngày thi</th>
                    <th></th> {/* <-- Cột thêm vào */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>IELTS</td>
                    <td>22/12/2025</td>
                    <td><button className="btn-delete">Xóa</button></td>
                  </tr>
                  <tr>
                    <td>MOS</td>
                    <td>22/12/2025</td>
                    <td><button className="btn-delete">Xóa</button></td>
                  </tr>
                </tbody>
              </table>

              <div className="text-right">
                <button className="btn-purple">In phiếu đăng ký →</button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;