
function Letter({ letter }) {
    return (
        <li>
            <span className={letter.status}>{letter.letter}</span>
        </li>
    );
}

export default Letter;
