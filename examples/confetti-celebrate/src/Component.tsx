import { Component } from 'inferno';
import { globalRegistry, Utility } from 'component-registry';
import { componentDidAppear, componentWillDisappear } from 'inferno-animation';
import { IGraphicsEffectUtil } from 'streamix-interfaces';
import * as config from './streamix_package.json';
import './component.scss';
import confetti from 'canvas-confetti';

var count = 200;
var defaults = {
  origin: { y: 1.0 }
};
var scale = 1.75;

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
      scalar: 1.0 * scale
    });
    fire(this._confetti, 0.2, {
      spread: 60,
      scalar: 1.0 * scale
    });
    fire(this._confetti, 0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8 * scale
    });
    fire(this._confetti, 0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2 * scale
    });
    fire(this._confetti, 0.1, {
      spread: 120,
      startVelocity: 45,
      scalar: 1.0 * scale
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

@globalRegistry.register
export default class GraphicsEffectUtil extends Utility<IGraphicsEffectUtil> {
  static __implements__ = IGraphicsEffectUtil;
  static __name__ = config.name;

  static __Component__({id, name, isStaged, data}) {
    return <div className={config.name}>
      {isStaged && <Confetti data={data} />}
  </div>
  }
}
