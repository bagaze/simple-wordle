import { useState } from "react"


function WordInput({ wordLen, disabled, onSubmit }) {
    const [ word, setWord ] = useState("");

    const handleKeyDown = (e) => {
        const keyCode = e.keyCode;

        if(!(keyCode >= 65 && keyCode <= 90)
            && keyCode !== 37
            && keyCode !== 39
            && keyCode !== 13 
            && keyCode !== 8
            && keyCode !== 46) {
            e.preventDefault();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target.word_input.value.length === wordLen) {
            setWord("");
            onSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="word_input"
                type="text"
                autoComplete="off"
                value={word}
                disabled={disabled}
                onChange={(e) => setWord(e.target.value)}
                onKeyDown={handleKeyDown}
            />
         </form>
    );
}

export default WordInput;
