// Single state object
var state = {
  questions: [
  	{
  		question: "What was the club's name before it became Manchester United?",
  		options: ["Newton Health", "FC United", "Manchester City", "The Royal Engineers"],
  		correctAnswer: 0
  	},
  	{
  		question: "How many Premier League titles have the club won?",
  		options: ["13", "20", "10", "15"],
  		correctAnswer: 0
  	},
  	{
  		question: "The club's first ever manager was...",
  		options: ["Jimmy Murphy", "John Bentley", "Jack Robson", "A.H. Albut"],
  		correctAnswer: 3
  	},
  	{
  		question: "In a January 2011 worldwide poll conducted by Man United's official magazine and website, their best ever player was named as...",
  		options: ["Denis Law", "Eric Cantona", "Paul Scholes", "Ryan Giggs"],
  		correctAnswer: 3
  	},
  	{
  		question: "Wayne Rooney is the club's all-time top goalscorer, but who is second on the list?",
  		options: ["George Best", "Bobby Charlton", "Denis Law", "Jack Rowley"],
  		correctAnswer: 1
  	}
  ],
  questionNo: 0,
  correctAnswers: 0
};

// State modification functions
function questionIncrementer(){
	state.questionNo++;
}

function correctAnswersIncrementer(){
	state.correctAnswers++;
}

function resetCounters(){
	state.questionNo = 0;
	state.correctAnswers = 0;
}

// Render functions
function startPage(element) {
	var content = "<h1>Welcome to the Manchester United Quiz</h1>" +
								"<h2>Do you know the club inside-out like Alex Ferguson or are you as clueless as Fernandinho?</h2>" +
								"<button class='js-start'>Start</button>";
	element.html(content);
}

function renderFinalResult(element){
	var itemsHtml ="<h2>Your Results<br>" + state.correctAnswers + " out of " + state.questionNo + 
								 " are correct.</h2><button class='js-replay'>Replay</button>"; 

	element.html(itemsHtml);
}


function renderResult(element, answer){
	var itemsHtml = "";
	var rightAnswer = state.questions[state.questionNo-1].correctAnswer;

	if(rightAnswer == answer){
		itemsHtml = "<h2>Correct!</h2><button class='js-next'>Next</button>";
		correctAnswersIncrementer();
	}else{
		itemsHtml = "<h2>Sorry the correct answer is:</h2>" + state.questions[state.questionNo-1].options[rightAnswer] + 
								"<button class='js-next'>Next</button>";
	}

	element.html(itemsHtml);
}

function renderQuestion(element) {
	var options = state.questions[state.questionNo].options.map(
		function(item, optionindex) {
			return "<input type='radio' name='option' value='" + optionindex + "'>" + item + "<br>";
	});
	var itemsHtml = "<p class='qCounter'>" + (state.questionNo+1) + " of " + state.questions.length + "</p><h1>" + 
									state.questions[state.questionNo].question + 
									"</h1><form>" + options.join(" ") + "</form>" +
									"<button class='answer-check'>Check Answer</button>" + 
									"<p>" + state.correctAnswers + " correct " + (state.questionNo-state.correctAnswers) + " incorrect</p>";
	element.html(itemsHtml);
}


// Event listeners
$('.content').on('click', '.js-start', function(){
	$(this).parent().addClass('questionsContent');
	renderQuestion($(this).parent());
});

$('.content').on('click', '.answer-check', function(){
	questionIncrementer();
	renderResult($(this).parent(), $(this).prev().find('input[name="option"]:checked').val());
});

$('.content').on('click', '.js-next', function(){
	if(state.questionNo >= 5) {
		renderFinalResult($(this).parent());
	} else {
		renderQuestion($(this).parent());
	}
});

$('.content').on('click', '.js-replay', function(){
	$(this).parent().removeClass('questionsContent');
	resetCounters();
	startPage($('.content'));
});

//startpage function call
startPage($('.content'));
