var timerElement = document.querySelector("#timer-count");
var container = document.querySelector(".container");
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
var next = document.querySelector("#next");
var endGame = document.querySelector("#endGame");

var timer;
var timerCount = 75;
var questionCount = 0;
var questions = [
  ["What does the acronym CSS stand for?",
  "Cats sitting still",
  "Collapsing social structure",
  "Cascading style sheets",
  "Cute stream salmon"],
  ["Which CSS element to target has the greatest specificity?",
  "Header", "Body", "Class", "ID"],
  ["Which of the following header sizes is the smallest?", "h6", "h7", "h8", "h9"]
];
var player = 'Player 1';
var score;

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = "Time: " + timerCount;

    if (timerCount < 1) {
      answer.style.display="none";
      next.style.display="none";
      quizElement.textContent = "GAME OVER - YOU RAN OUT OF TIME";
      endGame.style.display="block";
    }
  }, 1000);
}

startButton.addEventListener("click", hideStart);
startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", quiz);

function hideStart() {
  startButton.style.display="none";
}

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

function quiz2() {
  answer.style.display = "none";
  next.style.display = "none";

  question.textContent = questions[1][0];
  optOne.textContent = questions[1][1];
  optTwo.textContent = questions[1][2];
  optThree.textContent = questions[1][3];
  optFour.textContent = questions[1][4];

  optOne.addEventListener("click", wrong);
  optTwo.addEventListener("click", wrong);
  optThree.addEventListener("click", wrong);
  optFour.addEventListener("click", right);
}

function quiz3() {
  answer.style.display = "none";
  next.style.display = "none";

  question.textContent = questions[2][0];
  optOne.textContent = questions[2][1];
  optTwo.textContent = questions[2][2];
  optThree.textContent = questions[2][3];
  optFour.textContent = questions[2][4];

  optOne.addEventListener("click", right);
  optTwo.addEventListener("click", wrong);
  optThree.addEventListener("click", wrong);
  optFour.addEventListener("click", wrong);
}

function wrong() {
  answer.textContent = "Try again!";
  answer.style.display = "block";
  timerCount = timerCount-10;
}

function right() {
  answer.textContent = "Correct!";
  answer.style.display = "block";
  questionCount++;
  if (questionCount === 1) {
    next.style.display = "block";
  } else if (questionCount === 2) {
    next.style.display = "block";
  } else {
    gameOver();
  }
}

function nextQuiz () {
  if (questionCount === 1) {
    quiz2();
  } else if (questionCount === 2) {
    quiz3();
  } else {
    gameOver();
  }
}

function gameOver() {
  score = timerCount;
  clearInterval(timer);
  answer.style.display="none";
  next.style.display="none";
  quizElement.textContent = "GAME OVER - let's see how you did";
  endGame.style.display="block";
}

next.addEventListener("click", nextQuiz);
highScores.addEventListener("click", displayScores);
endGame.addEventListener("click", displayScores);

function displayScores() {
 alert('High Score: ' + player + ': ' + (score+10));
}



