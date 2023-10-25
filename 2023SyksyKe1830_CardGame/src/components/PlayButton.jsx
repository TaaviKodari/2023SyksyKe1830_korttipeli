export default function PlayButton({text, handleClick}){
    return(
        <button onClick={handleClick} className="play-button" type="button">{text}</button>
    );
}