const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const highscoreButton = document.getElementById('highscore-btn')
const timerButton = document.getElementById('timer-btn')
const codingQuiz = document.getElementById('codingQuiz')
const finishButton = document.getElementById('finish-btn')
const codingScore = document.getElementById('codingQuizScore')
//const scoreTable = document.getElementById('scoreTable')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerEl = document.querySelector('#timer3d')

let shuffledQuestions, currentQuestionIndex

var interval;
let timeLeft = 120;

var highScores = [{Name: '', Scores: ''}];





function intializeTimer() {
    timeLeft = parseInt(timerEl.getAttribute("data-time"));
    interval = setInterval(function() {
        timeLeft--;
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
        } else {
            clearInterval(interval);
        }
        
    }, 1000);
}


startButton.addEventListener('click', startGame) 
finishButton.addEventListener('click', endGame)



nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    nextButton.classList.remove('hide')
    timerButton.classList.remove('hide')
    questionContainerElement.classList.remove('hide')
    codingQuiz.classList.add('hide')
    //scoreTable.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()
    intializeTimer()
}

//Working on timer
function endGame() {
    questionContainerElement.classList.add('hide')
    codingScore.classList.remove('hide')
    //scoreTable.classList.remove('hide')
}


function forScore() {
    var x = document.getElementById('myText').value;
   
    var score = document.getElementById('timer3d').innerHTML;
    highScores.push({name: x, score: score});
    var html = '<table>';
    html += '<tr>';
    for( var j in highScores[0] ) {
    html += '<th>' + j + '</th>';
    }
    html += '</tr>';
    for( var i = 0; i < highScores.length; i++) {
    html += '<tr>';
    for( var j in highScores[i] ) {
        html += '<td>' + highScores[i][j] + '</td>';
    }
    html += '</tr>';
    }
    html += '</table>';
    document.getElementById('hsTable').innerHTML = html;
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn-dark')
        if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        codingScore.classList.add('hide')
        finishButton.classList.add('hide')
    }
}

function selectAnswer(e) {
const selectedButton = e.target
const correct = selectedButton.dataset.correct
setStatusClass(document.body, correct)
Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
})
if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
} else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    finishButton.classList.remove('hide')
    clearInterval(interval)
}
if (correct == null) {
    timeLeft = timeLeft - 10
}
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
        
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What does the acronym CSS mean?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true},
            { text: 'Conquer Style Sheets', correct: false}, 
            { text: 'Computer Style Sheets', correct: false},
            { text: 'Colombian Style Sheets', correct: false},
        ]
    },
    {
        question: 'What does the acronym HTML mean?',
        answers: [
            { text: 'Hyper Tag Markup Language', correct: false},
            { text: 'Hyper Text Markup Language', correct: true},
            { text: 'Hyperlinks Text Mark Language', correct: false},
            { text: 'Hyperlinking Text Marking Language', correct: false},
        ]
    },
    {
        question: 'What symbol indicates a tag?',
        answers: [
            { text: 'Angle brackets e.g.<>', correct: true},
            { text: 'Curved brackets e.g. {,}', correct: false},
            { text: 'Commas', correct: false},
            { text: 'Exclamation marks e.g. !', correct: false},
        ]
    },
    {
        question: 'To make your website mobile friendly, you can make your website?',
        answers: [
            { text: 'Light', correct: false},
            { text: 'Fast Loading', correct: false},
            { text: 'Reactive', correct: false},
            { text: 'Responsive', correct: true},
        ]
    },
    {
        question: 'What does SQL stand for?',
        answers: [
            { text: 'Superior Questions Lot', correct: false},
            { text: 'Structured Query Language', correct: false},
            { text: 'Statistical Query Language', correct: true},
            { text: 'Standard Query Lot', correct: false},
        ]
    },
    {
        question: 'Which of the following is true about Javascript?',
        answers: [
            { text: 'It is a server side scripting language', correct: false},
            { text: 'It is client side scripting language', correct: true},
            { text: 'It is a Software', correct: false},
            { text: 'It is a database', correct: false},
        ]
    },
    
]



