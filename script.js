let beginButton = document.querySelector('.begin-button');
let welcomeContainer = document.querySelector('.welcome-container');
let gameContainer = document.querySelector('.game-container');
let resultContainer = document.querySelector('.result-container');
let retryButton = document.querySelector('.retry-button');
let homeButton = document.querySelector('.home-button');
let currentIndex = 0;
let totalScore = 0;

let quizQuestions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        option1: '<script>',
        option2: '<css>',
        option3: '<style>',
        option4: '<span>',
        correctOption: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        option1: 'text-color',
        option2: 'font-color',
        option3: 'text-style',
        option4: 'color',
        correctOption: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        option1: '// Comment',
        option2: '<!-- Comment -->',
        option3: '/* Comment */',
        option4: '<! Comment>',
        correctOption: 2,
    },
];

let questionNumberElement = document.querySelector('.current-question');
let scoreElement = document.querySelector('.current-score');
let finalScoreElement = document.querySelector('.total-score');

beginButton.addEventListener('click', initiateQuiz);
retryButton.addEventListener('click', initiateQuiz);
homeButton.addEventListener('click', () => {
    resultContainer.style.display = 'none';
    welcomeContainer.style.display = 'flex';
});

function initiateQuiz() {
    welcomeContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
    resultContainer.style.display = 'none';

    currentIndex = 0;
    totalScore = 0;
    updateQuestionNumber();
    updateScore();

    const questionContainers = document.getElementsByClassName('question-container');
    for (let i = 0; i < questionContainers.length; i++) {
        questionContainers[i].style.display = 'none';
        let options = questionContainers[i].getElementsByClassName('option');
        for (let j = 0; j < options.length; j++) {
            options[j].style.backgroundColor = '';
        }
    }

    if (questionContainers.length > 0) {
        questionContainers[0].style.display = 'block';
    }
}

function updateQuestionNumber() {
    questionNumberElement.textContent = `Question: ${currentIndex + 1}`;
}

function updateScore() {
    scoreElement.textContent = `Score: ${totalScore}`;
}

quizQuestions.forEach((q, index) => {
    let questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    questionContainer.style.display = index === 0 ? 'block' : 'none';

    let question = document.createElement('div');
    question.className = 'question';
    question.textContent = q.question;
    questionContainer.appendChild(question);

    let optionsContainer = document.createElement('div');
    optionsContainer.className = 'option-container';

    for (let i = 1; i <= 4; i++) {
        let option = document.createElement('div');
        option.className = 'option';

        let optionNumber = document.createElement('span');
        optionNumber.className = 'option-number';
        optionNumber.textContent = String.fromCharCode(64 + i);

        let optionText = document.createElement('div');
        optionText.className = 'option-text';
        optionText.textContent = q['option' + i];

        option.appendChild(optionNumber);
        option.appendChild(optionText);

        option.addEventListener('click', function() {
            if (i === q.correctOption) {
                option.style.setProperty('background-color', 'green', 'important');
                totalScore += 10;
                updateScore();
            } else {
                option.style.setProperty('background-color', 'red', 'important');
            }

            setTimeout(function() {
                questionContainer.style.display = 'none';

                if (index < quizQuestions.length - 1) {
                    currentIndex++;
                    updateQuestionNumber();
                    document.getElementsByClassName('question-container')[index + 1].style.display = 'block';
                } else {
                    gameContainer.style.display = 'none';
                    resultContainer.style.display = 'flex';
                    finalScoreElement.textContent = `Final Score: ${totalScore}`;
                }
            }, 800);
        });

        optionsContainer.appendChild(option);
    }

    questionContainer.appendChild(optionsContainer);

    gameContainer.appendChild(questionContainer);
});
