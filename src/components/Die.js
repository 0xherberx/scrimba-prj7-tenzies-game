export default function Die(props) {
    //console.log(props)
    if(props.value === 1) {
        return (
            <div
                className={`die--element die--face1 ${props.isHeld ? "die--held" : ""}`}
                onClick={props.holdDice}
            >
                <span className="dot" />
            </div>
        )
    } else if(props.value === 2) {
        return (
            <div
                className={`die--element die--face2 ${props.isHeld ? "die--held" : ""}`}
                onClick={props.holdDice}
            >              
                <span className="dot" />
                <span className="dot" />
            </div>
        )
    } else if(props.value === 3) {
        return (
            <div
                className={`die--element die--face3 ${props.isHeld ? "die--held" : ""}`}
                onClick={props.holdDice}
            >
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
            </div>
        )
    } else if(props.value === 4) {
        return (
            <div
                className={`die--element die--face4 ${props.isHeld ? "die--held" : ""}`}
                onClick={props.holdDice}
            >
                <div className="column">
                    <span className="dot" />
                    <span className="dot" />
                </div>
                <div className="column">
                    <span className="dot" />
                    <span className="dot" />
                </div>
            </div>
        )
    } else if(props.value === 5) {
        return (
            <div
                className={`die--element die--face5 ${props.isHeld ? "die--held" : ""}`}
                onClick={props.holdDice}
            >
                <div className="column">
                    <span className="dot" />
                    <span className="dot" />
                </div>
                <div className="column">
                    <span className="dot" />
                </div>
                <div className="column">
                    <span className="dot" />
                    <span className="dot" />
                </div>
            </div>
        )
    } else if(props.value === 6) {
        return (
            <div
                className={`die--element die--face6 ${props.isHeld ? "die--held" : ""}`}
                onClick={props.holdDice}
            >
                <div className="column">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                </div>
                <div className="column">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                </div>
            </div>
        )
    }    
}