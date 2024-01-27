function openModal() {
    $('#myModal').modal('show');

}
function closeModal() {
    $('#myModal').modal('hide');
}

function displayFormCreate() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("screen").value = "";
    document.getElementById("backCamera").value = "";
    document.getElementById("frontCamera").value = "";
    document.getElementById("img").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("type").value = "Apple";
    document.getElementById('btnCreate').style.display = 'block';
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById("header-title").innerHTML = "Create Form";
    resetTbNotice();

}

function displayFormUpdate() {
    document.getElementById('btnCreate').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';
    document.getElementById("header-title").innerHTML = "Update Form";
    document.getElementById("name").focus();
    resetTbNotice();
}

function getInfor() {
    var productName = document.getElementById("name").value;
    var producPrice = document.getElementById("price").value;
    var producScreen = document.getElementById("screen").value;
    var producBackCamera = document.getElementById("backCamera").value;
    var producFrontCamera = document.getElementById("frontCamera").value;
    var producImg = document.getElementById("img").value;
    var producDesc = document.getElementById("desc").value;
    var producType = document.getElementById("type").value;
    console.log(productName);
    var product = {
        name: productName,
        price: producPrice,
        screen: producScreen,
        backCamera: producBackCamera,
        frontCamera: producFrontCamera,
        img: producImg,
        desc: producDesc,
        type: producType,
    }
    return product;
}

function showLoading() {
    document.getElementById("product-list-title").innerHTML = "Loading........";
    // Simulate a loading process (you can replace this with your actual loading logic)
    setTimeout(function () {
        document.getElementById("product-list-title").innerHTML = "Product List";
    }, 2000);
}

function showMessage(idErr, message) {
    document.getElementById(idErr).innerText = message;
}

function validate(text, idErr) {
    if (text.trim() === "") {
        showMessage(idErr, "Can not be blank")
        document.getElementById(idErr).style.display = "block";
        return false;
    }
    else {
        showMessage(idErr, "")
        document.getElementById(idErr).style.display = "none";
        return true;
    }
}
function resetTbNotice(){
    document.getElementById("tbName").style.display = "none";
    document.getElementById("tbPrice").style.display = "none";
    document.getElementById("tbScreen").style.display = "none";
    document.getElementById("tbBackCamera").style.display = "none";
    document.getElementById("tbFrontCamera").style.display = "none";
    document.getElementById("tbImageProduct").style.display = "none";
    document.getElementById("tbDesc").style.display = "none";
}