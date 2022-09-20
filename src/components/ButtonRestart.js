
function ButtonRestart (props) {

    return (
        <section className="action-button">
            <span id="reset" className="material-icons">
                {props.icon}
            </span>
        </section>
    )
}

export default ButtonRestart;