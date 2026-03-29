const startbutton = document.getElementById('start-btn');
const quizcontainer = document.getElementById('quiz-container');

let score = 0;
let wrongquestions = [];
let questions = [];
let index = 0;
let ans = "";

startbutton.addEventListener('click', async (event) => {
    event.preventDefault();
    startbutton.classList.add('hidebutton');

    score = 0;
    index = 0;
    wrongquestions = [];

    await loadQuestions(); 
    loadnextquestion();
});

async function loadQuestions() {
    const response = await fetch("data.json");
    const data = await response.json();
    questions = data.quiz;
}

function loadnextquestion() {
    ans = ""; 

    if (index >= questions.length) {
        displayResults();
        return;
    }

    quizcontainer.innerHTML = ""; 

    const questionElement = document.createElement('h2');
    questionElement.textContent = questions[index].question;

    const optionsElement = document.createElement('div');

    questions[index].options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionsElement.appendChild(optionElement);
    });

    optionsElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('option')) {

        optionsElement.querySelectorAll('.option')
            .forEach(opt => opt.classList.remove('selected'));

        e.target.classList.add('selected');

        ans = e.target.textContent;
    }
});

    const nextButton = document.createElement('button');
    nextButton.id = 'next-btn';
    nextButton.classList.add('next-btn');

    nextButton.textContent =
        index === questions.length - 1 ? 'Submit' : 'Next';

    nextButton.addEventListener('click', () => {
    if (!ans) {
        alert("Please select an option");
        return;
    }

    if (ans === questions[index].answer) {
        score++;
    } else {
        wrongquestions.push(questions[index]);
    }

    index++;
    loadnextquestion();
});

    quizcontainer.appendChild(questionElement);
    quizcontainer.appendChild(optionsElement);
    quizcontainer.appendChild(nextButton);
}

function displayResults() {
    quizcontainer.innerHTML = "";
    startbutton.classList.remove('hidebutton');

    const scoreElement = document.createElement('div');
    scoreElement.classList.add('score');
    scoreElement.textContent = `Your Score: ${score}/${questions.length}`;

    quizcontainer.appendChild(scoreElement);

    if (wrongquestions.length > 0) {
        const wrongElement = document.createElement('div');
        wrongElement.classList.add('wrong-questions');
        wrongElement.textContent = "Wrongly Answered Questions:";
        
        const listElement = document.createElement('div');
        wrongquestions.forEach(q => {
            const item = document.createElement('div');
            item.classList.add('wrong-item');
            const question=document.createElement('h3');
            question.textContent = q.question;
            const correctAnswer = document.createElement('p');
            correctAnswer.textContent = `Correct Answer: ${q.answer}`;
            const explaination = document.createElement('p');
            explaination.textContent = `Explanation: ${q.explanation}`;

            item.appendChild(question);
            item.appendChild(correctAnswer);
            item.appendChild(explaination);
            listElement.appendChild(item);
        });
        wrongElement.appendChild(listElement);
        quizcontainer.appendChild(wrongElement);
    }
};
       