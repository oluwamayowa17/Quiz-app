const questions = [
    {
        question: 'What is my show of all time?',
        options: ['Friends', 'The office', 'The Originals', 'Suits'],
        answer: 'Friends'
    },
    {
        question: 'If I could travel to any country in the world, where would you go first?',
        options: ['Japan', 'Italy', 'Australia', 'France'],
        answer: 'France'
    },
    {
        question: 'What is my go-to comfort food?',
        options: ['Pizza', 'Mac and Cheese', 'Ice Cream', 'Chicken Soup'],
        answer: 'Pizza'
    },
    {
        question: 'What is my biggest fear?',
        options: ['Heights', 'Spiders', 'Failure', 'Being Alone'],
        answer: 'Failure',
    },
    {
        question: 'If you could have any superpower, what would it be?',
        options: ['Flight', 'Invisibility', 'Teleportation', 'Mind Reading'],
        answer: 'Teleportation'
    },
    {
        question: 'What is my most cherished childhood memory?',
        options: ['Family Vacations', 'Playing with Friends', 'Holidays', 'Spending time with my siblings'],
        answer: 'Holidays'
    },
    {
        question: 'What is my dream job?',
        options: ['Developer', 'Doctor', 'Entrepreneur', 'Artist'],
        answer: 'Entrepreneur'
    },
    {
        question: 'What is my favorite book or book series?',
        options: ['Harry Potter', 'The Lord of the Rings', 'To Kill a Mockingbird', 'The Catcher in the Rye'],
        answer:'Harry Potter'
    },
    {
        question: 'How many siblings do I have?',
        options: ['7', '3', '5', '4'],
        answer:'4'
    },
    {
        question: 'What is my favorite hobby or pastime?',
        options: ['Reading', 'Cooking', 'Composing Music', 'Painting/Drawing'],
        answer:'Composing Music'
    },
    {
        question: 'What is my favorite season and why?',
        options: ['Spring', 'Summer', 'Fall', 'Winter'],
        answer: 'Winter',
    },
    {
        question: 'Who is my celebrity crush?',
        options: ['Micheal B Jordan',  'Olumuyiwa Adediran', 'Christiano Ronaldo', 'Keith Powers'],
        answer: 'Keith Powers'
    },
    {
        question: 'What is my favorite music genre or band?',
        options: ['Pop', 'Rap', 'Hip Hop', 'Country'],
        answer: 'Rap'
    },
    {
        question: 'What is my favorite dessert?',
        options: ['Chocolate Cake', 'Apple Pie', 'Cheesecake', 'Ice Cream Sundae'],
        answer: 'Ice Cream Sundae'
    },
    {
        question: 'What is one thing on my bucket list?',
        options: ['Skydiving', 'Traveling the World', 'Learning a New Language', 'Starting a Business'],
        answer: 'Traveling the World'
    },
    {
        question: 'If I could learn any new skill instantly, what would it be?',
        options: ['Playing an Instrument', 'Cooking', 'Photography', 'Coding'],
        answer: 'Playing an Instrument'
    },
    {
        question: 'What is my favorite animal?',
        options: ['Dog', 'Cat', 'Elephant', 'Turkey'],
        answer: 'Turkey'
    },
    {
        question: 'What is my proudest accomplishment so far?',
        options: ['Graduating from Uni', 'Getting a Promotion', 'Completing a Marathon', 'Starting a Family'],
        answer: 'Graduating from Uni'
    }
];

const submitBtn = document.getElementById('submit-btn')
const nextBtn = document.getElementById('next-btn')
const result = document.getElementById('result')
const timerDisplay = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120;
  
function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    displayQuestion();
}


function retakeQuiz(){
    window.location.reload(); 

}
  
function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsForm = document.getElementById('options');
    
    questionElement.textContent = '';
    optionsForm.innerHTML = '';
    
    questionElement.textContent = questions[currentQuestionIndex].question;
    
    questions[currentQuestionIndex].options.forEach((option, index) => {
      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = 'option';
      optionInput.value = option;
      optionInput.id = `option${index}`;
      optionInput.style.margin = '10px'
      
      const optionLabel = document.createElement('label');
      optionLabel.htmlFor = `option${index}`;
      optionLabel.textContent = option;
      optionLabel.style.margin = '10px'
      optionLabel.style.marginLeft = '0px'

      optionsForm.appendChild(optionInput);
      optionsForm.appendChild(optionLabel);
      optionsForm.appendChild(document.createElement('br'));
      
    });

}
  
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption && selectedOption.value === questions[currentQuestionIndex].answer) {
        score++;
    }
}

// const keysArray = Object.keys(questions);
// const lastIndex = keysArray.length - 1;
  
function nextQuestion() {
    checkAnswer(); // Call checkAnswer before moving to the next question
    
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    
    } 
    else{
        clearInterval(timerInterval); // Stop the timer when all questions are answered
        showScore();
    } 
}

function updateTimer() {
    if (timeLeft > 0) {
        timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
        timeLeft--;
    } else {
        clearInterval(timerInterval); // Stop the timer when time runs out
        showScore();
    }
}


  
function showScore() {
    clearInterval(timerInterval);
    checkAnswer()
    const scorePercentage = (score / questions.length) * 100;
    document.getElementById('quiz').style.display = 'none' 
    result.style.display = 'block'
    document.getElementById('score').textContent = score;
    let message;

    if (scorePercentage >= 70){
        message = "Congratulations! You did a great job."
    }else if(scorePercentage >= 50 && scorePercentage < 70){
        message = "Good job! You could definately do better👍"
    }else{
        message = 'Oopsies!! Better luck next time'
    }
    document.getElementById('message').textContent = message;
}


const timerInterval = setInterval(updateTimer, 1000);