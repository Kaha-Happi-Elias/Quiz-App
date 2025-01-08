var subject = sessionStorage.getItem("subject");
var brandCode = sessionStorage.getItem("brandCode");
var studentName = sessionStorage.getItem("name");
var title = document.querySelector(".title");
var allQuestions = [];

title.innerText = `${subject} questions`;
//reading question from localStorage
if(localStorage.getItem(brandCode+"_"+subject+"_question") != null){
    allQuestions = JSON.parse(localStorage.getItem(brandCode+"_"+subject+"_question"));
    console.log(allQuestions);
} /*else {
    swal("No Question", "Please choose another subject", "warning");
}*/

var index = 0;
var right = 0;
var wrong = 0;
var total = allQuestions.length;
var allUserResult = [];
//var particularUserResult = [];
let mainBox = document.querySelector(".main");
var allOptionsEl = document.querySelectorAll(".option");
let answerButton = document.querySelector(".answer-button");
let questionEl = document.querySelector(".question-el");
var nextBtn = document.querySelector(".next-btn");

//start coundown coding
const startMin = 0.10;
let time = startMin*60;
let intervalId = setInterval(updateCountDown, 2000);
const timerEl = document.getElementById("timer");
setInterval(updateCountDown, 1000);
function updateCountDown(){
    const minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds:seconds;

    timerEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
    if(minutes == 0 && seconds == 0){
        getQuestionFunc();
        clearInterval(intervalId);
    }
}

//stop the timer
function stopTimer() {
    clearInterval(intervalId);
    time = 0;
    timerEl.innerHTML = "0:00"; // reset UI
}

const getQuestionFunc = () =>{
    if(index == total){
        stopTimer();
        return endQuiz();
    }
    resetFunc();
    let data = allQuestions[index];
    questionEl.innerHTML = `${index+1}) ${data.question}`;
    allOptionsEl[0].nextElementSibling.innerText = data.optionOne;
    allOptionsEl[1].nextElementSibling.innerText = data.optionTwo;
    allOptionsEl[2].nextElementSibling.innerText = data.optionThree;
    allOptionsEl[3].nextElementSibling.innerText = data.optionFour;

    time = startMin * 60; // Reset the timer.
    clearInterval(intervalId); // Clear the previous interval
    intervalId = setInterval(updateCountDown, 1000); // start new interval timer
}
getQuestionFunc();

nextBtn.onclick = function(){
    let data = allQuestions[index];
    var ans = getAnswer();
    if(ans === data.correctAnswer){
        right++;
        console.log(right+" Right Answers");
    } else {
        wrong++;
        console.log(wrong+" Wrong Answers");
    }
    index++;
    getQuestionFunc();
    return;
}

const getAnswer = () =>{
    var answer;
    allOptionsEl.forEach((input) =>{
        if(input.checked){
            answer = input.value;
        }
    });
    return answer;
}

function resetFunc(){
    allOptionsEl.forEach((input) =>{
        input.checked = false;
    });
}

const endQuiz = () =>{
    if(right >= (total/2)){
        mainBox.innerHTML = `
        <h1 class="text-center text-success fw-bold">Congratulation!</h1>
        <br>
        <h2>You have scored ${right} out of ${total} questions.</h2>
        <div align="center">
        <button class="btn btn-success quiz-submit-btn">Quit</button>
        </div>`;
    } else {
        mainBox.innerHTML = `
        <h1 class="text-center text-danger fw-bold">Could do better!</h1>
        <br>
        <h2>You have scored ${right} out of ${total} questions.</h2>
        <div align="center">
        <button class="btn btn-success quiz-submit-btn">Quit</button>
        </div>`;
    }
    
    submitFunc();
}

const submitFunc = () =>{
    if(localStorage.getItem(brandCode+"_"+subject+"_result") != null){
        allUserResult = JSON.parse(localStorage.getItem(brandCode+"_"+subject+"_result"));
    }
    if(localStorage.getItem(brandCode+"_"+studentName+"_result") != null){
        particularUserResult = JSON.parse(localStorage.getItem(brandCode+"_"+studentName+"_result"));
    }
    var submitBtn = document.querySelector(".quiz-submit-btn");
    submitBtn.onclick = function(){
        allUserResultFunc();
        particularUserResult();
        this.innerHTML = "Please wait...";
        this.disabled = true;
    }
}

const allUserResultFunc = () =>{
    allUserResult.push({
        name: studentName,
        rightAns : right,
        wrongAns: wrong,
        subject: subject,
        maxMark: total
    });
    localStorage.setItem(brandCode+subject+"_result", JSON.stringify(allUserResult));
    setTimeout(function(){
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("brandCode");
        sessionStorage.removeItem("subject");
        window.location = "../homepage/homepage.html"
    }, 2000);
}

const particularUserResult = () =>{
    particularUserResult.push({
        name: studentName,
        subject: subject,
        rightAns: right,
        wrongAns: wrong,
        maxMark: total
    });
    localStorage.setItem(brandCode+"_"+studentName+"_result", JSON.stringify(particularUserResult));
    setTimeout(function(){
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("brandCode");
        sessionStorage.removeItem("subject");
        window.location = "../homepage/homepage.html"
    }, 2000);
}
