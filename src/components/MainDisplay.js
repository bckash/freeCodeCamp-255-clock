
function MainDisplay (props) {

    

    let min; let sec;

    if (props.state.displayTitle === "Session"){
        min = props.state.minLength;
        sec = props.state.secLength

    } else {
        min = props.state.minLengthBreak;
        sec = props.state.secLengthBreak
    }

    return (
        <section id="main-display-container">
            <div id="time-left">
                {min < 10 ? "0"+ min : min}
                        :
                {sec < 10 ? "0"+ sec : sec}
            </div>
            <div id="timer-label">
                {props.state.displayTitle}
            </div>       
        </section>
    )
}

export default MainDisplay;

