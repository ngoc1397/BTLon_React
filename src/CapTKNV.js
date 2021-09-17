import React,{useState,useEffect} from 'react'

export default function CapTKNV() {
   const[dsnhanVien,setDsNhanVien] = useState([]);
   const[idChucVu,setIdChucVu] = useState(1);
   const[dsChucVu,setDsChucVu] = useState([]);
   const[nhanvien,setNhanVien] = useState({
      idNhanvien:'',
      tenNhanvien:'',
      tenChucvu:'',
      heSoluong:'',
      tienPhucap:'',
      tenCalam:'',
      idChamcong:''
   });
   const capTaiKhoan = (kieuNd,idNhanvien,tenHienThi,tenDN,matKhau) => {
      var requestOptions = {
         method: 'GET',
         redirect: 'follow'
       };
       
       fetch(`http://localhost:52612/api/NhanVien/ThemTaiKhoan/${kieuNd}/${idNhanvien}/${tenHienThi}/${tenDN}/${matKhau}`, requestOptions)
         .then(response => response.text())
         .then(result => {
            console.log(result)
            if(result ==="conflict"){
               alert("Tên đăng nhập đã tồn tại")
            }else{
               alert("Thêm thành công")
            }
         })
         .catch(error => console.log('error', error));
   }
   useEffect(() => {
      var requestOptions = {
         method: 'GET',
         redirect: 'follow'
       };
       
       fetch("http://localhost:52612/api/NhanVien/DsChucVu", requestOptions)
         .then(response => response.text())
         .then(result => {
            var obj = JSON.parse(result);
            setDsChucVu(obj);
         })
         .catch(error => console.log('error', error));
   })
   useEffect(() => {
      var requestOptions = {
      mode:'cors',
      method: 'GET',
      redirect: 'follow'
     };
       fetch('http://localhost:52612/api/NhanVien/LayDSNhanVien',requestOptions)
         .then(response => response.text())
         .then(result =>{var obj = JSON.parse(result)
            setDsNhanVien(obj)})
         .catch(error => console.log('error', error));
   },[])
   return (
      <div className="taikhoan-content">
         <div className="taikhoan-left">
            <div className="title large">
               Danh sách nhân viên
            </div>
            <table>
            <thead>
                  <tr>
                     <td>ID</td>
                     <td>Tên NV</td>
                     <td>Chức vụ</td>
                     <td>Hệ số lương</td>
                     <td>Phụ cấp</td>
                     <td>Ca làm</td>
                     <td>Mã Chấm công</td>
                  </tr>
               </thead>
               <tbody>
               {dsnhanVien.map((nv) => {
                     return <tr onClick={function(){
                        setNhanVien({
                           idNhanvien:nv.idNhanvien,
                           tenNhanvien:nv.tenNhanvien,
                           tenChucvu:nv.tenChucvu,
                           heSoluong:nv.heSoluong,
                           tienPhucap:nv.tienPhucap,
                           tenCalam:nv.tenCalam,
                           idChamcong:nv.idChamcong
                        })
                     }}key={nv.idNhanvien}>
                           <td>{nv.idNhanvien}</td>
                           <td>{nv.tenNhanvien}</td>
                           <td>{nv.tenChucvu}</td>
                           <td>{nv.heSoluong}</td>
                           <td>{nv.tienPhucap}</td>
                           <td>{nv.tenCalam}</td>
                           <td>{nv.idChamcong}</td>
                         </tr>
                  })}
               </tbody>
            </table>
         </div>
         <div className="taikhoan-right">
            <div className="title large">Thông tin tài khoản</div>
               <div className="text-group">
                  <div className="text-label">
                     ID Nhân viên
                  </div>
                  <div className="text">
                     {nhanvien.idNhanvien}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Chọn chức vụ
                  </div>
                  
                     <select className="text" onChange={
                        (e) => {
                           setIdChucVu(e.target.value);
                        }
                     }>
                     {dsChucVu.map((cv) => {
                        return <option value={cv.idChucvu}>{cv.tenChucvu}</option>
                     })}
                     </select>
                  
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Tên hiển thị
                  </div>
                  <input className="text" id="txtTenHienThi" value={nhanvien.tenNhanvien}/>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Tên đăng nhập
                  </div>
                  <input className="text" id="txtTenDangNhap"/>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Mật khẩu
                  </div>
                  <input className="text" id="txtMatKhau"/>
               </div>
               <div className="text-group right-align">
                  <button className="btn primary" onClick = {(e) => {
                     var txtTenHienThi = document.querySelector('#txtTenHienThi').value;
                     var txtTenDangNhap = document.querySelector('#txtTenDangNhap').value;
                     var txtMatKhau = document.querySelector('#txtMatKhau').value;
                     if(txtTenHienThi === ""){
                        alert("Bạn phải nhập tên hiển thị")
                        return false;
                     }
                     if(txtTenDangNhap === ""){
                        alert("Bạn phải nhập tên đăng nhập")
                        return false;
                     }
                     if(txtMatKhau === ""){
                        alert("Bạn phải nhập mật khẩu")
                        return false;
                     }
                     capTaiKhoan(idChucVu,nhanvien.idNhanvien,txtTenHienThi,txtTenDangNhap,txtMatKhau);
                  }}>Cấp tài khoản</button>
                  <button className="btn secondary">Reset mật khẩu</button>
               </div>
         </div>
      </div>
   )
}
