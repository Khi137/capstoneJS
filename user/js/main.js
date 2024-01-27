function renderListProduct(productArr) {
  var contentHTML = "";
  productArr.forEach(function (item, index) {

console.log('đa',item)
    var trString = `
    <div class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 5" style="width: 270px; margin-right: 20px;">
      <div class="product-card position-relative">
        <div class="image-holder">
          <img src="${item.img}" alt="product-item" class="img-fluid">
        </div>
        <div class="cart-concern position-absolute">
          <div class="cart-button d-flex">

            <a  class="btn btn-medium btn-black" onclick="addToCart('${item.id}','${item.backCamera}','${item.frontCamera}','${item.img}','${item.name}','${item.price}','${item.desc}','${item.screen}','${item.type}')">Add to Cart<svg class="cart-outline">
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
      // console.log("- res ", res.data);
      renderListProduct(res.data);
    })
    .catch(function (err) {
      console.log("- err", err)
    })
}
fetchListProduct();





var icon__cart = document.querySelector('.icon__cart');
var shoppingCart__reciept = document.querySelector('.shoppingCart__reciept');
var shoppingCart__close = document.querySelector('.shoppingCart__close');
var cart = document.querySelector('.cart');
var cartMobile = document.querySelector('.cartMobile');
var shoppingCart = document.querySelector('.shoppingCart');
var shoppingCart__list = document.querySelector('.shoppingCart__list');

    function handleHideModalOutside (e) {
      if(e.target.id==='shoppingCart'){
        shoppingCart.classList.toggle('visible');
      }

    }
   shoppingCart.addEventListener('click',handleHideModalOutside);
    cart.addEventListener('click', function() {
      
      shoppingCart.classList.toggle('visible');
     
    });



    cartMobile.addEventListener('click', function() {
      
      shoppingCart.classList.toggle('visible');
     
    });



    shoppingCart__close.addEventListener('click', function() {
      
      shoppingCart.classList.toggle('visible');
     
    });

    var productCart = [];



    function addToCart( id,backCamera,frontCamera,img,name,price,desc,screen,type){

      const chosenProduct = {
        id,
        backCamera,
        frontCamera,
        img,
        name,
        price,
        desc,
        screen,
        type
      }

      const indexCart = productCart.findIndex(x => x.id === chosenProduct.id)
      if(indexCart!==-1) return null
      chosenProduct.amount =1
      chosenProduct.totalPrice=parseFloat(price)
      chosenProduct.id
      productCart.push(chosenProduct)

      

      renderCart(productCart)

      // console.log('test', productCart)
   
     
    }


   

    function renderCart(productCart){
   
      showIconShopping()

      calculationAll();
      const htmlCart=productCart.map((itemProduct, index)=>{
        return `<div class="shoppingCart__item">
        <div class="shoppingCart__image">
          <img class="shoppingCart__imageProduct" src="${itemProduct.img}" alt="">

        </div>

        <div class="shoppingCart__name">
         <div class="shoppingCart__nameProduct">
         ${itemProduct.name}
         </div>

        </div>
        <div class="shoppingCart__price">
        ${itemProduct.price}
        </div>
        <div class="shoppingCart__listButton">
             <span onClick="changeDecreaseQuality('${itemProduct.id}','${itemProduct.backCamera}','${itemProduct.frontCamera}','${itemProduct.img}','${itemProduct.name}','${itemProduct.price}','${itemProduct.desc}','${itemProduct.screen}','${itemProduct.type}', '${itemProduct.amount}','${itemProduct.totalPrice}')" class="shoppingCart__buttonDecrease">-</span>
             ${itemProduct.amount}
             <span  onClick="changeIncreaseQuality('${itemProduct.id}','${itemProduct.backCamera}','${itemProduct.frontCamera}','${itemProduct.img}','${itemProduct.name}','${itemProduct.price}','${itemProduct.desc}','${itemProduct.screen}','${itemProduct.type}', '${itemProduct.amount}','${itemProduct.totalPrice}')" class="shoppingCart__buttonIncrease">+</span>
        </div>

        <div class="shoppingCart__priceTotal">
        ${itemProduct.totalPrice}
        </div>

        <div onClick="removeProductCart('${itemProduct.id}')" class="shoppingCart__remove">
          Remove
       </div>

    </div> `
      })
      shoppingCart__list.innerHTML=htmlCart;



    }
   
   

    function removeProductCart( id){

      const arr = productCart.filter(x=> x.id!==id)
    
       productCart=arr
      renderCart(productCart)

  
     
      
    } 



    function changeIncreaseQuality (id, backCamera, frontCamera, img, name, price, desc, screen, type, amount, totalPrice,allPrice){
      const chosenProduct = {
        id,
        backCamera,
        frontCamera,
        img,
        name,
        price,
        desc,
        screen,
        type,
        amount,
        totalPrice,
        allPrice
      }
    
      const index = productCart.findIndex(item => item.id === chosenProduct.id);
    
      if (index !== -1) {
        // The product is found in productCart, update the values
        productCart[index].amount += 1;
        productCart[index].totalPrice += parseFloat(price);
       // Ensure 'price' is treated as a number
        renderCart(productCart);
      }
    
      console.log('productCart', productCart);
      console.log('chosenProduct', chosenProduct);
    }





    function changeDecreaseQuality(id, backCamera, frontCamera, img, name, price, desc, screen, type, amount, totalPrice) {
      const chosenProduct = {
        id,
        backCamera,
        frontCamera,
        img,
        name,
        price,
        desc,
        screen,
        type,
        amount,
        totalPrice,
       
      }
    
      const index = productCart.findIndex(item => item.id === chosenProduct.id);
    
      if (index !== -1) {

        if(amount<=1){
          return
        }else{

          // The product is found in productCart, update the values
        productCart[index].amount -= 1;
        productCart[index].totalPrice -= parseFloat(price);
    // Ensure 'price' is treated as a number
        renderCart(productCart);


        }

        
      }
    
     
    }


    const calculationAll=()=>{
      let previousAmount=0;
      productCart.map(cartItem=>{
        previousAmount+=cartItem.totalPrice
      })
     if(previousAmount!=0){
      shoppingCart__reciept.innerHTML=`<div class="shoppingCart__payment">Payment</div>
      <div class="shoppingCart__amount">${previousAmount}</div>`
     }else{
      shoppingCart__reciept.innerHTML=`<div class="shoppingCart__payment">No items</div>`
     }
      
    
     }


     function showIconShopping(){
        if(productCart.length!=0){
          icon__cart.innerText=`${productCart.length}`
        }
    
     }

    


     


