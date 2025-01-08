var name2 = sessionStorage.getItem("name");

var containerEl = document.querySelector(".container");
var row = document.createElement("div");
row.classList.add("row");
row.innerHTML = `
        <div class="col-md-1"></div>
        <div class="col-md-5 p-3 bg-white guideline-box">
            <h2 class="text-center">Welcome user ${name2}</h2>
            <br>
            <p>Follow the given Guideline</p>
            <p>1. Choose a subject from the option below.</p>
            <p>2. Note that each question has a timer of 1 minutes. And after 1 minutes, it goes directly to the next question and you earn a mark of 0.</p>
            <p>3. Choose the correct answer from the list of answer and once you have choosen your answer you can directly go to the next question by clicking on the next button below your question.</p>
            <p class="fw-bold">Good Luck.</p>
        </div>
        <div class="col-md-5 p-3 bg-white">
            <select id="select-subject-el" class="form-select mt-3">
                <option value="choose subject">Choose Subject</option>
            </select>
            <button class="btn mt-5 bg-info w-100 text-white start-quiz-btn">Start Quiz</button>
        </div>
        <div class="col-md-1"></div>`;
containerEl.append(row);

//global variable

var startQuizBtn = document.querySelector(".start-quiz-btn");
var selectSubjectEl = document.querySelector("#select-subject-el");
var brandCode = sessionStorage.getItem("brandCode");
var allSubject = [];

//reading subject from localStorage

if(localStorage.getItem(brandCode+"_allSubject") != null){
    allSubject = JSON.parse(localStorage.getItem(brandCode+"_allSubject"));
    allSubject.forEach((subject, index) => {
        selectSubjectEl.innerHTML += `<option>${subject.subjectName}</option>`;
    });
}

startQuizBtn.onclick = function(){
    if(selectSubjectEl.value != "choose subject"){
        var subject = selectSubjectEl.value;
        sessionStorage.setItem("subject", subject);
        window.location = "../question/question.html";
    } else {
        swal("Wrong Subject!", "Please choose a subject!", "warning");
    }
}