import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import LuongNV from './LuongNV';
import CapTKNV from './CapTKNV';

function App() {
  return (
    <div className="wrapper">
      <div className="navbar">
          <div className="navbar-logo">
            <h1><span className="navbar-logo-first">T</span>heNgoc<span className="navbar-logo-second">.</span></h1>
          </div>
          <ul className="navbar-menu">
            <li><a href="/admin/TinhLuongNV"><ion-icon name="logo-usd"></ion-icon>Lương nhân viên</a></li>
            <li><a href="/admin/CapTKNV"><ion-icon name="person-add-outline"></ion-icon>Cấp tài khoản</a></li>
          </ul>
      </div>
      <div className="content">
        <div className="content-header">
            <div className="menu-button">
              <ion-icon name="menu-outline"></ion-icon>
            </div>
            <div className="user">
              <div className="user-icon">
                <ion-icon name="person-circle-outline"></ion-icon>
              </div>
              <div className="user-name">
                Nguyễn Thế Ngọc
              </div>
            </div>
        </div>
        <div className="content-body">
          <Router>
          <Switch>
              <Route path="/admin/TinhLuongNV">
                <LuongNV/>
              </Route>
              <Route path="/admin/CapTKNV">
                <CapTKNV/>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
    
  );
}

export default App;
