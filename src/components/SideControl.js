

function SideControls (props) {
    return (
        <section id="side-control-container">

            <header id={props.idLabel}>
                {props.head}
            </header>

            <div id={props.idIncrement}>
                <span className="material-symbols-outlined chevron">
                    expand_less
                </span>
            </div>

            <div id={props.idLength}>
                {props.length}
            </div>

            <div id={props.idDecrement}>
                <span className="material-symbols-outlined chevron">
                    expand_more
                </span>
            </div>

        </section>
    )
}

export default SideControls;