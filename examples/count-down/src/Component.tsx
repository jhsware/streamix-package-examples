import { Component } from 'inferno';
import { componentDidAppear, componentWillDisappear } from 'inferno-animation';
import { name } from './streamix_package.json';

const isProd = process.env.NODE_ENV === 'production';

interface ICounterProps {
  targetTime: string;
  title?: string;
}

function _pad(n) {
  const str = `${n}`;
  return str.toString().padStart(2, '0');
}

class Counter extends Component<ICounterProps> {
  _timer?: any;
  state = {
    timeLeft: "23:59:59"
  }

  constructor(props) {
    super(props);
    this._tick = this._tick.bind(this);
  }

  componentDidMount(): void {
    this._timer = setInterval(this._tick, 100);
  }
  
  componentWillUnmount(): void {
    if (this._timer) {
      clearInterval(this._timer);
    }
  }
  
  _tick() {
    const now = new Date();
    const [th, tm, ts] = this.props.targetTime.split(':').map(i => parseInt(i));
    let target = new Date(now);
    target.setHours(th);
    target.setMinutes(tm);
    target.setSeconds(ts);

    // Allow us to set a target time past midnight
    // Limit to 23 hours in advance
    if ((target.getTime() - now.getTime()) / 1000 < -3600) {
      target = new Date(target.getTime() + (24 * 60 * 60 * 1000));
    }

    const diffInSecs = (target.getTime() - now.getTime()) / 1000;
    if (diffInSecs <= 0) {
      return this.setState({
        timeLeft: "00:00:00"
      })
    }

    const HH = Math.floor(diffInSecs / 3600);
    const mm = Math.floor((diffInSecs - HH * 3600) / 60);
    const ss = diffInSecs % 60;

    if (isNaN(HH) || isNaN(mm) || isNaN(ss)) {
      return this.setState({
        timeLeft: "--:--:--"
      });
    }

    const timeLeft = `${_pad(HH)}:${_pad(mm)}:${_pad(ss)}`;

    if (timeLeft === this.state.timeLeft) {
      return;
    }

    this.setState({
      timeLeft
    });
  }

  render({ title = "" }) {
    const tmp = this.state.timeLeft.split('');
    return (
      <div className="Background">
        <div className="clock">{
          tmp.map((n, index) => <Digit
            onComponentDidAppear={componentDidAppear}
            onComponentWillDisappear={componentWillDisappear}
            animation="DigitAnim"
            key={`${index}-${n}`}>{n}</Digit>)
        }</div>
      </div>
    );
  }
}

function Digit({ children, ...other }) {
  return <i className="digit">{children}</i>
}

export default function Container({id, isNext, isStaged, data}) {
  const { targetTime, title } = data;

  return <div className={name}>
    {isStaged && title && <div className="title">{title}</div>}
    {isStaged && <Counter targetTime={targetTime} title={title} />}
  </div>
}
