
function ButtonPlay (props) {

    return (
        <section className="action-button">
               <span 
                    id="start_stop"
                    className={props.state.iconToggle === "play_arrow"
                        ? "material-symbols-outlined"
                        : "material-icons"}
                    onClick={props.handlePlay}
                >
                    {props.state.iconToggle}
                </span>                    
        </section>
    )
}

export default ButtonPlay;