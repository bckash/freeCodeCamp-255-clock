
function MainDisplay (props) {
    return (
        <section id="main-display-container">
            <div id="time-left">
                25:00
            </div>
            <div id="timer-label">
                {props.state.displayTitle}
            </div>       
        </section>
    )
}

export default MainDisplay;