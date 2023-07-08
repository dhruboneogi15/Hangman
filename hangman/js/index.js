var programming_languages = [
	"python",
	"javascript",
  'bash',
  'basic',
  'rust',
  'jquery',
  'krypton',
  'go',
  'assembly',
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  var n=programming_languages.length;
  var idx=Math.floor(Math.random()*n);
  answer = programming_languages[idx];
}

function generateButtons() {
  console.log('abcdefgh'.split(''));
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function settime(){
	var audio= document.getElementById("myaudio");
	audio.currentTime=1;
	audio.play();
	console.log(audio.currentTime); // this is to check the currentTime in the console log
       
// the below setInterval is to check the currentTime is greater than 56 or not in every 1 second
	setInterval(function(){
		if(audio.currentTime>2){
			audio.pause();
				}
			},1000);
		}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    var audio = new Audio('./images/mistake.mp3');
    playSegment(audio , 1.1 , 2.01); // this will play from 1.11 sec to 2.45 sec

    function playSegment(audio, start, stop){
        let audioObjNew = audio.cloneNode(true); //this is to prevent "play() request was interrupted" error. 
        audioObjNew.currentTime = start;
        audioObjNew.play();
        audioObjNew.int = setInterval(function() {
            if (audioObjNew.currentTime > stop) {
                audioObjNew.pause();
                clearInterval(audioObjNew.int);
            }
        }, 10);
    } 

    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  if(mistakes === maxWrong){
      document.getElementById('hangmanPic').src = './images/gameover.png';
      return;
  }
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    var audio1 = new Audio('./images/victory.mp3');
    audio1.play();
    const victory = './images/awesome.png';
    // console.log(victory);
    document.getElementById('hangmanPic').src = victory;

    // document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();