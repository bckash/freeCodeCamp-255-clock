
import React from 'react'
import SideControls from "./components/SideControl";
import MainDisplay from "./components/MainDisplay";
import ButtonRestart from './components/ButtonRestart';
import ButtonPlay from './components/ButtonPlay';
import sound from "./audio/ding.mp3"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayTitle: "Session",
      iconToggle: "play_arrow",
      sessionLength: 25,
      breakLength: 5,

      minutes: 25,
      seconds: 0,
      playOn: true
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handleLength = this.handleLength.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
  }

  // arrow functions don't provide their own this binding (it retains the this value of the enclosing lexical context). so this.interval point to the scope inside class - thats why its available for clearInterval()
  timer = () => {
      this.interval = setInterval(() => {
        // bridge 
        let seconds = this.state.seconds
        let minutes = this.state.minutes
        if (seconds===0 && minutes===0) {
          this.clearTimerInterval()
          const audio = document.getElementById("beep")
          audio.play()
            if (this.state.displayTitle==="Session") {
              this.setState( state => ({
                seconds: 0,
                minutes: state.breakLength,
                displayTitle: "Break"
              }))
            } else {
              this.setState( state => ({
                seconds: 0,
                minutes: state.sessionLength,
                displayTitle: "Session"
              }))
            }
            this.timer()
        // default
        } else {
          if (seconds===0) {
            this.setState( state => ({
              seconds: 59,
              minutes: --state.minutes
            }))
          } else {
            this.setState( state => ({
              seconds: --state.seconds,
              minutes: state.minutes
            }))
          }
        }


      }, 1000);
    }

  clearTimerInterval = () => {
    clearInterval(this.interval)
  }

  handlePlay(){
    
      this.setState( state => ({
        iconToggle: state.iconToggle === "play_arrow" 
          ? "pause" : "play_arrow",
        playOn: state.playOn === false 
          ? true : false
      }))

        this.state.playOn 
          ? this.timer() 
          : this.clearTimerInterval()
  }

  handleLength(e){

    let tgtID = e.target.id;
    
    // break lentgh
    if (tgtID.includes("break")) {

      if (tgtID.includes("decrement")) {
        this.setState( state => ({
          breakLength: state.breakLength === 1
            ? 1
            : --state.breakLength,
          minutes: state.displayTitle==="Break"
            ? state.breakLength : state.minutes,
          seconds: state.displayTitle==="Break"
          ? 0 : state.seconds,
        }))         

      } else if (tgtID.includes("increment")) {
        this.setState( state => ({
          breakLength: state.breakLength === 60
            ? 60
            : ++state.breakLength,
          minutes: state.displayTitle==="Break"
          ? state.breakLength : state.minutes,
          seconds: state.displayTitle==="Break"
          ? 0 : state.seconds,
        }))
      }

    // session length  
    } else if (tgtID.includes("session")) {

      if (tgtID.includes("decrement")) {
        this.setState( state => ({
          sessionLength: state.sessionLength === 1
            ? 1
            : --state.sessionLength,
          minutes: state.displayTitle==="Session"
          ? state.sessionLength : state.minutes,
          seconds: state.displayTitle==="Session"
          ? 0 : state.seconds,
        }))         

      } else if (tgtID.includes("increment")) {
        this.setState( state => ({
          sessionLength: state.sessionLength === 60
            ? 60
            : ++state.sessionLength,
          minutes: state.displayTitle==="Session"
          ? state.sessionLength : state.minutes,
          seconds: state.displayTitle==="Session"
          ? 0 : state.seconds,
        }))
      }
    }
  }

  handleRestart(){

    this.clearTimerInterval()

    const audio = document.getElementById("beep")
    audio.pause()
    audio.load()

    this.setState({
      iconToggle: "play_arrow",
      minutes: 25,
      seconds: 0,
      playOn: true,
      displayTitle: "Session",
      breakLength: 5,
      sessionLength: 25
    })
  }

  render(){
    return(
      <article id="clock-container">
        <SideControls 
          head={"Break Length"} 
          idLabel={"break-label"}
          idDecrement={"break-decrement"}
          idIncrement={"break-increment"}
          idLength={"break-length"}
          state={this.state}
          handleLength={this.handleLength}
        />
        <MainDisplay
          state={this.state}
          sound={sound}
        />
        <SideControls 
          head={"Session Length"} 
          idLabel={"session-label"}
          idDecrement={"session-decrement"}
          idIncrement={"session-increment"}
          idLength={"session-length"}
          state={this.state}
          handleLength={this.handleLength}
        />
        <div id="button-container">
          <ButtonPlay 
            state={this.state}
            handlePlay={this.handlePlay}
          />
          <ButtonRestart 
            state={this.state} 
            icon={"restart_alt"}
            handleRestart={this.handleRestart}
          />
        </div>
      </article>
    )
  }
}

export default App;