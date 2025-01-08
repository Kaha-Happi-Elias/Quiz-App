/*star from control coding */
var signupBtn = document.querySelector(".signup-btn");
var loginBtn = document.querySelector(".login-btn");
var loginBox = document.querySelector(".login-box");
var signupBox = document.querySelector(".signup-box");

signupBtn.onclick = function(){
    signupBox.classList.add("active");
    loginBox.classList.remove("active");
    loginBtn.classList.remove("d-none");
    signupBtn.classList.add("d-none");
}

loginBtn.onclick = function(){
    signupBox.classList.remove("active");
    loginBox.classList.add("active");
    loginBtn.classList.add("d-none");
    signupBtn.classList.remove("d-none");
}

//register part
var registerForm = document.querySelector('.signup-form');
var allInput = registerForm.querySelectorAll("input");

registerForm.onsubmit = function(event){
    event.preventDefault();
    registrationData();
}

const registrationData = () =>{
    if(localStorage.getItem(allInput[0].value) === null){
        const userData = {
            brandCode : allInput[0].value,
            brandName : allInput[1].value,
            userName : allInput[2].value,
            password : allInput[3].value
        }
        let userString  = JSON.stringify(userData);
        localStorage.setItem(allInput[0].value, userString);
        registerForm.reset('');
        swal("Registration done!", "please Login!", "success");
    } else{
        swal("Registration refuse!", "This brand code already exist", "warning");
    }
}

//start login 
var loginBtn1 = document.querySelector(".login-btn1");
var brandCode = document.querySelector("#s-brand-code");
var username = document.querySelector("#username");
var password = document.querySelector("#password");

loginBtn1.onclick = function(event){
    event.preventDefault();
    if(brandCode.value && username.value && password.value !== ""){
        if(localStorage.getItem(brandCode.value) != null){
            var allData = JSON.parse(localStorage.getItem(brandCode.value));
            console.log(allData);
            if(allData.userName == username.value){
                if(allData.password == password.value){
                    loginBtn1.innerHTML = "Please Wait...";
                    loginBtn1.disabled = true;
                    setTimeout(function(){
                        window.location = "dashboard/dashboard.html";
                        sessionStorage.setItem("brandCode", brandCode.value)
                    },3000);
                } else{
                    swal("Wrong Password!", "Please check your password field", "warning");
                }
            } else{
                swal("Wrong Username!", "Please check your username field", "warning");
            }
        } else{
            swal("Wrong Band Code!", "Please check your brand code field", "warning");
        }
    } else{
        swal("Empty Field!", "Please fill all the field", "warning");
    }
} 

var studentForm = document.getElementById("student-form");
studentForm.onclick = function(){
    window.location = "../homepage/homepage.html";
}