import Letter from "../components/Letter";

function WordTry({ wordTry }) {
    const letters = wordTry.map( (letter, letterIndex) => (
        <Letter key={letterIndex} letter={letter} />
    ));

    return (
        <ul>
            {letters}
        </ul>
    );
}

export default WordTry;
