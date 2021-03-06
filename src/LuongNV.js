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
            <div className="dsnhanvien-title">Danh s??ch nh??n vi??n</div>
            <table>
               <thead>
                  <tr>
                     <td>ID</td>
                     <td>T??n NV</td>
                     <td>Ch???c v???</td>
                     <td>H??? s??? l????ng</td>
                     <td>Ph??? c???p</td>
                     <td>Ca l??m</td>
                     <td>M?? Ch???m c??ng</td>
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
                  Danh s??ch ch???m c??ng nh??n vi??n
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
                  <span>Th??ng</span>
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
                  <span>N??m</span>
                  <button onClick={() => {
                     getDsChamCong(thang,nam);
                     getDsLuong(thang,nam);
                  }}>
                     L???c
                  </button>
               </div>
               <table>
                  <thead>
                     <tr>
                        <td>Id</td>
                        <td>T??n NV</td>
                        <td>Th??ng</td>
                        <td>N??m</td>
                        <td>Ng??y c??ng</td>
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
                  Danh s??ch l????ng nh??n vi??n
               </div>
               <table>
                  <thead>
                     <tr>
                        <td>T??n NV</td>
                        <td>Th??ng</td>
                        <td>N??m</td>
                        <td>L????ng</td>
                        <td>Ghi ch??</td>
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
               <div className="title">Th??ng tin chi ti???t nh??n vi??n</div>
               <div className="text-group">
                  <div className="text-label">
                     T??n nh??n vi??n
                  </div>
                  <div className="text">
                     {nhanvien.tenNhanvien}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     ID Nh??n vi??n
                  </div>
                  <div className="text">
                     {nhanvien.idNhanvien}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Ch???c v???
                  </div>
                  <div className="text">
                     {nhanvien.tenChucvu}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     H??? s??? l????ng
                  </div>
                  <div className="text">
                     {nhanvien.heSoluong}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Ph??? c???p
                  </div>
                  <div className="text">
                     {nhanvien.tienPhucap}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     Ca l??m
                  </div>
                  <div className="text">
                     {nhanvien.tenCalam}
                  </div>
               </div>
               <div className="text-group">
                  <div className="text-label">
                     M?? ch???m c??ng
                  </div>
                  <div className="text">
                     {nhanvien.idChamcong}
                  </div>
               </div>
            </div>
            <div className="tinhluong-right-chamcong">
                  <div className="title">
                     C???p nh???t ch???m c??ng
                  </div>
                  <div className="text-group">
                     <input type="number" placeholder="Nh???p v??o s??? ng??y c??ng" onChange={(e) => {
                        setSoNgayLam(e.target.value);
                     }}/>
                     <button onClick = {() => {
                        capNhatNgayCong(nhanvien.idChamcong,thang,nam,soNgayLam)
                     }}>C???p nh???t</button>
                  </div>
            </div>
            <div className="tinhluong-right-luong">
               <div className="title">
                  T??nh l????ng
               </div>
               <div className="text-group">
                     <div className="text-label">
                        Ti???n th?????ng
                     </div>
                     <input className="text" placeholder="Nh???p ti???n th?????ng" onChange={(e) => {
                        setTienThuong(e.target.value);
                     }}/>
               </div>
               <div className="text-group">
                     <div className="text-label">
                        Ti???n ph???t
                     </div>
                     <input className="text" placeholder="Nh???p ti???n ph???t" onChange={(e) => {
                        setTienPhat(e.target.value);
                     }}/>
               </div>
               <div className="text-group">
                     <div className="text-label" style={{color:'red',fontSize:'1.1rem'}}>
                        T???ng l????ng
                     </div>
                     <div className="text" id="txtTongLuong">
                        {luong}
                     </div>
               </div>
               <div className="text-group right-align">
                  <button className="btn primary" onClick={() => {
                     tinhLuong(nhanvien.idNhanvien,thang,nam,tienThuong)
                  }}>T??nh</button>
                  <button className="btn secondary" onClick={() => {
                     luuLuong(nhanvien.idNhanvien,thang,nam,luong,ghiChu);
                  }}>L??u</button>
               </div>
               </div>
            <div className="tinhluong-right-ghichu">
               <div className="label">
                  Ghi ch??
               </div>
               <textarea name="" id=""className="text" onChange={(e) => {
                  setGhiChu(e.target.value);
               }}></textarea>
            </div>
         </div>
      </div>
   )
}
