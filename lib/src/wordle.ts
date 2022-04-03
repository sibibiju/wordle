import { Source } from "./source";
 
export class Wordle {
    private _word: string = '';
    private _totalAttempts: number = 0;
    private _currentAttempts: number = 0;
    private _isGameOver: boolean = false;

    constructor(totalAttempts: number = 100) {
        this._totalAttempts = totalAttempts;
    }

    async setWord(source: Source) {
        let words = await source.getWords();
        let idx = Math.floor(words.length * Math.random());
        this._word = words[idx];
    }

    displayWord(): string {
        return this._word;
    }

    isWordSet() {
        return this._word !== '';
    }

    isGameOver() {
        return this._isGameOver;
    }

    verifyWord(userInput: string): Array<number> {
        if (userInput.length !== 5) throw new Error('Invalid input');
        if (this.isGameOver()) throw new Error('Game Over');
        let result = [];
        let word = this._word;
        for (let i = 0; i < userInput.length; i++) {
            let char = userInput.charAt(i);
            let idx = word.indexOf(char);

            if (idx !== -1) {
                if (idx === i) result.push(2);
                else result.push(1);
                let wordArr = word.split('');
                wordArr.splice(idx, 1, '_');
                word = wordArr.join('');
            } else {
                result.push(0);
            }
        }
        this.checkGameStatus(result);
        return result;
    }

    private checkGameStatus(result: number[]) {
        this._isGameOver = result.every((num) => num === 2);
    }
}