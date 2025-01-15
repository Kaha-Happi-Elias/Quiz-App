/*var subject = sessionStorage.getItem("subject");
var brandCode = sessionStorage.getItem("brandCode");
var studentName = sessionStorage.getItem("name");
var title = document.querySelector(".title");
var allQuestions = [];

title.innerText = `${subject} questions`;
//reading question from localStorage
if(localStorage.getItem(brandCode+"_"+subject+"_question") != null){
    allQuestions = JSON.parse(localStorage.getItem(brandCode+"_"+subject+"_question"));
    console.log(allQuestions);
}

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
        handleNextButton();
        clearInterval(intervalId);
    }
}

//stop the timer
function stopTimer() {
    clearInterval(intervalId);
    time = 0;
    timerEl.innerHTML = "0:00"; // reset UI
}

function startQuiz(){
    index = 0;
    right = 0;
    showQuestion();
}

const showQuestion = () =>{
    resetState();
    let data = allQuestions[index];
    questionEl.innerHTML = `${index+1}) ${data.question}`;
    allOptionsEl[0].nextElementSibling.innerText = data.optionOne;
    allOptionsEl[1].nextElementSibling.innerText = data.optionTwo;
    allOptionsEl[2].nextElementSibling.innerText = data.optionThree;
    allOptionsEl[3].nextElementSibling.innerText = data.optionFour;
    
    if(data.correctAnswer){
        button.dataset.correct = data.correctAnswer;
    }
    allOptionsEl.addEventListener("click", getAnswer);
}
showQuestion();

const getAnswer = () =>{
    var answer;
    allOptionsEl.forEach((input) =>{
        if(input.click){
            answer = input.value;
        }
    });
    return answer;
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(event){
    var selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        right++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
       if(button.dataset.correct === "true"){
            button.classList.add("correct");
       } 
       button.disabled = true;
    });
    nextButton.style.display = "block";
}

const endQuiz = () =>{
    resetState();
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
    
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
        time = startMin * 60; // Reset the timer.
        clearInterval(intervalId); // Clear the previous interval

        intervalId = setInterval(updateCountDown, 1000); // start new interval timer
    } else {
        showScore();
        stopTimer();
        return;
    }
}

nextBtn.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        submitFunc();
    }
});

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
}*/

// Variables from session storage
var subject = sessionStorage.getItem("subject").toUpperCase();
var code = sessionStorage.getItem("code");
var brandCode = sessionStorage.getItem("brandCode");
var studentName = sessionStorage.getItem("name");

// DOM elements
var title = document.querySelector(".title");
var allQuestions = [];
var index = 0;
var right = 0;
var wrong = 0;
var total;
let mainBox = document.querySelector(".main");
let answerButton = document.querySelector(".answer-button");
let questionEl = document.querySelector(".question-el");        var nextBtn = document.querySelector(".next-btn");
let allOptionsEl = document.querySelectorAll('input[name="option"]');


// Set title
title.innerText = `${subject} questions`;

// Get questions from localStorage
if(localStorage.getItem(brandCode+"_"+code+"_question") != null){
   allQuestions = JSON.parse(localStorage.getItem(brandCode+"_"+code+"_question"));
   total = allQuestions.length;
   console.log(allQuestions);
}

// Start the countdown
const startMin = allQuestions.length;
let time = startMin * 60;
let intervalId;
const timerEl = document.getElementById("timer");

function updateCountDown() {
   const minutes = Math.floor(time / 60);
   let seconds = time % 60;

   seconds = seconds < 10 ? '0' + seconds : seconds;

   timerEl.innerHTML = `${minutes}:${seconds}`;
   time--;

   if (time < 0) {
       stopTimer();
       handleNextButton();
   }
}

function stopTimer() {
   clearInterval(intervalId);
   time = 0;
   timerEl.innerHTML = "0:00";
}

// Start the quiz
function startQuiz(){
   index = 0;
   right = 0;
   wrong = 0;
   showQuestion();
   startTimer(); // Start the interval timer
}

function startTimer(){
    //time = startMin * 60; // Reset the timer.
    //clearInterval(intervalId); // Clear the previous interval
    intervalId = setInterval(updateCountDown, 1000); // Start interval timer
}

const showQuestion = () => {
   resetState();
   let data = allQuestions[index];
   questionEl.innerHTML = `${index + 1}) ${data.question}`;

   const optionKeys = ['optionOne', 'optionTwo', 'optionThree', 'optionFour'];

   for (let i = 0; i < allOptionsEl.length; i++) {
       const option = allOptionsEl[i];
       const optionKey = optionKeys[i];

       option.value = data[optionKey];
       option.dataset.value = data[optionKey];
       option.dataset.correct = `option-${i+1}` === data.correctAnswer;
       option.addEventListener('click', getAnswer);
   }

   nextBtn.style.display = 'none';
}


function getAnswer(event) {
    const selectedBtn = event.target;
    allOptionsEl.forEach(option => {
        option.disabled = true;
    });

    selectAnswer(selectedBtn);
}


function selectAnswer(selectedBtn) {
    const ans = selectedBtn.id; // Get the data-id attribute from selected option
    /*for(i=0; i<4; i++){
        if(option[i].id = questionEl.correctAnswer)
    }*/  
    
    if (ans === allQuestions[index].correctAnswer) {
        selectedBtn.classList.add("correct");
        right++;
        console.log(right+" right Answers");
    }else{
       selectedBtn.classList.add("incorrect");
        wrong++;
        console.log(wrong+" Wrong Answers");
    }
    allOptionsEl.forEach(option => {
        if(option.dataset.correct === 'true'){
            option.classList.add("correct")
        }
    });

    nextBtn.style.display = 'block';
}

function resetState() {
    nextBtn.style.display = "none";
    allOptionsEl.forEach(option => {
        option.classList.remove("correct");
        option.classList.remove("incorrect");
        option.disabled = false;
    });

}

const endQuiz = () => {
    resetState();
    let resultHTML = '';

    if (right >= (total / 2)) {
        resultHTML = `
            <h1 class="text-center text-success fw-bold">Congratulation ${studentName}!</h1>
            <br>
            <h2 class="text-center">You have scored ${right} out of ${total} questions.</h2>
            <div align="center">
                <button class="btn btn-success quiz-submit-btn" onclick="location.href='../homepage/homepage.html'">Quit</button>
             </div>`;
    } else {
        resultHTML = `
            <h1 class="text-center text-danger fw-bold">Could do better ${studentName}!</h1>
            <br>
            <h2 class="text-center">You have scored ${right} out of ${total} questions.</h2>
            <div align="center">
            <button class="btn btn-success quiz-submit-btn" onclick="location.href='../homepage/homepage.html'">Quit</button>
            </div>`;
    }
    mainBox.innerHTML = resultHTML;
        stopTimer();
}


function handleNextButton() {
    index++;
    if (index < allQuestions.length) {
        showQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}
nextBtn.addEventListener("click", handleNextButton);

startQuiz();