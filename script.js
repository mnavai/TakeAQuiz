

let questionNumber = 0;
let score = 0;

 //start quiz
function startQuiz() {
  
  $(".textBox").on("click", ".startButton", function (event) {
    
    $('.textBox').hide();
    $('.questionNumber').text(1);
    $('.js-questionBox').show();
    $('.js-questionBox').prepend(generateQuestion());
  });
}


//submits your respond and checks it against the correct answer 
function submitAnswer() {
  
  $('.js-questionBox').on('click','#submitButton',function (event) {
    
    event.preventDefault();

    if ($('input[type=radio]:checked').length <= 0) {
       alert("Please select one of the answers");
    }
    $('.js-responseBox').show();
    $('.js-questionBox').hide();
    
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = `${store[questionNumber].correctAnswer}`;
    if (answer === correct)
    {

      $('.js-responseBox').html(
      `<section class="textBox">
      <img src="images/correct.png" alt="wrong answer" class="image" height="100px" /><br />
      <h3>Your answer is correct!</h3>
      <button type="button" id="nextButton" class="button">Next</button></section>`
      );
     
      updateScore();
    } 
    else 
    {
      $('.js-responseBox').html(
      `<section class="textBox">
      <img src="images/wrong.png" alt="wrong answer" class="image" height="110px" />
      <h3>Correct Answer is: "${store[questionNumber].correctAnswer}"</h3>
      <button type="button" id="nextButton" class="button">Next</button></section>`
      );  
    }   
  });
  
}

//checks to see if there are more questions to be displayed, othewise it displays the final score
function generateQuestion() {
  if (questionNumber < store.length) {
    
    generateOptions(questionNumber);
  } 
  else 
  {
    $('.js-questionBox').hide();
    finalScore();
    $('.questionNumber').text(6);
  }
}

function generateOptions(questionNumber) {
  $('.js-questionBox').html(`
      <section class="textBox"><legend>${store[questionNumber].question}</legend><br />
      <fieldset>
         <form id="myForm">
         <br />
          <label>
            <input class="radio" type="radio" name="answer" id="answerIndex" value="${store[questionNumber].answers[0]}" required>
            <span>${store[questionNumber].answers[0]}</span>
          </label>
          <br />
          <label>
            <input class="radio" type="radio" name="answer" id="answerIndex" value="${store[questionNumber].answers[1]}" required>
            <span>${store[questionNumber].answers[1]}</span>
          </label>
          <br />
          <label>
            <input class="radio" type="radio" name="answer" id="answerIndex" value="${store[questionNumber].answers[2]}" required>
            <span>${store[questionNumber].answers[2]}</span>
          </label>
          <br />
          <label>
            <input class="radio" type="radio" name="answer" id="answerIndex" value="${store[questionNumber].answers[3]}" required>
            <span>${store[questionNumber].answers[3]}</span>
          </label>
          <br />
          <button id="submitButton" class="button" role="button" value="Submit">Submit</button>
         </form>
      </fieldset>
      </section>`);
      
}

//updates score
function updateScore() {
  
  $('.score').text(score+1);
  score++;
}

//updates number of questions
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//takes you to the next Q
function nextQuestion() {
    $('.js-responseBox').on('click','#nextButton', function (event) {
    event.preventDefault();
    $('.js-responseBox').hide();
    $('.js-questionBox').show();
    updateQuestionNumber();
    $('.js-questionBox').prepend(generateQuestion());
  });
}


//displays final results
function finalScore() {
  $('.js-finalBox').show();

  if (score >= 4) {
    return $('.js-finalBox').html(
    `<section class="textBox">
        <h3>Your score is ${score} / 6</h3><br />
        <h3>You did a great job, Keep it up!</h3>
        <button  id="restartButton" class="button">Restart</button>
     </section>`
  );
  } else if (score < 4 && score >= 3) {
     return $('.js-finalBox').html(
    `<section class="textBox">
        <h3>Your score is ${score} / 6</h3><br />
        <h3>Not bad, do better next time :)</h3>
        <button  id="restartButton" class="button">Restart</button>
     </section>`
  );
  } else {
     return $('.js-finalBox').html(
    `<section class="textBox">
        <br />
        <h3>Your score is ${score} / 6</h3><br /><br />
        <h3>hmmm you failed the quiz, Don't know what else to say :|</h3><br />
        <button  id="restartButton" class="button">Restart</button>
     </section>`
  );
  }
 
}

//restart quiz
function restartQuiz() {
  $('.js-finalBox').on('click', '#restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.js-finalBox').hide();
    $('.textBox').show();
  });
}

//reset the quiz 
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}


function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
