
function MainDisplay (props) {
    return (
        <section id="main-display-container">
            <div id="time-left">
                {props.state.sessionLength < 10 
                    ? "0"+ props.state.sessionLength
                    : props.state.sessionLength}:00
            </div>
            <div id="timer-label">
                {props.state.displayTitle}
            </div>       
        </section>
    )
}

export default MainDisplay;

