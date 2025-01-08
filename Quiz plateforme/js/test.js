const questions = [
    {
        question: "Which is the largest animal in the world",
        answer: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest continent in the world",
        answer: [
            {text: "Asia", correct: false},
            {text: "Arctic", correct: false},
            {text: "Australia", correct: true},
            {text: "Africa", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world",
        answer: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true}
        ]
    },
    {
        question: "Which is the smallest country in the world",
        answer: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
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
function showScore(){
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
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

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

//start coundown coding
const startMin = 1;
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