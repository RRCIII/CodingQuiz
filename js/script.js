
// const defined here via getElementById, querySelector to target HTML
const startbtn = document.getElementById("start");
const beginPage = document.querySelector(".begin-p");
const hiddenQuestionsPage  = document.querySelector(".h-questions");
const timeEl = document.getElementById("time");
const answerBar = document.querySelector(".answer-key");
const correctInc = document.getElementById("correct-incorrect");
const resultsP = document.querySelector(".h-results");
const fScore = document.getElementById("fin-score");
const hsInitials = document.getElementById("all-res");
const submitbtn = document.getElementById("submit");
const hiddenScoresP = document.querySelector(".high-scores");
const viewHsL = document.querySelector(".view-high-scores");
const back = document.getElementById("back");
const clear = document.getElementById("clear");
const backToHScoreP= document.getElementById("view-highScores-link");
const firstpage = document.getElementById("h-container");

//Global scope variables are delacared here to be accessed for other f();
let finalScore = 0;
let gameOver = false; 
let currentQuestionIndex = 0;
let iTimer = 75;
// value declared as an open string for user to input initials
let initials = " ";  
let highScoresArray = [ ];  
let index = 1;   

const startTimer = () => {
     let timer = setInterval(() => {
      if (!gameOver) { 
        iTimer--
        finalScore = iTimer;
        timeEl.textContent = `Time: ${iTimer}` 
      }
      if (gameOver) {
//stops the time
        clearInterval(timer);
        
      }
      if (iTimer < 0) {
        clearInterval(timer);
        showScore();
        timeEl.textContent = `Time : 0`
       
      }

    }, 1000)
  }

// starts the quiz

const startQ = () => {
//classlist adds the CSS 'hide' to the 'begin' element, hiding begin from the UI
    beginPage.classList.add("hide") 
//removes hide from the hq element to display for the User.
    hiddenQuestionsPage.classList.remove("hide")
// shows questions with specified index
    showQues(currentQuestionIndex)
// displays time followed by the value of the tTimer variable. 
    timeEl.textContent = `Time: ${iTimer}`
    startTimer()
};

//show the questions 
const showQues = (index) => {
  const question = document.getElementById("question")
  const answers = document.getElementById("answers")
// if true, there are more questions to displayed
  if (currentQuestionIndex <= listedQuestions.length - 1) {
      question.innerHTML =`<h1>${listedQuestions[index].Q}</h1>`

      answers.innerHTML = `
      <button class="btn">${listedQuestions[index].ans[0]}</button>
      <button class="btn">${listedQuestions[index].ans[1]}</button>
      <button class="btn">${listedQuestions[index].ans[2]}</button>
      <button class="btn">${listedQuestions[index].ans[3]}</button>
    `
        
        
      const buttons = document.querySelectorAll(".btn")
          buttons.forEach(button => {
          button.addEventListener("click", checkAns)
      });
  } else {
        gameOver= true;
        showScore();
        
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






























































