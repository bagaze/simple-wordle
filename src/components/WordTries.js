import WordTry from "../components/WordTry";


function WordTries({ wordTries }) {
    const listTries = wordTries.map(
        (wordTry, wordIndex) => (
            <WordTry key={wordIndex} wordTry={wordTry} />
        )
    );

    return (
        <div>
            {listTries}
        </div>
    );
}

export default WordTries;