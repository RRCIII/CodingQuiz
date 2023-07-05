// const defined here via getElementById, querySelector to target HTML
const startButton = document.getElementById('start-button');
const startPage = document.querySelector('.start-page');
const questionsPage = document.querySelector('.questions-page');
const timerLeft = document.getElementById('timer');
const answerBar = document.querySelector('.answer-bar');
const correctOrWrong = document.getElementById('correct-or-wrong');
const resultsPage = document.querySelector('main-results-page');
const fScore = document.getElementById('final-score');
const hsInitals = document.getElementById('fs');
const submitBtn = document.getElementById('submit-hs');
const highScoresPage = document.querySelector('.high-scores-page');
const highScoresList = document.querySelector('.high-scores.list');
const goBack = document.getElementById('back');
const clearHs = document.getElementById('clear');
const goToHsPage = document.getElementById('hs-link');
const topBar = document.getElementById('top-bar-container');


//Global scope variables are delacared here to be accessed for other f();
let finalScore = 0;
let gameOver = false; 
let questionIndex = 0;
let totalTime = 75;
// value declared as an open string for user to input initials
let initials = " ";  
let highScoresArray = [ ];  
let index = 1;   


//Start timer
const startTimeCount = () => {
  let timer = setinterval(() => {
    // conditions set if the game is not over
    if (!gameOver) {
      totalTime--;
      finalScore = totalTime
      timerLeft.textContent = `Time: ${totalTime}`
    }
    //conditions set if the game is over
    if (gameOver) {
      clearInterval(timer)
    }
    // conditions set if the time less than 0
    if (totalTime < 0) {
      clearInterval(timer)
      showScore()
      timerLeft.textContent = `Time: 0 `
    }

  }, 1000)
};

// starts the quiz
const startQuiz = () => {
  startPage.classList.add('hide')// CSS declaration adding a hide to element startpage
  questionsPage.classList.remove('hide')
  showquestions(questionIndex)
  timer.textContent =`Time: ${totalTime}`
  startTimeCount()
}

//show the questions 
const showquestions = (index) => {
  const question = document.getElementById("question")
  const answer = document.getElementById("answer")

  if (questionIndex <= listedQuestions.length -1) {
      
      question.innerHTML = `<h1>${listedQuestions[index].question}</h1>`

      answer.innerHTML = 
      `button class=btn ${listedQuestions[index].options[0]}</button` 
      `button class=btn ${listedQuestions[index].options[1]}</button` 
      `button class=btn ${listedQuestions[index].options[2]}</button` 
      `button class=btn ${listedQuestions[index].options[3]}</button`
      `button class=btn ${listedQuestions[index].options[4]}</button` 
      
      const buttons = document.querySelectorAll('.btn')

      buttons.foreach(button => {
        button.addEventListener("click", checkAnswer)
      })
  } else {
    gameOver =true
    showScore()
  }
} 

//if the answer is correct or incorrect 
const checkAns = (event) => {
  const ansClicked = event.target.textContent
// if answer is correct
  if(ansClicked === listedQuestions[currentQuestionIndex].correctAns) {
      correctInc.textContent = "Correct!"
      answerBar.classList.remove("hide")
     
//if answer is incorrect
  } else if (ansClicked !== listedQuestions[currentQuestionIndex].correctAns){
      iTimer -= 10
      correctInc.textContent = "Incorrect!"
      answerBar.classList.remove("hide")     
  } else {
    gameOver= true;
    showScore();
   
  }

// display correct or wrong for 500 milliseconds after answering
   setTimeout(() => {
    answerBar.classList.add('hide')
    currentQuestionIndex++
    showQues(currentQuestionIndex)
}, 500)

};



// show scores 
const showScore = () => {
    gameOver = true
    hiddenQuestionsPage.classList.add("hide")
    resultsP.classList.remove("hide")
    fScore.textContent = `${finalScore}.`
}

//highScore w/ initials
  const createHscore = () => {
    initials = hsInitials.value 
// input box is empty
    if(!initials) {
    alert("Please enter initials")
// exits the fxn using return 
    return 
  }
// clears the input field  
  hsInitials.value = " "
   

  let hs = {
    initials, 
    finalScore
  }

// push to the highScoresArray
  highScoresArray.push(hs)

//preventing duplicate high scores to be displayed 
  while (viewHsL.firstchild) {
  viewHsL.removeChild(viewHsL.firstchild)
  }

//Loop to HTML to add hs 
  for (let i = 0; i < highScoresArray.length; i++) {
    let highscoreLi = document.createElement("li");
    highscoreLi.textContent = `${index}. ${highScoresArray[i].initials} - ${highScoresArray[i].finalScore}`;
    viewHsL.appendChild(highscoreLi);
  }

  saveHScore();
  displayHScore();

};

//save high score to local storage 
const saveHScore = () => {
  localStorage.setItem("HScore", JSON.stringify(highScoresArray))
}

// high Scores loaded from local Storage
const getHScore = () => {
  let loadHScore = JSON.parse(localStorage.getItem("HScore"))

  if (!loadHScore) {
    return false
  }
//retrieve hs fro local storage to display and push into high scores array to renderd initially
  for(let i = 0; i <loadHScore.length; i ++) {
    let highScoreLi = document.createElement("li")
    highScoreLi.textContent = `${index}. ${loadHScore[i].initials} - ${loadHScore[i].finalScore}`
    viewHsL.appendChild(highScoreLi)

    highScoresArray.push(loadHScore[i])
  }
};

//display high scores 
const displayHScore = () => {
  gameOver = true 

  resultsP.classList.add("hide")
  beginPage.classList.add("hide")
  hiddenQuestionsPage.classList.add("hide")

  hiddenScoresP.classList.remove("hide")
  firstpage.style.visibility = "hidden"
  timeEl.textContet = `Time: 0` 
}

//clear high scores 
const clearScore = () => {
    highScoresArray= []
    index= 1 

//removes high scores after clearing the local storage 
    while (viewHsL.firstChild) {
      viewHsL.removeChild(viewHsL.firstChild)
    }

    localStorage.clear("HScore")
};

//reset variables when clicking on goback
const BackToStart = () => {
  gameOver = false
  currentQuestionIndex = 0;
  iTimer= 75;
  finalScore = 0;
  initials = " ";  
  index = 1;   
  
  renderbeginPage()
}

//render beginning page after clicking goback
const renderbeginPage = () => {
   resultsP.classList.add("hide")
   beginPage.classList.remove("hide")
   firstpage.style.visibility = "visible"
   timeEl.textContent = `Time: 0`
}

// get local starage array to render from the beginning page
getHScore()

//EventListners added here
startbtn.addEventListener("click", startQ);
submitbtn.addEventListener("click", createHscore);
back.addEventListener("click", BackToStart);
clear.addEventListener("click", clearScore);
backToHScoreP.addEventListener("click", displayHScore);






























































