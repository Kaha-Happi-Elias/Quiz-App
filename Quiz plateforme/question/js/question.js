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