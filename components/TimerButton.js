const Preact = require('preact')
const h = Preact.h
const Component = Preact.Component

const dehydrate = require('../dehydrate.js')

class TimerButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      seconds: 0,
      paused: false
    }
  }

  tick () {
    if (this.state.paused) {
      return
    }
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }))
  }

  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  handleClick () {
    this.setState(prevState => ({
      paused: !this.state.paused
    }))
  }

  render () {
    return (
      h('button', {
        onClick: this.handleClick.bind(this)
      },
        (this.state.paused ? (
          'Paused'
        ) : (
          this.props.label + ': ' + this.state.seconds
        ))
      )
    )
  }
}

module.exports = dehydrate(TimerButton)
