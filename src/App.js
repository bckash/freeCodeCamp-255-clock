
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
      iconToggle: "play_arrow"
    }
    this.handlePlay = this.handlePlay.bind(this)
  }

  handlePlay(){
      this.setState({
        iconToggle: this.state.iconToggle === "play_arrow" 
          ? "pause" : "play_arrow",
        
      }, console.log(this.state.iconToggle))
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
          length={5}
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
          length={25}
        />
        <div id="button-container">
          <ButtonPlay 
            state={this.state}
            changeIcon={this.handlePlay}
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