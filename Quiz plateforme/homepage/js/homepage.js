//start get brand code from localstorage
var allAdminCodeString = sessionStorage.getItem("allAdminCode");
let allAdminCode = [];
if (allAdminCodeString) {
  allAdminCode = JSON.parse(allAdminCodeString);
}

var brandCodeEl = document.querySelector("#brand-code-el");
allAdminCode.forEach((code, index) => {
  brandCodeEl.innerHTML +=`
  <option value="${code}">${code}</option>`;
});

//all global variable
var loginForm = document.querySelector(".login-form");
var allLoginInput = loginForm.querySelector("input");
var loginBtn = loginForm.querySelector("button");
var brandCode;
var allUserData = [];

//start login coding
brandCodeEl.addEventListener('change', () =>{
    if(brandCodeEl.value != "choose space code"){
        sessionStorage.setItem("brandCode", brandCodeEl.value);
        brandCode = sessionStorage.getItem("brandCode");
        loginUserFun();
    } else {
        swal("Please select brand!", "Please select code", "warning");
    }
});


const loginUserFun = () =>{
    if(localStorage.getItem(brandCode) != null){
        allUserData = JSON.parse(localStorage.getItem(brandCode));
    }
    console.log(allUserData);
    loginForm.onsubmit = function(event){
        var name1 = loginForm.querySelector(".name1");
        var entryName =  name1.value;
        event.preventDefault();
        sessionStorage.setItem("name", entryName);
        sessionStorage.setItem("brandCode", brandCode);
        window.location = "../welcome/welcome.html";
    }
}
