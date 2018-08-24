//DOM elements
var currWord = document.querySelector("#currentWord"),
	inputWord = document.querySelector("#inputWord"),
	gameStatus = document.querySelector("#gameStatus"),
	timeDisplay = document.querySelector("#time"),
	scoreDisplay = document.querySelector("#score"),
	level = document.querySelector("#level"),
	contentDisplay = document.querySelector("#content"),
	btnDisplay = document.querySelectorAll("button");

//available levels
var levels = {
	easy: 5,
	hard: 3
};

var currLevel = "easy";
var isPlaying;
var time;
var score;
var intervalId;

//Array of words
const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

init();

function init(){
	currWord.textContent = "";
	gameStatus.textContent = "";
	timeDisplay.textContent = levels[currLevel];
	scoreDisplay.textContent = 0;
	level.textContent = currLevel;
	time = levels[currLevel];
	contentDisplay.style.opacity = 1;
	score = 0;
	isPlaying = false;
	btnDisplay[0].disabled = false;
	btnDisplay[1].disabled = false;
}

//randomly choose word to display
function displayWord(){
	currWord.textContent = words[Math.floor(Math.random()*words.length)];
}

//check if player input correctly and update score
function checkInput(){
	if(isPlaying){
		if(inputWord.value === currWord.textContent){
			score++;										//update score and status
			scoreDisplay.textContent = score;
			time = levels[currLevel];
			displayWord();
		}
		else
		{
			gameStatus.innerHTML = "Game Over! <br> Your score: " + score;
			clearInterval(intervalId);
			isPlaying = false;
			fadeOutBackground();
			console.log("fade done");
		}
	}
	inputWord.value="";	
}

//count down timer
function countDown(){

	timeDisplay.textContent = time;

	if (time===0){
		checkInput();
	}
	else
		time--;
}

//keypress event handler 
document.addEventListener("keypress", function(e){
	if(e.keyCode === 13){
		if (inputWord.value.toLowerCase() === "s" && !currWord.textContent){				//enter s to start the game
			displayWord();
			intervalId = setInterval(countDown, 1000);
			isPlaying = true;
			btnDisplay[0].disabled = true;
			btnDisplay[1].disabled = true;
		}
		else if (inputWord.value.toLowerCase() === "r")			//enter r to restart the game
			init();
		else{
			checkInput();							//check input
		}

		inputWord.value="";							//empty input field afterwards
	}
});

//mode button event handler
for (var i=0; i<btnDisplay.length; i++){
	btnDisplay[i].addEventListener("click", function(){
		currLevel = this.textContent;
		init();
	});
};

//fade out effect
function fadeOutBackground(){
	
	var fadeOutId = setInterval(function(){
		if(!contentDisplay.style.opacity)
			contentDisplay.style.opacity = 1;
		else if(contentDisplay.style.opacity>0.1)
			contentDisplay.style.opacity-=0.1;
		else
			clearInterval(fadeOutId);
	}, 100);
}