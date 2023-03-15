import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    time: 25,
    seconds: 0,
    isBtnExist: false,
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  componentWillUnmount = () => this.clearTimeInterval()

  increaseTimeBy1 = () => {
    this.setState(prevState => ({
      time: prevState.time + 1,
    }))
  }

  decreaseTimeBy1 = () => {
    const {time} = this.state
    if (time > 1) {
      this.setState(prevState => ({
        time: prevState.time - 1,
      }))
    }
  }

  increaseTimeInterval = () => {
    const {time, seconds} = this.state
    const isTimeUp = seconds === time * 60
    if (isTimeUp) {
      this.clearTimeInterval()
      this.setState({
        isBtnExist: false,
      })
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  onplayPause = () => {
    const {time, seconds, isBtnExist} = this.state
    const isTimeUp = seconds === time * 60

    if (isTimeUp) {
      this.setState({
        seconds: 0,
      })
    }
    if (isBtnExist) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.increaseTimeInterval, 1000)
    }

    this.setState(prevState => ({
      isBtnExist: !prevState.isBtnExist,
    }))
  }

  onReset = () => {
    this.clearTimeInterval()
    this.setState({
      time: 25,
      seconds: 0,
      isBtnExist: false,
    })
  }

  timeInGivenFormate = () => {
    const {time, seconds} = this.state
    const remainingTimeInSec = time * 60 - seconds

    const minutes = Math.floor(remainingTimeInSec / 60)
    const remSecond = Math.floor(remainingTimeInSec % 60)
    const minutesInStr = minutes > 9 ? minutes : `0${minutes}`
    const secondsInStr = remSecond > 9 ? remSecond : `0${remSecond}`
    return `${minutesInStr}:${secondsInStr}`
  }

  render() {
    const {time, isBtnExist, seconds} = this.state
    const disableBtn = seconds > 0

    let btnText
    let btnIcon
    let timerStatus
    let iconAlt

    if (isBtnExist) {
      btnText = 'Pause'
      btnIcon = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      iconAlt = 'pause icon'
      timerStatus = 'Running'
    } else {
      btnText = 'Start'
      btnIcon = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      iconAlt = 'play icon'
      timerStatus = 'Paused'
    }

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="flex-container">
          <div className="time-container">
            <div className="bg-img">
              <div className="bg-time">
                <h1 className="time">{this.timeInGivenFormate()}</h1>
                <p className="paused-running">{timerStatus}</p>
              </div>
            </div>
          </div>
          <div className="options-container">
            <div className="pause-reset">
              <div className="start-container">
                <button
                  onClick={this.onplayPause}
                  type="button"
                  className="button start-container"
                >
                  <img src={btnIcon} alt={iconAlt} className="icon" />
                  <p className="start">{btnText}</p>
                </button>
              </div>
              <div className="start-container">
                <button
                  onClick={this.onReset}
                  type="button"
                  className="start-container button"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                  <p className="start restart">Reset</p>
                </button>
              </div>
            </div>
            <p className="description">Set Timer limit</p>
            <div className="buttons-container">
              <button
                disabled={disableBtn}
                onClick={this.decreaseTimeBy1}
                type="button"
                className="button"
              >
                -
              </button>
              <p className="set-time">{time}</p>
              <button
                disabled={disableBtn}
                onClick={this.increaseTimeBy1}
                className="button"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
