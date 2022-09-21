

function SideControls (props) {
    return (
        <section id="side-control-container">

            <header id={props.idLabel}>
                {props.head}
            </header>

            <div>
                <span 
                    id={props.idIncrement} className="material-symbols-outlined chevron"
                    onClick={props.handleLength}
                >
                    expand_less
                </span>
            </div>

            <div id={props.idLength}>
                {
                props.idLabel.includes("session") 
                    ? props.state.sessionLength
                    : props.state.breakLength
                }
            </div>

            <div>
                <span 
                    id={props.idDecrement}className="material-symbols-outlined chevron"
                    onClick={props.handleLength}
                >
                    expand_more
                </span>
            </div>

        </section>
    )
}

export default SideControls;