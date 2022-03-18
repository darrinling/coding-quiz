var timerElement = document.querySelector("#timer-count");
var startButton = document.querySelector("#startBtn");
var quizElement = document.querySelector(".quizGame");
var playElement = document.querySelector("#play");
var question = document.querySelector("#question");
var optOne = document.querySelector(".optOne");
var optTwo = document.querySelector(".optTwo");
var optThree = document.querySelector(".optThree");
var optFour = document.querySelector(".optFour");
var answer = document.querySelector("#answer");
var highScores = document.querySelector("#highScores");

var timer;
var timerCount = 30;
var questionCount = 3;
var questions = [
  ["What does the acronym CSS stand for?",
  "Cats sitting still",
  "Collapsing social structure",
  "Cascading style sheets",
  "Cute stream salmon"
]];
var score = 0;

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = "Time: " + timerCount;
    startButton.style.display="none";
    quiz();
    if (timerCount === 0) {
      clearInterval(timer);
    }
  }, 1000);
}


startButton.addEventListener("click", startTimer);

function quiz() {
  quizElement.style.display="block";
  question.textContent = questions[0][0];
  optOne.textContent = questions[0][1];
  optTwo.textContent = questions[0][2];
  optThree.textContent = questions[0][3];
  optFour.textContent = questions[0][4];

  optOne.addEventListener("click", wrong);
  optTwo.addEventListener("click", wrong);
  optThree.addEventListener("click", right);
  optFour.addEventListener("click", wrong);

}

function wrong() {
  answer.textContent = "Try again!";
  answer.style.display = "block";
}

function right() {
  answer.textContent = "Correct!";
  answer.style.display = "block";
  score++;
}

// function enterHighScore() {

// }

highScores.addEventListener("click", displayScores);
function displayScores() {
 alert('High Score: ' + 'Darrin: ' + score);
}
