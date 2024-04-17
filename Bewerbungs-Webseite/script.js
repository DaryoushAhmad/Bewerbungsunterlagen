const questions = [
    {
        question: 'Welche Schule habe ich besucht?',
        answers: [
            { Text: 'Coppernicus-Gymnasium', correct: true },
            { Text: 'Harksheide-Gymnasium', correct: false },
            { Text: 'Lessing-Gymnasium', correct: false },
            { Text: 'Heidberg-Gymnasium', correct: false },
        ]
    },
    {
        question: 'Was sind meine Muttersprachen?',
        answers: [
            { Text: 'Kurdisch und Arabisch', correct: false },
            { Text: 'Deutsch und Arabisch', correct: false },
            { Text: 'Kurdisch und Deutsch', correct: true },
            { Text: 'Englisch und Arabisch', correct: false },
        ]
    },
    {
        question: 'In welchen Programmiersprachen habe ich Erfahrung?',
        answers: [
            { Text: 'CSS, HTML, Java', correct: false },
            { Text: 'CSS, HTML, JavaScript', correct: true },
            { Text: 'Python, HTML, CSS', correct: false },
            { Text: 'Gar keine', correct: false },
        ]
    },
    {
        question: 'Wie heiße ich?',
        answers: [
            { Text: 'Damian', correct: false },
            { Text: 'Dennis', correct: false },
            { Text: 'Dario', correct: false },
            { Text: 'Daryoush', correct: true },
        ]
    },
    {
        question: 'Wie wahrscheinlich ist es, dass sie mich einstellen?',
        answers: [
            { Text: 'Ja!', correct: true },
            { Text: 'Eher unwahrscheinlich', correct: false },
            { Text: 'Wahrscheinlich', correct: false },
            { Text: 'Nein', correct: false },
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.Text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            questionElement.innerHTML = 'Fertig! Du hast ' + score + '/' + questions.length + 'richtig beantwortet';
            nextButton.style.display = 'none';
        }
    });
}

startQuiz();