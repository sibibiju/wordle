import { expect } from 'chai';
import { Source } from '../src/source';
import { Wordle } from './../src/wordle';
describe('Wordle', () => {
    let wordle: Wordle;
    beforeEach(async () => {
        wordle = new Wordle();
        wordle.setWord(mockSource);
    });
    
    it('should select a 5 letter random word', () => {
        expect(wordle.isWordSet()).to.equal(true);
    });

    describe('verifyWord', () => {
        it (`should only take 5 letter word as input`, () => {
            expect(wordle.verifyWord.bind(wordle, "sun")).to.throw('Invalid input');
        });
        it(`should return 1 if letter exists in the word irrespective of the position`, () => {
            let result = wordle.verifyWord('death');
            expect(result[0]).to.equal(1);
        });
        it(`should return 2 if the letters are in correct position`, () => {
            let result = wordle.verifyWord('badge');
            expect(result[2]).to.equal(2);
        });
        it(`should return 0 if the letters does not exist`, () => {
            let result = wordle.verifyWord('apple');
            expect(result[0]).to.equal(0);
        });
        it(`should return correct output for each letter`, () => {
            let expectedRes = [1, 1, 0, 0, 0];
            let result = wordle.verifyWord('death');
            expect(result).to.eql(expectedRes);
        });
    });

    const mockSource: Source = {
        getWords: () => Promise.resolve(["video"])
    }
});