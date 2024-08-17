// 25(1)8000(18)7500(6)7000
// 6p - 3p = 3p*2000
// 12p -3p = 3*2000
const GRAB_CAR = "grabCar";
const GRAB_SUV = "grabSUV";
const GRAB_BLACK = "grabBlack";

// nv1: thực hiện tạo một sự kiện click cho nút button tính tiền và dom tới các input để lấy dữ liệ
// nv2: viết 4 function riêng biệt có nhận tham số để từ các dữ liệu người dùng nhập sẽ xử lý trả về giá KmDauTien, giá KmTu1Den19, giá KmTu19TroLen và giá thoiGianCho 
// nv3: sau khi đã tìm đc các giá tiền phù hợp, áp dụng tính toán và trả về kết quả phù hợp nhất
// nv4: kiểm tra ở phần dưới button tính tiền có một layout dùng để hiển thị tổng tiền, xử lý khi click vào nút tính tiền sẽ xuaasrt hiện layout đó và trả kết quả (đã chuyển đổi kiểu tiền tệ) vào bên trong để hiển thị người dùng
function giaKmDauTien(loaiXe){
    switch (loaiXe) {
        case GRAB_CAR: {
            return 8000;
        }
        case GRAB_SUV: {
            return 9000;
        }
        case GRAB_BLACK: {
            return 10000;
        }
        
    }
}
function giaKm19(loaiXe){
    switch (loaiXe) {
        case GRAB_CAR: {
            return 7500;
        }
        case GRAB_SUV: {
            return 8500;
        }
        case GRAB_BLACK: {
            return 9500;
        }
        
    }
}
function giaKmTren19(loaiXe){
    switch (loaiXe) {
        case GRAB_CAR: {
            return 7000;
        }
        case GRAB_SUV: {
            return 8000;
        }
        case GRAB_BLACK: {
            return 9000;
        }
        
    }
}
function giaCho(loaiXe){
    switch (loaiXe) {
        case GRAB_CAR: {
            return 2000;
        }
        case GRAB_SUV: {
            return 3000;
        }
        case GRAB_BLACK: {
            return 3500;
        }
        
    }
}
let tinhTien = document.getElementById("tinhTien").onclick = function(){
    let loaiXe = document.querySelector("input[name='selector']:checked").value;
    let km =document.getElementById("txt-km").value *1;
    let thoiGianCho = document.getElementById("txt-thoiGianCho").value *1;
    console.log(loaiXe);
    if(loaiXe == null){
        alert("Vui lòng chọn loại xe");
        return;
    }
    let giaTienThoiGianCho = giaCho(loaiXe);
    let giaTienKmTren19 = giaKmTren19(loaiXe);
    let giaTienKmDauTien = giaKmDauTien(loaiXe);
    let giaTienKm19 = giaKm19(loaiXe);
    let tongTien =0;

    if (km<=19) {
         tongTien = giaTienKmDauTien + giaTienKm19* (km-1);
        
    } else {
         tongTien = giaTienKmDauTien + giaTienKm19* 18 + giaTienKmTren19 *(km-19);
        
    }


    let soLanPhat = Math.floor((thoiGianCho -3) / 3);
    if(soLanPhat <0){
        soLanPhat = 0
    }
    tongTien += soLanPhat * giaTienThoiGianCho;
    tongTien = tongTien.toLocaleString();
    // console.log(tongTien.toLocaleString() + "Đ")
    document.getElementById("divThanhTien").style = "display:block";
    document.getElementById("xuatTien").innerHTML = `${tongTien} VNĐ`;
}


// tạo chức năng click cho nút in hóa đơn
document.getElementById("inHoaDon").onclick =()=>{
    let loaiXe = document.querySelector("input[name='selector']:checked").value;
    let km =document.getElementById("txt-km").value *1;
    let thoiGianCho = document.getElementById("txt-thoiGianCho").value *1;

    if(loaiXe == null){
    alert("Vui lòng chọn loại xe");
    return;
    }


    let thoiGianChoSau3Phut = thoiGianCho -3;
    if (thoiGianChoSau3Phut <= 2) {
        thoiGianChoSau3Phut = 0;
    } 
   

    let kmTu1Den19 = km - 1;
    if (kmTu1Den19 <=19) {
        kmTu1Den19 = km-1
    }else{kmTu1Den19 = 18} 
    let tongTienkmTu1Den19 = giaKm19(loaiXe) * kmTu1Den19;
    

    let kmTren19 = km -19;
    let anHienContent = "";
    if (kmTren19 >= 1) {
        kmTren19 = km-19;
        anHienContent = ``;
    } else{
        kmTren19 =0;
        anHienContent = `display:none`;
    }
    let tongTienkmTren19 = giaKmTren19(loaiXe) * kmTren19;
   

   
    let giaTienThoiGianCho = giaCho(loaiXe);
    let giaTienKmDauTien = giaKmDauTien(loaiXe);
    let tongTien =giaTienKmDauTien + tongTienkmTu1Den19+tongTienkmTren19;


    let soLanPhat = Math.floor((thoiGianCho -3) / 3);
    if(soLanPhat <0){
        soLanPhat = 0
    }
    tongTien += soLanPhat * giaTienThoiGianCho;
    tongTien = tongTien.toLocaleString();

    document.querySelector(".modal-body").innerHTML =
    `<table class="table font-weight-normal">
  <thead>
    <tr>
      <th scope="col" colspan="2">Loại xe</th>
      <th scope="col" class="w-auto">${loaiXe}</th>
      <th scope="col">Số km: ${km}km</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" class="text-uppercase">Chi tiết</th>
      <td class="text-uppercase">Sử dụng</td>
      <td class="text-uppercase">Đơn giá <br> 1000đ</td>
      <td class="text-uppercase">Thành Tiền <br> 1000đ</td>
    </tr>
    <tr>
      <th scope="row">Km đầu tiên</th>
      <td>1Km</td>
      <td>${giaKmDauTien(loaiXe)}</td>
      <td>${giaKmDauTien(loaiXe)}</td>
    </tr>
    <tr>
      <th scope="row">Từ 1km đến ${kmTu1Den19}Km</th>
      <td>${kmTu1Den19}Km</td>
      <td>${giaKm19(loaiXe)}</td>
      <td>${tongTienkmTu1Den19}</td>
    </tr>
    <tr style=${anHienContent} >
      <th scope="row">Từ 19km trở lên</th>
      <td>${kmTren19}Km</td>
      <td>${giaKmTren19(loaiXe)}</td>
      <td>${tongTienkmTren19}</td>
    </tr>
    <tr>
      <th scope="row">Thời gian chờ <br> 3 phút đầu free</th>
      <td>Chờ ${thoiGianCho} phút , tính tiền ${thoiGianChoSau3Phut} phút</td>
      <td>${giaCho(loaiXe)}</td>
      <td>${giaCho(loaiXe) * soLanPhat}</td>
    </tr>
    <tr>
    <td colspan="4" class="text-right">Thành tiền: ${tongTien} VNĐ </td>
    </tr>
  </tbody>
</table>`
    
}




