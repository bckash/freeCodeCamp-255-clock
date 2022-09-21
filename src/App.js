
import React from 'react'
import SideControls from "./components/SideControl";
import MainDisplay from "./components/MainDisplay";
import ButtonRestart from './components/ButtonRestart';
import ButtonPlay from './components/ButtonPlay';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayTitle: "Session",
      iconToggle: "play_arrow",
      sessionLength: 25,
      breakLength: 5,
      secLength: 0
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handleLength = this.handleLength.bind(this)
  }

  handlePlay(){
      this.setState({
        iconToggle: this.state.iconToggle === "play_arrow" 
          ? "pause" : "play_arrow",
        
      }, console.log(this.state.iconToggle))
  }

  handleLength(e){

    let tgtID = e.target.id;
    
    // break lentgh
    if (tgtID.includes("break")) {

      if (tgtID.includes("decrement")) {
        this.setState( state => ({
          breakLength: state.breakLength === 1
            ? 1
            : --state.breakLength
        }))         

      } else if (tgtID.includes("increment")) {
        this.setState( state => ({
          breakLength: state.breakLength === 60
            ? 60
            : ++state.breakLength
        }))
      }

    // session length  
    } else if (tgtID.includes("session")) {

      if (tgtID.includes("decrement")) {
        this.setState( state => ({
          sessionLength: state.sessionLength === 1
            ? 1
            : --state.sessionLength
        }))         

      } else if (tgtID.includes("increment")) {
        this.setState( state => ({
          sessionLength: state.sessionLength === 60
            ? 60
            : ++state.sessionLength
        }))
      }
    }
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
          />
        </div>
      </article>
    )
  }

}

export default App;