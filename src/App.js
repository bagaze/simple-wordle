import { useEffect, useState } from 'react';
import party from 'party-js';

import WordInput from './components/WordInput';
import './styles/App.css';
import WordTries from './components/WordTries';

import conf from './data/conf.json';

function App() {
    const [ wordTries, setWordTries ] = useState([]);
    const [ tryCount, setTryCount ] = useState(0);
    const [ finished, setFinished ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    const wordToFind = conf.wordToFind.toUpperCase();
    const numberOfTries = conf.numberOfTries;

    const generateWordTry = (wordInput) => {
        let wToFind = wordToFind.split('');
        let wordTry = [];

        wordInput.split('').forEach( (letter, index) => {
            if (letter === wordToFind[index]) {
                wordTry.push({letter: letter, status: 'ok'});
                wToFind[index] = ''
            } else {
                wordTry.push({letter: letter, status: 'ko'});
            }
        });

        wordTry.filter( ({_, status}) => status === 'ko' ).forEach( (letterWithStatus) => {
            const letterIsPresentIdx = wToFind.indexOf(letterWithStatus.letter);
            if (letterIsPresentIdx !== -1) {
                letterWithStatus.status = 'present';
                wToFind[letterIsPresentIdx] = '';
            }
        });

        return wordTry;
    };

    const handleSubmit = (e) => {
        const wordInput = e.target.word_input.value.toUpperCase();

        setWordTries([...wordTries, generateWordTry(wordInput)]);
        setTryCount(tryCount + 1);

        if (wordInput === wordToFind) {
            setFinished(true);
            setSuccess(true);
            confetti(e);
        }
    };

    useEffect( () => {
        if (wordTries.length >= numberOfTries) {
            setFinished(true);
        }
    }, [wordTries, numberOfTries]);

    const confetti = (elem) => {
        party.confetti(elem.target);
    };

    return (
        <div className="App">
            <h1>Simple Wordle</h1>
            { !finished && (
                <>
                    <h3>{wordToFind.length} letters word in {numberOfTries} tries</h3>
                    <h6>{numberOfTries - wordTries.length} remaining</h6>
                </>
            )}
            { finished && success && <h3>Great job!</h3>}
            { finished && !success && <h3>Try again!</h3>}
            <WordTries wordTries={wordTries} wordToFind={wordToFind} />
            <WordInput wordLen={wordToFind.length} disabled={finished} onSubmit={handleSubmit} />
        </div>
    );
}

export default App;
