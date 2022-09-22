
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
      //side
      sessionLength: 1,
      breakLength: 2,
      //main : session
      minLength: 0,
      secLength: 3,
      //main : break
      minLengthBreak: 2,
      secLengthBreak: 0,

      playOn: true
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handleLength = this.handleLength.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
  }

  // arrow functions don't provide their own this binding (it retains the this value of the enclosing lexical context). so this.interval point to the scope inside class - thats why its available for clearInterval()
  timer = () => {

    //  if (this.state.displayTitle === "Break") {
    //   this.interval = setInterval(() => {
    //     this.setState( state => ({
    //       secLengthBreak: state.secLengthBreak === 0
    //         ? 59 
    //         : --state.secLengthBreak,
    //       minLengthBreak: state.secLengthBreak === 59
    //         ? --state.minLengthBreak
    //         : state.minLengthBreak,
    //     }))    
    //   }, 1000);


      this.interval = setInterval(() => {
        //session
        if (this.state.displayTitle === "Session") {

          if (this.state.minLength === 0 && this.state.secLength === 0){
            this.clearTimerInterval()
            const audio = new Audio(sound)
            audio.play()
            audio.onended = () => {
              console.log("ended")
              this.interval = setInterval(() => {
                // this.setState( state => ({
                //   secLengthBreak: 0,
                //   minLengthBreak: state.minLengthBreak,
                //   displayTitle: "Break"
                // })) 

                if (this.state.secLengthBreak === 0) {
                  this.setState( state => ({
                    secLengthBreak: 59,
                    minLengthBreak: --state.minLengthBreak,
                    displayTitle: "Break"
                  }))    
        
                } else {
                  this.setState( state => ({
                    secLengthBreak: --state.secLengthBreak
                  }))  
                }
              }, 1000);
            }
  
          } else if (this.state.secLength === 0) {
            this.setState( state => ({
              secLength: 59,
              minLength: --state.minLength
            }))    
  
          } else {
            this.setState( state => ({
              secLength: --state.secLength
            }))  
          }

        // break
        } else {

          if (this.state.secLengthBreak === 0) {
            this.setState( state => ({
              secLengthBreak: 59,
              minLengthBreak: --state.minLengthBreak
            }))    
  
          } else {
            this.setState( state => ({
              secLengthBreak: --state.secLengthBreak
            }))  
          }
        }

      }, 1000);


    }


    
  clearTimerInterval = () => {
    clearInterval(this.interval)
  }

  handlePlay(){
    
      this.setState({
        iconToggle: this.state.iconToggle === "play_arrow" 
          ? "pause" : "play_arrow",
        playOn: this.state.playOn === false 
          ? true : false
      })

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
          minLengthBreak: state.breakLength,
          secLengthBreak: 0
        }))         

      } else if (tgtID.includes("increment")) {
        this.setState( state => ({
          breakLength: state.breakLength === 60
            ? 60
            : ++state.breakLength,
          minLengthBreak: state.breakLength,
          secLengthBreak: 0
        }))
      }

    // session length  
    } else if (tgtID.includes("session")) {

      if (tgtID.includes("decrement")) {
        this.setState( state => ({
          sessionLength: state.sessionLength === 1
            ? 1
            : --state.sessionLength,
          minLength: state.sessionLength,
          secLength: 0
        }))         

      } else if (tgtID.includes("increment")) {
        this.setState( state => ({
          sessionLength: state.sessionLength === 60
            ? 60
            : ++state.sessionLength,
          minLength: state.sessionLength,
          secLength: 0
        }))
      }
    }
  }

  handleRestart(){

    this.clearTimerInterval()

    this.setState( state => ({
      iconToggle: "play_arrow",
      minLength: 25,
      secLength: 0,
      playOn: true
    }))
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.secLength !== this.state.secLength){


      //  if (this.state.displayTitle === "Break") {
      //   this.setState( state => ({
      //   minLengthBreak: state.secLengthBreak === 59
      //   ? --state.minLengthBreak
      //   : state.minLengthBreak,
      //   }))

        
          // this.setState( state => ({
          //   minLength: state.secLength === 59
          //     ? --state.minLength
          //     : state.minLength
          // })) 
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
            handleRestart={this.handleRestart}
          />
        </div>
      </article>
    )
  }

}

export default App;