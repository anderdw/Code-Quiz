const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const highscoreButton = document.getElementById('highscore-btn')
const timerButton = document.getElementById('timer-btn')
const codingQuiz = document.getElementById('codingQuiz')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {

   


    console.log('Started')
    startButton.classList.add('hide')
    nextButton.classList.remove('hide')
    highscoreButton.classList.remove('hide')
    timerButton.classList.remove('hide')
    questionContainerElement.classList.remove('hide')
    codingQuiz.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()
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
    // This is where I need to do something with the high score button and also a restart button??? Look at the readme and see what it wants you to do.
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
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


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var twoMinutes = 60 * 2,
        display = document.querySelector('#time');
    startTimer(twoMinutes, display);
};