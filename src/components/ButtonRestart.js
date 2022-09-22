
function ButtonRestart (props) {

    return (
        <section className="action-button">
            <span 
                id="reset" 
                className="material-icons"
                onClick={props.handleRestart}
            >
                {props.icon}
            </span>
        </section>
    )
}

export default ButtonRestart;