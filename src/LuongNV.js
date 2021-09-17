import React,{useState,useEffect} from 'react';
export default function LuongNV() {
   const[dsnhanVien,setDsNhanVien] = useState([]);
   const[dsLuong,setDsLuong] = useState([]);
   const[dsChamCong,setDsChamCong] = useState([]);
   const[thang,setThang] = useState(0);
   const[nam,setNam] = useState(0);
   const[luong,setLuong] = useState(0);
   const[ghiChu,setGhiChu] = useState("null");
   const[tienThuong,setTienThuong] = useState(0);
   const[soNgayLam,setSoNgayLam] = useState(0);
   const[tienPhat,setTienPhat] = useState(0);
   const[nhanvien,setNhanVien] = useState({
      idNhanvien:'',
      tenNhanvien:'',
      tenChucvu:'',
      heSoluong:'',
      tienPhucap:'',
      tenCalam:'',
      idChamcong:''
   });
   const tinhLuong = (idNhanvien, thang,nam,tienThuong) => {
      var requestOptions = {
         method: 'GET',
         redirect: 'follow'
       };
       
       fetch(`http://localhost:52612/api/NhanVien/TinhLuongNV/${idNhanvien}/${tienThuong}/${thang}/${nam}`, requestOptions)
         .then(response => response.text())
         .then(result => {
            result = JSON.parse(result);
            setLuong(result.ketqua);
         })
         .catch(error => console.log('error', error));
   }

   const luuLuong = (idNhanvien,thang,nam,luong,ghichu) => {
      var requestOptions = {
         method: 'GET',
         redirect: 'follow'
       };
       
       fetch(`http://localhost:52612/api/NhanVien/LuuLuongNV/${idNhanvien}/${luong}/${thang}/${nam}/${ghichu}`, requestOptions)
         .then(response => {response.text()
            console.log(response)
            getDsLuong(thang,nam);
         })
         .then(result => {
            result = JSON.parse(result);
            setLuong(result.ketqua);
         })
         .catch(error => console.log('error', error));
   }
   const capNhatNgayCong = (idChamCong, thang, nam, soNgaylam) => {
      var requestOptions = {
         method: 'GET',
         redirect: 'follow'
       };
       
       fetch(`http://localhost:52612/api/NhanVien/CapNhatChamCong/${idChamCong}/${thang}/${nam}/${soNgaylam}`, requestOptions)
         .then(response => {response.text()
            console.log(response)
            getDsChamCong(thang,nam)
         })
         .then(result => {
            console.log(result)
         })
         .catch(error => console.log('error', error));
   }
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
   const getDsChamCong = (thang,nam) => {
      var requestOptions = {
         mode:'cors',
         method: 'GET',
         redirect: 'follow'
         };
         
         fetch(`http://localhost:52612/api/NhanVien/DsChamCong/${thang}/${nam}`, requestOptions)
         .then(response => response.text())
         .then(result => {var obj = JSON.parse(result)
            setDsChamCong(obj)})
         .catch(error => console.log('error', error));
   }
   const getDsLuong = (thang,nam) => {
      var requestOptions = {
         mode:'cors',
         method: 'GET',
         redirect: 'follow'
         };
         
         fetch(`http://localhost:52612/api/NhanVien/DsLuong/${thang}/${nam}`, requestOptions)
         .then(response => response.text())
         .then(result => {var obj = JSON.parse(result)
            setDsLuong(obj)})
         .catch(error => console.log('error', error));
   }

   return (
      <div className="tinhluong-content">
         <div className="tinhluong-left">
            <div className="dsnhanvien-title">Danh sách nhân viên</div>
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
         <div className="tinhluong-middle">
            <div className="tinhluong-middle-top">
               <div className="tinhluong-middle-top-title">
                  Danh sách chấm công nhân viên
               </div>
               <div className="tinhluong-middle-top-filter">
                  <select onChange={(e) => {
                     setThang(e.target.value)
                  }}>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                     <option value="6">6</option>
                     <option value="7">7</option>
                     <option value="8">8</option>
                     <option value="9">9</option>
                     <option value="10">10</option>
                     <option value="11">11</option>
                     <option value="12">12</option>
                  </select>
                  <span>Tháng</span>
                  <select onChange={(e) => {
                     setNam(e.target.value)
                  }}>
                     <option value="2021">2021</option>
                     <option value="2022">2022</option>
                     <option value="2023">2023</option>
                     <option value="2024">2024</option>
                     <option value="2025">2025</option>
                     <option value="2026">2026</option>
                     <option value="2027">2027</option>
                     <option value="2028">2028</option>
                  </select>
                  <span>Năm</span>
                  <button onClick={() => {
                     getDsChamCong(thang,nam);
                     getDsLuong(thang,nam);
                  }}>
                     Lọc
                  </button>
               </div>
               <table>
                  <thead>
                     <tr>
                        <td>Id</td>
                        <td>Tên NV</td>
                        <td>Tháng</td>
                        <td>Năm</td>
                        <td>Ngày công</td>
                     </tr>
                  </thead>
                  <tbody>
                     {dsChamCong.map((cc) => {
                        return <tr key={cc.idChamcong}>
                           <td>{cc.idChamcong}</td>
                           <td>{cc.tenNhanvien}</td>
                           <td>{cc.thang}</td>
                           <td>{cc.nam}</td>
                           <td>{cc.soNgaylam}</td>
                        </tr>
                     })}
                  </tbody>
               </table>
            </div>
            <div className="tinhluong-middle-bottom">
               <div className="tinhluong-middle-bottom-title">
                  Danh sách lương nhân viên
               </div>
               <table>
                  <thead>
                     <tr>
                        <td>Tên NV</td>
                        <td>Tháng</td>
                        <td>Năm</td>
                        <td>Lương</td>
                        <td>Ghi chú</td>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        dsLuong.map((l) => {
                           return <tr key={l.tenNhanvien}>
                              <td>{l.tenNhanvien}</td>
                              <td>{l.thang}</td>
                              <td>{l.nam}</td>
                              <td>{l.luong}</td>
                              <td>{l.ghiChu}</td>
                           </tr>
                        })
                     }
                  </tbody>
               </table>
            </div>
         </div>
         <div className="tinhluong-right">
            <div className="tinhluong-right-nhanvien">
               <div className="title">Thông tin chi tiết nhân viên</div>
               <div className="text-group">
                  <div className="text-label">
                     Tên nhân viên
                  </div>
                  <div className="text">
                     {nhanvien.tenNhanvien}
                  </div>
               </div>
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
                     Chức vụ
                  </div>
                  <div className="text">
                     {nhanvien.tenChucvu}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Hệ số lương
                  </div>
                  <div className="text">
                     {nhanvien.heSoluong}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Phụ cấp
                  </div>
                  <div className="text">
                     {nhanvien.tienPhucap}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Ca làm
                  </div>
                  <div className="text">
                     {nhanvien.tenCalam}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Mã chấm công
                  </div>
                  <div className="text">
                     {nhanvien.idChamcong}
                  </div>
               </div>
            </div>
            <div className="tinhluong-right-chamcong">
                  <div className="title">
                     Cập nhật chấm công
                  </div>
                  <div className="text-group">
                     <input type="number" placeholder="Nhập vào số ngày công" onChange={(e) => {
                        setSoNgayLam(e.target.value);
                     }}/>
                     <button onClick = {() => {
                        capNhatNgayCong(nhanvien.idChamcong,thang,nam,soNgayLam)
                     }}>Cập nhật</button>
                  </div>
            </div>
            <div className="tinhluong-right-luong">
               <div className="title">
                  Tính lương
               </div>
               <div className="text-group">
                     <div className="text-label">
                        Tiền thưởng
                     </div>
                     <input className="text" placeholder="Nhập tiền thưởng" onChange={(e) => {
                        setTienThuong(e.target.value);
                     }}/>
               </div>
               <div className="text-group">
                     <div className="text-label">
                        Tiền phạt
                     </div>
                     <input className="text" placeholder="Nhập tiền phạt" onChange={(e) => {
                        setTienPhat(e.target.value);
                     }}/>
               </div>
               <div className="text-group">
                     <div className="text-label" style={{color:'red',fontSize:'1.1rem'}}>
                        Tổng lương
                     </div>
                     <div className="text" id="txtTongLuong">
                        {luong}
                     </div>
               </div>
               <div className="text-group right-align">
                  <button className="btn primary" onClick={() => {
                     tinhLuong(nhanvien.idNhanvien,thang,nam,tienThuong)
                  }}>Tính</button>
                  <button className="btn secondary" onClick={() => {
                     luuLuong(nhanvien.idNhanvien,thang,nam,luong,ghiChu);
                  }}>Lưu</button>
               </div>
               </div>
            <div className="tinhluong-right-ghichu">
               <div className="label">
                  Ghi chú
               </div>
               <textarea name="" id=""className="text" onChange={(e) => {
                  setGhiChu(e.target.value);
               }}></textarea>
            </div>
         </div>
      </div>
   )
}
