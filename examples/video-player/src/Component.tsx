import { globalRegistry, Utility } from 'component-registry';
import { IGraphicsEffectUtil } from 'streamix-interfaces';
import * as config from './streamix_package.json';
import './component.scss';

@globalRegistry.register
export default class GraphicsEffectUtil extends Utility<IGraphicsEffectUtil> {
  static __implements__ = IGraphicsEffectUtil;
  static __name__ = config.name;

  static __Component__({id, name, isNext, isStaged, data}) {
    const videoSrc = `packages/${config.name}/videos/${data.videoFileName}`;
  
    return (
      <div className={config.name}>
        {(isNext || isStaged) && <div className="video-container">
          <video autoPlay src={videoSrc} preload="metadata"></video>
        </div>}
      </div>
    )
  }
}
