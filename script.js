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
var card = document.querySelector(".card");
var playAgain = document.querySelector("#playAgain");

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
  quizElement.textContent = "GAME OVER - LET'S SEE HOW YOU DID!";
  endGame.style.display="block";
}

function another() {
  location.reload();
}

next.addEventListener("click", nextQuiz);
highScores.addEventListener("click", showCard);
endGame.addEventListener("click", showCard);
playAgain.addEventListener("click", another);

function showCard() {
  clearInterval(timer);
  quizElement.style.display="none";
  startButton.style.display="none";
  endGame.style.display="none";
  card.style.display="block";
  playAgain.style.display="block";
}

var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

// The following function renders items in a todo list as <li> elements
function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var points = score;
    var todo = todos[i] + ': ' + (points+10);

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.style.margin="10px";
    button.textContent = 'Remove High Score';

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // This is a helper function that will render todos to the DOM
  renderTodos();
}

function storeTodos() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add submit event to form
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  // todoInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();
});

// Add click event to todoList element
todoList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
  }
});

// Calls init to retrieve data and render it to the page on load
init();

