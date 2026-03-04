const actionNumbers = document.querySelectorAll('.action-buttons button');
const askContainer = document.querySelector('.asks-list');
const questionButtons = document.querySelectorAll('.question-list button');
const animationCorrect = document.querySelector('.correct');
const animationIncorrect = document.querySelector('.incorrect');
const correctAnswer = document.querySelector('.answer');
const cover = document.querySelector('.default-container');
const question = document.querySelector('.question-list');
const contentName = document.querySelector('.content-name');


let manufacturerFirst;
let manufacturerSecond;
let failedCouner = 0;

for(let i = 0; i < actionNumbers.length; i++) {
    const action = actionNumbers[i];
    action.addEventListener('click', (ev)=> {
        ev.stopPropagation();
        removeClasslist();
        hideAnimation();
        action.classList.add('f_action_focus');
        document.querySelector('.multiple-area').classList.remove('hidden');
        contentName.classList.remove('hidden');
        contentName.innerHTML = `${i + 2}-ի բազմապատկման աղյուսակ`;
        manufacturerFirst = i + 2;
        question.innerHTML = '';
        cover.classList.add('hidden');
        addAskButtons(i);
    }, false)
}

function removeClasslist() {
    actionNumbers.forEach((element) => {
        element.className = '';
    })
}

function addAskButtons(i) {
    askContainer.innerHTML = '';
    for(let j = 0; j < 9; j++) {
        let timer = setTimeout(function() {
            const button = document.createElement('button');
            button.innerHTML = `${i + 2} x ${j + 1} = `;
            askContainer.appendChild(button);

            button.addEventListener('click', (ev)=> {
                setQuestions(button);
                ev.stopPropagation();
                manufacturerSecond = j + 1;
                contentName.innerHTML = `${i + 2} x ${j + 1} = `;
                question.style.display = "block";
                button.classList.add('f_ask_focus');
                hideAnimation();
            }, false)

            if(j=== 8) {
                clearTimeout(timer);
            }
        }, j * 20)
    }
}

function hideAnimation() {
    animationCorrect.classList.add('hidden');
    animationIncorrect.classList.add('hidden');
    correctAnswer.classList.add('hidden');
}

function setQuestions(button) {
    question.innerHTML = '';
    for(let j = 0; j < 81; j++) {
        setQuestionsTimeout(j, button);
    }
}

function setQuestionsTimeout(index, askButton) {
    let timer = setTimeout(function() {
        let answer = index + 1;
        
        const button =  document.createElement('button');
        button.innerHTML = answer;
        question.appendChild(button);

        button.addEventListener('click', (ev)=> {
            ev.stopPropagation();
            question.style.display = "none";

            if (manufacturerFirst * manufacturerSecond === answer) {
                animationCorrect.classList.remove('hidden');
                askButton.innerHTML = `${manufacturerFirst} x ${manufacturerSecond} = ${answer}`
                playCorrectAnswer();
    
            } else if(failedCouner >= 2) {
                correctAnswer.classList.remove('hidden');
                document.querySelector('.correct-answer').innerHTML= `Ճիշտ պատասխանն է <b>${manufacturerFirst * manufacturerSecond}</b>`;
                failedCouner = 0;
            } else {
                animationIncorrect.classList.remove('hidden');
                playIncorrectAnswer();
                failedCouner++;
            }
        }, false)

        if(index === 80) {
            clearTimeout(timer);
        }

    }, index * 10);
  }



function playCorrectAnswer() {
    let audio = new Audio('audio/correct.wav');
    audio.play();
}

function playIncorrectAnswer() {
    let audio = new Audio('audio/incorrect.wav');
    audio.play();
}


