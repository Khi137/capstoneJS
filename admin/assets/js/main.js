var idEdit = null;

function renderListProduct(productArr) {
  var contentHTML = "";
  var reverseProductArr = productArr.reverse();
  reverseProductArr.forEach(function (item, index) {
    var trString = `<tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.screen}</td>
                    <td>${item.backCamera}</td>
                    <td>${item.frontCamera}</td>
                    <td><img class="productImage" style="width:130px;height:130px;border-radius:20%" src="${item.img}" alt="img"></td>
                    <td>${item.desc}</td>
                    <td>${item.type}</td>
                    <td>
                            <button
                            onclick='deleteProduct(${item.id})'
                            class='btn btn-danger'>Delete</button>
                            <button class='btn btn-warning' onclick='editProduct(${item.id})'>Edit</button>
                    </td>
                 </tr>`;
    contentHTML += trString;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}
var product = [];

function fetchListProduct() {
  axios({
    url: "https://65ae962a1dfbae409a7524ed.mockapi.io/api/capstone/product",
    method: "GET",
  })
    .then(function (res) {
      console.log("- res ", res.data);
      renderListProduct(res.data);
    })
    .catch(function (err) {
      console.log("- err", err)
    })
}
fetchListProduct();
function deleteProduct(id) {
  axios({
    url: `https://65ae962a1dfbae409a7524ed.mockapi.io/api/capstone/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      // gọi lại api lấy danh sách product sau khi xoá thành công
      fetchListProduct();
      console.log(res);
      showLoading();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function createProduct() {
  var product = getInfor();
  if (validate(product.name, "tbName")
    && validate(product.price, "tbPrice")
    && validate(product.screen, "tbScreen")
    && validate(product.backCamera, "tbBackCamera")
    && validate(product.frontCamera, "tbFrontCamera")
    && validate(product.img, "tbImageProduct")
    && validate(product.desc, "tbDesc")) {
    console.log("yeah")
    axios({
      url: `https://65ae962a1dfbae409a7524ed.mockapi.io/api/capstone/product`,
      method: "POST",
      data: product,
    })
      .then(function (res) {
        // gọi lại api lấy danh sách product sau khi thêm thành công
        fetchListProduct();
        closeModal();
        showLoading();
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  console.log(product);

}

function editProduct(id) {
  idEdit = id;

  axios({
    url: `https://65ae962a1dfbae409a7524ed.mockapi.io/api/capstone/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      var productEdit = res.data;
      openModal();
      displayFormUpdate();
      document.getElementById("name").value = productEdit.name;
      document.getElementById("price").value = productEdit.price;
      document.getElementById("screen").value = productEdit.screen;
      document.getElementById("backCamera").value = productEdit.backCamera;
      document.getElementById("frontCamera").value = productEdit.frontCamera;
      document.getElementById("img").value = productEdit.img;
      document.getElementById("desc").value = productEdit.desc;
      document.getElementById("type").value = productEdit.type;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateProduct() {
  var product = getInfor();
  if (validate(product.name, "tbName")
    && validate(product.price, "tbPrice")
    && validate(product.screen, "tbScreen")
    && validate(product.backCamera, "tbBackCamera")
    && validate(product.frontCamera, "tbFrontCamera")
    && validate(product.img, "tbImageProduct")
    && validate(product.desc, "tbDesc")) {
      axios({
        url: `https://65ae962a1dfbae409a7524ed.mockapi.io/api/capstone/product/${idEdit}`,
        method: "PUT",
        data: product,
      })
      .then(function (res) {
        console.log(res);
        fetchListProduct();
        closeModal();
        showLoading();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

}