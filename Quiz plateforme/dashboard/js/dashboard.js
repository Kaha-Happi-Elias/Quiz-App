//get data from session storage
var brandCode;
brandCode = sessionStorage.getItem("brandCode");
if(brandCode == null){
    document.body.innerHTML = "";
    document.body.style.background = "black";
    swal("UnAuthorised User!", "Go back!", "warning");
}
var brandNameEl = document.getElementById("brand-name");
var allUserData = JSON.parse(localStorage.getItem(brandCode));
brandNameEl.innerHTML ="Welcome admin: " + allUserData.brandName

//start logout coding
var logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function(){
    this.innerHTML = "please wait...";
    logoutBtn.disabled = true;
    this.style.background = "#56df1b";
    setTimeout(function(){
        window.location = "../quiz.html";
        sessionStorage.removeItem("brandCode");
    }, 3000);
}

//start add subject coding
var visibleSubject = document.querySelector(".visible-subject");
var subjectBtn = document.querySelector(".subject-btn");
var subjectEl = document.querySelector(".subject");
var subjectCodeEl = document.querySelector(".subject-code");

var allCode = []; // Initialize as array

// Function to load subjects from local storage
const loadSubjects = () => {
    const storedSubjects = localStorage.getItem(brandCode+"_allCode");
    if (storedSubjects) {
         allCode = JSON.parse(storedSubjects);
          // Clear previous subjects before rendering the new ones
        visibleSubject.innerHTML = "";
        allCode.forEach((subject,index) => newSubject(subject,index));
    }
    updateSubjectNum();
};

// Function to save subjects to local storage
const saveSubjects = () => {
  localStorage.setItem(brandCode+"_allCode", JSON.stringify(allCode));
};

subjectBtn.onclick = function(event){
    event.preventDefault();
    if(subjectEl.value && subjectCodeEl.value != ""){
        const subjectName = subjectEl.value;
        const subjectCode = subjectCodeEl.value;
        newSubject({subjectName, subjectCode}, allCode.length);
        allCode.push({subjectName, subjectCode});
        subjectEl.value = "";
        subjectCodeEl.value = "";
        saveSubjects();
    } else{
        swal("Subject or Subject Code is empty!", "Please enter subject!", "warning");
    }
    updateSubject();
    updateSubjectNum();
};


const displaySubjectCodes = () => {
    const storedCodes = localStorage.getItem(brandCode+"_allCode");
    if (storedCodes) {
        const allCodes = JSON.parse(storedCodes);
          allCodes.forEach(subject => {
              console.log(`Subject: ${subject.subjectName}, Code: ${subject.subjectCode}`);
           });
        console.log("All subject codes: ", allCodes)
    } else {
        console.log("No subject codes found in localStorage.");
    }
};

const newSubject = (subject, index) =>{
    var subjectName = subject.subjectName;
    var subjectCode = subject.subjectCode;
    visibleSubject.innerHTML +=
    `
    <div class="subject-box d-flex justify-content-between align-items-center">
        <h4 index='${index}' data-subject-code="${subjectCode}"> ${subjectName}</h4>
        <div>
            <i class="edit-btn fa fa-edit mx-2" style="font-size: 15px;"></i>
            <i class="save-btn fa fa-save mx-2 d-none" style="font-size: 15px;"></i>
            <i class="del-btn fa fa-trash mx-2" style="font-size: 15px;"></i>
        </div>
    </div>
    `;
};

function updateSubjectNum() {
    var subjectBox = visibleSubject.querySelectorAll(".subject-box");
    var subjectNum = document.getElementById("subject-number");
    subjectNum.innerHTML = '0'+subjectBox.length;
}

// Load the subjects when the page loads.
document.addEventListener('DOMContentLoaded', loadSubjects);
document.addEventListener("DOMContentLoaded", displaySubjectCodes);
//start delete coding
visibleSubject.addEventListener('click', function(event) {
    if(event.target.classList.contains('del-btn')) {
        const delBtn = event.target;
        const parent = delBtn.parentElement.parentElement;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                parent.remove();
                updateSubject();
                updateSubjectNum();
                swal("Proof! Your Imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }
});


//start update coding
visibleSubject.addEventListener('click', function(event) {
  if(event.target.classList.contains('edit-btn')) {
        const editBtn = event.target;
    var parent = editBtn.parentElement.parentElement;
    var h4 = parent.getElementsByTagName("H4");
      var saveBtn = parent.querySelector(".save-btn");
      h4[0].contentEditable = true;
      h4[0].focus();
    editBtn.classList.add("d-none");
    saveBtn.classList.remove("d-none");

      saveBtn.onclick = function(){
        var editedSub = h4[0].innerHTML;
        var id = h4[0].getAttribute("index");
            var editedCode = h4[0].dataset.subjectCode
        updateSubject(editedSub, editedCode, id);
        this.classList.add("d-none");
        editBtn.classList.remove("d-none");
        h4[0].contentEditable = false;
        }
    }
});

if(localStorage.getItem(brandCode+"_allCode") != null){
    allCode = JSON.parse(localStorage.getItem(brandCode+"_allCode"));
    allCode.forEach((subject, index) => {
       newSubject(subject, index); 
    });
}
//number of subject coding
updateSubjectNum();
function updateSubjectNum(subjectBox){
    var subjectBox = visibleSubject.querySelectorAll(".subject-box");
    var subjectNum = document.getElementById("subject-number");
    subjectNum.innerHTML = '0'+subjectBox.length;
}


function updateSubject(subject, code, id){
    if (subject != undefined && code != undefined && id != undefined) {
        allCode[id] = {
            subjectName : subject,
            subjectCode : code
        }
    } else {
        var i;
        allCode = [];
        var subjectBox = visibleSubject.querySelectorAll(".subject-box");
        for(i=0; i < subjectBox.length; i++){
            var h4 = subjectBox[i].getElementsByTagName("H4");
             allCode.push({
                  subjectName : h4[0].innerHTML,
                    subjectCode : h4[0].dataset.subjectCode
                });
        }
    }

    localStorage.setItem(brandCode+"_allCode", JSON.stringify(allCode));
}

//start return subject in question form
var chooseSubject = document.querySelector("#choose-subject");
var questionForm = document.querySelector(".question-form");
var allQuestionInput = questionForm.querySelectorAll("INPUT");
var selectSubject = document.querySelector("#select-subject");
var chooseAns = document.querySelector("#choose-ans");
var subject;
var code;
var allQuestions = [];

questionForm.onsubmit = (event) => {
    event.preventDefault();
    insertQuestionFunc();
};

const chooseSubjectFunc = () => {
    allCode.forEach((subject) => {
        chooseSubject.innerHTML += `
        <option value='${subject.subjectName}' data-subject-code="${subject.subjectCode}">${subject.subjectName}</option>
        `;
        selectSubject.innerHTML += `
        <option value='${subject.subjectCode}' data-subject-code="${subject.subjectCode}">${subject.subjectName}</option>
        `;
    });
    // Disable the first option if it is a "choose subject" option.
    if (chooseSubject.options[0].value === "choose subject"){
        chooseSubject.options[0].disabled = true;
    }
};

chooseSubjectFunc();

chooseSubject.addEventListener('change', () => {
    checkSubject();
    checkSubjectKey();
});

var firstOption = chooseSubject.querySelectorAll("OPTION")[1];

function checkSubject() {
    if (chooseSubject.value === "choose subject") {
        if (firstOption && firstOption.dataset) {
             subject = firstOption.value;
            code = firstOption.dataset.subjectCode;
        }
    } else {
        const selectedOption = chooseSubject.options[chooseSubject.selectedIndex];
        subject = selectedOption.value;
        code = selectedOption.dataset.subjectCode;
   }
}

checkSubject();


function checkSubjectKey() {
    const key = brandCode + "_" + code + "_question";
    try {
      const data = localStorage.getItem(key);
      console.log("checkSubjectKey: Retrieved data for key '" + key + "':", data); //Log the retrieved data
      if (data != null) {
        allQuestions = JSON.parse(data);
        console.log("checkSubjectKey: Successfully parsed data:", allQuestions);
      } else {
        allQuestions = [];
        console.log("checkSubjectKey: No data found for key '" + key + "'");
      }
    } catch (error) {
      console.error("checkSubjectKey: Error parsing JSON:", error, "Key:", key, "Data:", localStorage.getItem(key));
      allQuestions = []; //Reset to avoid further issues.
    }
}
checkSubjectKey();

function insertQuestionFunc(sub, id, question, opOne, opTwo, opThree, opFour, correctAnswer){
    if(sub !== undefined && id !== undefined){ //If update question
        allQuestions[id] = {
             question : question,
             optionOne : opOne,
             optionTwo : opTwo,
             optionThree : opThree,
             optionFour : opFour,
             correctAnswer : correctAnswer
          };
            localStorage.setItem(brandCode+"_"+sub+"_question", JSON.stringify(allQuestions));
            swal("Success!", "Data updated successfully!", "success");
     } else { //If new question
          if (chooseSubject.value !== "choose subject") {
              const selectedOption = chooseAns.options[chooseAns.selectedIndex];
              const correctAnswerText = selectedOption.text;
  
               const subjectCodeSelected =  chooseSubject.options[chooseSubject.selectedIndex].dataset.subjectCode;
  
              allQuestions.push({
                  question : allQuestionInput[0].value,
                  optionOne : allQuestionInput[1].value,
                  optionTwo : allQuestionInput[2].value,
                  optionThree : allQuestionInput[3].value,
                  optionFour : allQuestionInput[4].value,
                  correctAnswer : correctAnswerText
              });
              localStorage.setItem(brandCode + "_" + subjectCodeSelected + "_question", JSON.stringify(allQuestions));
              swal("Success!", "Data inserted successfully!", "success");
              questionForm.reset('');
          } else {
               swal("Choose Subject!", "Please select a subject!", "warning");
          }
     }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
      if (chooseAns) {
          chooseAns.options[0].disabled = true;
      }
  });
  

//returning question from the localStorage
var newQuestions = [];
var visibleQuestion = document.querySelector(".visible-question");
selectSubject.onchange = () =>{
    if(localStorage.getItem(brandCode+"_"+selectSubject.value+"_question") != null){
       newQuestions = JSON.parse(localStorage.getItem(brandCode+"_"+selectSubject.value+"_question"));
       visibleQuestion.innerHTML = "";
       newQuestionsFunc();
    } else {
        visibleQuestion.innerHTML = '<b class="text-danger">No questions available for this subject!</b>';
    }
}

const newQuestionsFunc = () =>{
    newQuestions.forEach((question, index) =>{
        visibleQuestion.innerHTML += `
        <div class="mb-3" index="${index}">
            <br></br>
            <div class="d-flex justify-content-between">
                <h4>${index+1}) ${question.question}</h4>
                <div>
                    <i class="fa fa-edit edit-btn mx-2"></i>
                    <i class="fa fa-save save-btn mx-2 d-none"></i>
                    <i class="fa fa-trash del-btn mx-2"></i>
                </div>
                <br></br>
            </div>
            <span>a) ${question.optionOne}</span>
            <br></br>
            <span>b) ${question.optionTwo}</span>
            <br></br>
            <span>c) ${question.optionThree}</span>
            <br></br>
            <span>d) ${question.optionFour}</span>
            <br></br>
            <span class="bg-info p-2 text-white rounded">${question.correctAnswer}</span>
            <br>
        </div>
        `;
    });

    // start delete coding
    var allDelBtn = visibleQuestion.querySelectorAll(".del-btn");
    var i, j;
    for(i=0; i<allDelBtn.length; i++){
        allDelBtn[i].onclick = (event) =>{
            var parent = event.target.parentElement.parentElement.parentElement;
            var index = parent.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this question",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    newQuestions.splice(index,1);
                    localStorage.setItem(brandCode+"_"+selectSubject.value+"_question",JSON.stringify(newQuestions));
                    parent.remove();
                    swal("Proof! Your question file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your question file is safe!");
                }
            });
        }

    }

    //start edit coding
    var allEditBtn = visibleQuestion.querySelectorAll(".edit-btn");
    for(i=0; i<allEditBtn.length; i++){
        allEditBtn[i].onclick = function(){
            var parent = this.parentElement.parentElement.parentElement;
            var index = +parent.getAttribute("index");
            var saveBtn = parent.querySelector(".save-btn");
            this.classList.add("d-none");
            saveBtn.classList.remove("d-none");
            var h4 = parent.querySelector("h4");
            var span = parent.querySelectorAll("span");
            h4.contentEditable = true;
            h4.focus();
            for(j=0; j<span.length; j++){
                span[j].contentEditable = true;
                span[j].style.border = "2px solid red";
            }
            //start save coding
            saveBtn.onclick = function(){
                var subject = selectSubject.value;
                var question = h4.innerHTML.replace(`(${index+1})`, "");
                var opOne = span[0].innerHTML.replace("a) ","");
                var opTwo = span[1].innerHTML.replace("b) ","");
                var opThree = span[2].innerHTML.replace("c) ","");
                var opFour = span[3].innerHTML.replace("d) ","");
                var corAns = span[4].innerHTML;
                swal({
                    title: "Are you sure?",
                    text: "Once updated, you will not be able to recover this question",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willUpdate) => {
                    if (willUpdate) {
                        insertQuestionFunc(subject, index, question, opOne, opTwo, opThree, opFour, corAns); 
                        allEditBtn[index].classList.remove("d-none");
                        saveBtn.classList.add("d-none");
                        h4.contentEditable = false;
                        for(j=0; j<span.length; j++){
                            span[j].contentEditable = false;
                            span[j].style.border = "none";
                        }
                    } else {
                        swal("Your question file is safe!");
                    }
                });
            }
        }
    }
}
  
// start registration coding
var registrationForm = document.querySelector(".registration-form");
var allRegInput = registrationForm.querySelectorAll("INPUT");
var userType = registrationForm.querySelector("select");
var registrationDataEl = document.querySelector(".registration-data");
var registrationData = [];

registrationForm.onsubmit = function(event){
    event.preventDefault();
    registrationFunc();
    getRegistrationDataFunc();
}

//get data
if(localStorage.getItem(brandCode+"_registrationData") != null){
    registrationData = JSON.parse(localStorage.getItem(brandCode+"_registrationData"));
}

const registrationFunc = () =>{
    if (userType.value != "choose type"){
        registrationData.push({
            name : allRegInput[0].value,
            userType : userType.value,
            password : allRegInput[1].value
        });
        localStorage.setItem(brandCode+"_registrationData", JSON.stringify(registrationData));
        swal("Data Inserted!", "Registration done successfully!", "success");
        registrationForm.reset('');
    } else {
        swal("Choose Type!", "Pleease select a Type!", "warning");
    }
}

const getRegistrationDataFunc = () =>{
    registrationDataEl.innerHTML = "";
    registrationData.forEach((allData, index) =>{
        registrationDataEl.innerHTML += `
        <tr index=${index}>
            <th scope="row">${index+1}</th>
            <td class="text-wrap" style="width: 8rem;">${allData.name}</td>
            <td class="text-wrap" style="width: 8rem;">${allData.password}</td>
            <td class="text-wrap" style="width: 8rem;">${allData.userType}</td>
            <td class="text-wrap" style="width: 8rem;">
                <i class="fa fa-trash del-btn mx-3"></i>
                <i class="fa fa-eye edit-btn mx-3" data-bs-toggle="modal" data-bs-target="#myModal"></i>
            </td>
        </tr>
        `;
    });
    //start delete coding
    var allDelBtn = registrationDataEl.querySelectorAll(".del-btn");    
    for(i=0; i<allDelBtn.length; i++){
        allDelBtn[i].onclick = function(){
            var parent = this.parentElement.parentElement;
            var index  = parent.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    registrationData.splice(index, 1);
                    localStorage.setItem(brandCode+"_registrationData", JSON.stringify(registrationData));
                    parent.remove();
                    getRegistrationDataFunc();
                    swal("Proof! Your Imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
        }
    }
    //start edit coding
    var allEditBtn = registrationDataEl.querySelectorAll(".edit-btn");
    var modalEditBtn = document.querySelector(".modal-edit");
    var modalUploadBtn = document.querySelector(".modal-upload");
    var modalForm = document.querySelector(".modal-form");
    var allModalInput = modalForm.querySelectorAll("input");
    var closeBtn = document.querySelector(".btn-close");
    for(i=0; i<allEditBtn.length; i++){
        allEditBtn[i].onclick = function(){
            var parent = this.parentElement.parentElement;
            var index  = parent.getAttribute("index");
            var td = parent.querySelectorAll("td");
            var name = td[0].innerHTML;
            var password = td[1].innerHTML;
            var userType = td[2].innerHTML;

            allModalInput[0].value = name;
            allModalInput[1].value = password;
            allModalInput[2].value = userType;
            for(j=0;j<allModalInput.length;j++){
                allModalInput[j].disabled = true;
            }
            modalEditBtn.onclick = function(){
                for(j=0;j<allModalInput.length;j++){
                    allModalInput[j].disabled = false;
                }
                this.classList.add("d-none");
                modalUploadBtn.classList.remove("d-none");

                modalUploadBtn.onclick = function(){
                    var name = allModalInput[0].value;
                    var password = allModalInput[1].value;
                    var userType = allModalInput[2].value;
                    swal({
                        title: "Are you sure?",
                        text: "Once update, you will not be able to recover this imaginary",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willUpdate) => {
                        if (willUpdate) {
                            registrationData[index] = {
                                name : name,
                                password : password,
                                userType : userType
                            }
                            localStorage.setItem(brandCode+"_registrationData", JSON.stringify(registrationData));
                            getRegistrationDataFunc();
                            this.classList.add("d-none");
                            modalEditBtn.classList.remove("d-none");
                            closeBtn.click();
                            swal("Proof! Your Imaginary file has been updated!", {
                                icon: "success",
                            });
                        } else {
                            swal("Your imaginary file is safe!");
                        }
                    });
                }
            }
        }
    }   

}
getRegistrationDataFunc();

//start toggler
var togglersBtn = document.querySelectorAll(".toggler-icon");
var sideNav = document.querySelector(".side-nav");
togglersBtn[0].onclick = function(){
    sideNav.classList.add("active");
    this.classList.add("d-none");
    togglersBtn[1].classList.remove("d-none");
}
togglersBtn[1].onclick = function(){
    sideNav.classList.remove("active");
    this.classList.add("d-none");
    togglersBtn[0].classList.remove("d-none");
}
