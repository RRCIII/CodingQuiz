var timeInterval; 
var time = document.querySelector(".timer"); 
var questions = document.querySelector(".Q-card");
var startbtn = document.getElementById("start");
 


 startbtn.addEventListener("click", function() {
   var secondsLeft = 75;
       questions.style.display = "block";
   
    var timeInterval = setInterval(function () {
        secondsLeft--; 
        document.querySelector(".timer").textContent = secondsLeft;
   
    if (secondsLeft === 0) {
        clearInterval(timeInterval);
    }
  } ,1000);
});


