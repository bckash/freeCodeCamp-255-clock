

function MainDisplay (props) {

    let min = props.state.minutes;
    let sec = props.state.seconds
    
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
            <audio id="beep">
                <source src={props.sound} type="audio/mpeg"/>
            </audio>
        </section>
    )
}

export default MainDisplay;

