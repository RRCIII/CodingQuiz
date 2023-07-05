// const defined here via getElementById, querySelector to target HTML
const startButton = document.getElementById('start-button');
const startPage = document.querySelector('.start-page');
const questionsPage = document.querySelector('.questions-page');
const timerLeft = document.getElementById('timer');
const answerBar = document.querySelector('.answer-bar');
const correctOrWrong = document.getElementById('correct-or-wrong');
const resultsPage = document.querySelector('.main-results-page');
const fScore = document.getElementById('final-score');
const hsInitials = document.getElementById('fs');
const submitBtn = document.getElementById('submit-hs');
const highScoresPage = document.querySelector('.high-scores-page');
const highScoresList = document.querySelector('.high-scores-list');
const goBack = document.getElementById('back');
const clearHs = document.getElementById('clear');
const goToHsPage = document.getElementById('hs-link');
const topBar = document.getElementById('top-bar-container');


// //Global scope variables are delacared here to be accessed for other f();
let finalScore = 0;
let gameOver = false; 
let questionIndex = 0;
let totalTime = 75;
// value declared as an open string for user to input initials
let getInitials = " ";  
let highScoresArray = [ ];  
let index = 1; 


// //Start timer
const startTimeCount = () => {
  let timer = setInterval(() => {
    // conditions set if the game is not over
    if (!gameOver) {
      totalTime--;
      finalScore = totalTime
      timerLeft.innerText = `Time: ${totalTime}`
    }
    //conditions set if the game is over
    if (gameOver) {
      clearInterval(timer)
    }
    // conditions set if the time less than 0
    if (totalTime < 0) {
      clearInterval(timer)
      showScore()
      timerLeft.innerText = `Time: 0 `
    }

  }, 1000)
};

// // starts the quiz
const startQuiz = () => {
  startPage.classList.add('hide')// CSS declaration adding "hide" to the element startpage
  questionsPage.classList.remove('hide')
  showQuestion(questionIndex)
  timer.innerText =`Time: ${totalTime}`
  startTimeCount()
}

//show the questions 
const showQuestion = (index) => {
  const question = document.getElementById("question")
  const answers = document.getElementById("answers")

  if (questionIndex <= listedQuestions.length -1) {
      
      question.innerHTML = `<h1>${listedQuestions[index].question}</h1>`;

      answers.innerHTML = 
      `<button class="btn">${listedQuestions[index].options[0]}</button> 
       <button class="btn">${listedQuestions[index].options[1]}</button> 
       <button class="btn">${listedQuestions[index].options[2]}</button> 
       <button class="btn">${listedQuestions[index].options[3]}</button>` 

      
      const buttons = document.querySelectorAll('.btn')

      buttons.forEach(button => {
        button.addEventListener("click", checkAnswer)
      })
  
  } else {
    gameOver =true;
    showScore();
  }
} 

// //if the answer is correct or incorrect 
const checkAnswer = (event) => {
  const answerClicked = event.target.innerText;

  if(answerClicked === listedQuestions[questionIndex].answers) {
    correctOrWrong.innerText = "Correct!";
    answerBar.classList.remove("hide");

  } else if (answerClicked !== listedQuestions[questionIndex].answers) {
    totalTime -= 10;
    correctOrWrong.innerText = "Wrong!";
    answerBar.classList.remove("hide");
  } else {
    gameOver = true
    showScore();
  }
//display correct or wrong for 500 milliseconds after answering
  setTimeout(() => {
    answerBar.classList.add("hide");
    questionIndex++
    showQuestion(questionIndex);
  }, 500);
}

//show Scores
var showScore = () =>{
    gameOver = true
    questionsPage.classList.add("hide")
    resultsPage.classList.remove("hide")
    fScore.innerText = `${finalScore}`
}

// creating high score w/ initals and final score

const createHighScore = () => {
    getInitials = hsInitials.value

    // if input box is empty
    if (!getInitials) {
      alert ("Please enter initials")
      return 
    }

    // clear input field
    hsInitials.value = " "

    let hs = {
      getInitials,
      finalScore
    }

    //push to high scores array
    highScoresArray.push(hs)

    //prevents duplicated scores of the first child
    while (highScoresList.firstchild) {
      highScoresList.removeChild(highScoresList.firstChild)
    }

    // add high score to HTML with a for loop
    for ( let i = 0; i < highScoresArray.length; i++) {
        let highScoreli = document.createElement("li")
        highScoreli.innerText = `${index}. ${highScoresArray[i].getInitials} - ${highScoresArray[i].finalScore}`
        highScoresList.appendChild(highScoreli)
        index++
    }
    
    saveHighScore();
    displayHighScores();
  }

//save high scores to local storage
const saveHighScore = () => {
  localStorage.setItem("HighScore", JSON.stringify(highScoresArray))
}
//get High scores loaded from local storage
const getHighScore = () => {
  let loadHighScores = JSON.parse(localStorage.getItem("HighScore"))

  // condition if not localstorage.getItem, return false
  if(!loadHighScores) {
      return false
  }

//displays highscores from local storage and push back into the highscoresArray for initialization
for (let i = 0; i < loadHighScores.length; i++) {
    let highScoreli = document.createElement("li")
    highScoreli.innerText = `${index}. ${loadHighScores[i].getInitials} - ${loadHighScores[i].finalScore}`
    highScoresList.appendChild(highScoreli)

    highScoresArray.push(loadHighScores[i])
  }
}

//display high scores page
const displayHighScores = () => {
    gameOver = true

    resultsPage.classList.add("hide")
    startPage.classList.add("hide")
    questionsPage.classList.add("hide")

    highScoresPage.classList.remove('hide')
    topBar.style.visibility = "hidden"
    timerLeft.innerText = `Time: 0`

}

// clear high scores page
const clearScore = () => {
  highScoresArray = []
  index = 1

  // removes duplicate scores after clearing local storage
  while (highScoresList.firstChild) {
    highScoresList.removeChild(highScoresList.firstChild)
  }
    localStorage.removeItem("HighScore")

}

//set variables back to what they were, once the 'back' btn has been clicked
const backToStart = () => {
  gameOver = false
  questionIndex = 0 
  totalTime = 75
  finalScore = 0
  getInitials = " "
  index = 1

  renderStartPage ()
}

//after  clicking 'back', display start page.  
const renderStartPage = () => {
  highScoresPage.classList.add("hide")
  startPage.classList.remove("hide")
  topBar.style.visibility = "visible"
  timerLeft.innerText = `Time: 0`
}

//get the local storage array to render from the start 
getHighScore()

// //event listeners added here
startButton.addEventListener("click", startQuiz)
submitBtn.addEventListener("click", createHighScore)
goBack.addEventListener("click", backToStart)
goToHsPage.addEventListener("click", displayHighScores)
clearHs.addEventListener("click", clearScore)












































