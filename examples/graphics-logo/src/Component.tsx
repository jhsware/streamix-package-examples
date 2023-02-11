import { globalRegistry, Utility } from 'component-registry';
import { componentDidAppear, componentWillDisappear } from 'inferno-animation';
import { IGraphicsEffectUtil } from 'streamix-interfaces';
import * as config from './streamix_package.json';
import './component.scss';

function Logo({value, animation}) {
  return (
    <img class="Logo" src={`packages/${config.name}/images/StreamixLogo.png`} />
  )
}

@globalRegistry.register
export default class GraphicsEffectUtil extends Utility<IGraphicsEffectUtil> {
  static __implements__ = IGraphicsEffectUtil;
  static __name__ = config.name;

  static __Component__({id, name, isStaged, data}) {
    return <div className="graphics-logo">
      {isStaged && <Logo
        value={data}
        onComponentDidAppear={componentDidAppear}
        onComponentWillDisappear={componentWillDisappear}
        animation="Logo" />}
    </div>
  }
}
