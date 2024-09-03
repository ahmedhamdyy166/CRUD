var productNameInput = document.getElementById('productname');
var productpriceInput = document.getElementById('productprice');
var productCategoryInput = document.getElementById('productcategory');
var productDescInput = document.getElementById('productdescription');
var SearchInput = document.getElementById('SearchInput');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');

var productContainer = [];
var currentIndex = -1;  // Variable to store the index of the product being updated

if (localStorage.getItem("products") != null) {
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts(productContainer);
}

function addProduct() {
    var product = {
        Nameofproduct: productNameInput.value,
        Priceofproduct: productpriceInput.value,
        Categoryofproduct: productCategoryInput.value,
        Descriptionofproduct: productDescInput.value
    };
    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts(productContainer);
    clearForm();
}

function clearForm() {
    productNameInput.value = "";
    productpriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    addBtn.classList.replace('d-none', 'd-block');
    updateBtn.classList.replace('d-block', 'd-none');
}

function displayProducts(arr) {
    var cartoona = ``;
    for (var i = 0; i < arr.length; i++) {
        cartoona += `
        <tr>
        <td>${arr[i].Nameofproduct}</td>
        <td>${arr[i].Priceofproduct}</td>
        <td>${arr[i].Categoryofproduct}</td>
        <td>${arr[i].Descriptionofproduct}</td>
        <td> <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning">Update </button> </td>
        <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete </button> </td>
        </tr>`;
    }
    document.getElementById('tableofproductbody').innerHTML = cartoona;
}

function deleteProduct(productIndex) {
    productContainer.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts(productContainer);
}

function SearchProducts(term) {
    var MatchedProducts = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].Nameofproduct.toLowerCase().includes(term.toLowerCase()) == true) {
            MatchedProducts.push(productContainer[i]);
        }
    }
    displayProducts(MatchedProducts);
}

function setFormUpdate(i) {
    currentIndex = i;  // Store the index of the product being updated
    addBtn.classList.replace('d-block', 'd-none');
    updateBtn.classList.replace('d-none', 'd-block');
    productNameInput.value = productContainer[i].Nameofproduct;
    productpriceInput.value = productContainer[i].Priceofproduct;
    productCategoryInput.value = productContainer[i].Categoryofproduct;
    productDescInput.value = productContainer[i].Descriptionofproduct;
}

function updateProduct() {
    productContainer[currentIndex] = {
        Nameofproduct: productNameInput.value,
        Priceofproduct: productpriceInput.value,
        Categoryofproduct: productCategoryInput.value,
        Descriptionofproduct: productDescInput.value
    };
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProducts(productContainer);
    clearForm();
}

updateBtn.addEventListener('click', updateProduct);
