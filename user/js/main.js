function renderListProduct(productArr) {
  var contentHTML = "";
  productArr.forEach(function (item, index) {
    var trString = `
    <div class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 5" style="width: 270px; margin-right: 20px;">
      <div class="product-card position-relative">
        <div class="image-holder">
          <img src="${item.img}" alt="product-item" class="img-fluid">
        </div>
        <div class="cart-concern position-absolute">
          <div class="cart-button d-flex">
            <a  class="btn btn-medium btn-black" onclick="addToCart(${item.id})">Add to Cart<svg class="cart-outline">
                <use xlink:href="#cart-outline"></use>
              </svg></a>
          </div>
        </div>
        <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
          <h3 class="card-title text-uppercase">
            <a href="#">${item.name}</a>
          </h3>
          <span class="item-price text-primary">${item.price}</span>
        </div>
      </div>
    </div>`;
    contentHTML += trString;
  });
  document.getElementById("divProduct").innerHTML = contentHTML;
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