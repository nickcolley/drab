import TimerButton from '../components/TimerButton.js'

export default () => {
  return (
    <div>
      <a href='/'>Home</a>
      <br />
      <TimerButton label='test' randomProp={Math.random()} />
      <TimerButton label='test-two' />
    </div>
  )
}
