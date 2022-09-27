import { name } from './streamix_package.json';
import { Component } from 'inferno';
import confetti from 'canvas-confetti';

var count = 200;
var defaults = {
  origin: { y: 1.0 }
};

function fire(confetti, particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }));
}

interface IConfettiProps {
  data: {
    singleShot: boolean,
    multiShot: boolean,
  };
}

class Confetti extends Component<IConfettiProps> {
  _canvas: HTMLCanvasElement;
  _confetti: confetti;

  componentDidMount() {
    this._confetti = confetti.create(this._canvas, { resize: true });
  }

  _shootSmall() {
    fire(this._confetti, 0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(this._confetti, 0.2, {
      spread: 60,
    });
    fire(this._confetti, 0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(this._confetti, 0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(this._confetti, 0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  componentDidUpdate(lastProps) {
    const prevData = lastProps.data;
    const data = this.props.data;

    if (data.singleShot && !prevData.singleShot) {
      this._shootSmall();
    } else if (data.multiShot && !prevData.multiShot) {
      this._shootSmall();
      for (let i = 1; i < 4; i++) {
        setTimeout(() => this._shootSmall(), 200 * i);
      }
    }
  }

  render() {
    return <canvas ref={(el) => this._canvas = el} className="Confetti"></canvas>;
  }
}


export default function Container({id, isNext, isStaged, data}) {
  return <div className="confetti-celebrate">
    {isStaged && <Confetti data={data} />}
  </div>
}
