import { useEffect, useState } from 'react';
import party from 'party-js';

import WordInput from './components/WordInput';
import './styles/App.css';
import WordTries from './components/WordTries';

import config from './data/config.json';

import { useStateWithLocalStorage } from './utils/hooks';

function App() {
    const [ finished, setFinished ] = useStateWithLocalStorage('finished', false);
    const [ success, setSuccess ] = useStateWithLocalStorage('success', false);

    const [ wordTries, setWordTries ] = useStateWithLocalStorage('wordTries', []);
    const [ numberOfLetters, setNumberOfLetters ] = useStateWithLocalStorage('numberOfLetters', 0);
    const [ dayNumber, setDayNumber ] = useStateWithLocalStorage('dayNumber', 0);

    const [ backendApiBaseUrl, setBackendApiBaseUrl ] = useState('');
    const [ numberOfTries, setNumberOfTries ] = useState(0);

    const handleSubmit = (e) => {
        const fetchTrial = async (wordInput) => {
            const resp = await fetch(`${backendApiBaseUrl}/trial`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({word: wordInput})
            });
            const trial = await resp.json();
            setWordTries([...wordTries, trial.results]);

            if (trial.status === 'ok') {
                setFinished(true);
                setSuccess(true);
                confetti(e);
            }
        }
        fetchTrial(e.target.word_input.value.toUpperCase());
    };

    useEffect( () => {
        setBackendApiBaseUrl(config.BACKEND_API_BASE_URL);
        setNumberOfTries(config.numberOfTries);
    }, []);

    useEffect( () => {
        const getConf = async () => {
            const resp = await fetch(`${backendApiBaseUrl}/conf`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const conf = await resp.json();

            if (`${conf.day_number}` !== localStorage.getItem('dayNumber')) {
                setNumberOfLetters(conf.number_of_letters);
                setDayNumber(conf.day_number);
                setWordTries([]);
            }
        }
        if (backendApiBaseUrl) {
            getConf();
        }
    }, [backendApiBaseUrl, setNumberOfLetters, setDayNumber, setWordTries]);

    useEffect( () => {
        if (numberOfTries !== 0 && wordTries.length >= numberOfTries) {
            setFinished(true);
        }
    }, [wordTries, numberOfTries, setFinished]);

    const confetti = (elem) => {
        party.confetti(elem.target);
    };

    return (
        <div className="App">
            <h1>Simple Wordle</h1>
            { !finished && (
                <>
                    <h2>Day {dayNumber}</h2>
                    <p>{numberOfLetters} letters word in {numberOfTries} tries</p>
                    <p>{numberOfTries - wordTries.length} remaining</p>
                </>
            )}
            { finished && success && <h3>Great job!</h3>}
            { finished && !success && <h3>Try again!</h3>}
            { finished && <p>Come back tomorrow for another word to find!</p>}
            <WordTries wordTries={wordTries} />
            <WordInput wordLen={numberOfLetters} disabled={finished} onSubmit={handleSubmit} />
        </div>
    );
}

export default App;
