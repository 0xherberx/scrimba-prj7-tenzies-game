export default function Die(props) {
    //console.log(props)
    return (
        <div
            className={`die--element ${props.isHeld ? "die--held" : ""}`}
            onClick={props.holdDice}
        >
            <h1 className="die-num">{props.value}</h1>
        </div>
    )
}