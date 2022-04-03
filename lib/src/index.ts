import { List } from './list';
import { Wordle } from './wordle';
let wordle: Wordle;

let reset = document.getElementById("reset");
reset?.addEventListener('click', initialize);

function initialize() {
    wordle = new Wordle;
    toggleGameOverText('hidden');
    resetHtmlElements();
    wordle.setWord(new List()).then(() => {
        let usrInput = document.getElementById("user-input");
        if (usrInput) {
            usrInput.addEventListener('keyup', verifyWord);
            usrInput.focus();
        }
    });
}

function verifyWord(obj: any) {
    if (obj.keyCode == 13) {
        const result = wordle.verifyWord(obj.target.value);
        const output = document.getElementById("output");
        if (output) {
            output.innerHTML = format(obj.target.value, result) + '<br>' + output.innerHTML;
            obj.target.value = '';
        }

        if (wordle.isGameOver()) {
            toggleGameOverText('visible');
        }
    }
}

function toggleGameOverText(visibility : 'visible' | 'hidden') {
    let element = document.getElementById("game-over");
    if (element) {
        element.style.visibility = visibility;
    }
}

function format(word: string, result: Array<number>) {
    return word.split('').map((letter, i) => {
        let color = (result[i] === 2) ? 'green' : (result[i] === 1 ? 'yellow' : 'gray');
        return `<span style="color: ${color}">${letter}</span>`
    }).join('');
}

function resetHtmlElements() {
    let usrInput = document.getElementById("user-input");
    let output = document.getElementById("output");
    if (usrInput) {
        usrInput.innerHTML = '';
    }

    if (output) {
        output.innerHTML = '';
    }
}

initialize();

