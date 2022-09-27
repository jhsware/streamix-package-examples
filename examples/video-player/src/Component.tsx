import { name } from './streamix_package.json';

export default function Container({id, isNext, isStaged, data}) {
  return <div className="video-player">
    {(isNext || isStaged) && <video autoPlay={isStaged} src={`videos/${data.videoFileName}`} preload="metadata"></video>}
  </div>
}
