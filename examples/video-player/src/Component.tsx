import { name } from './streamix_package.json';

const isProd = process.env.NODE_ENV === 'production';

export default function Container({id, isNext, isStaged, data}) {
  const videoSrc = isProd
    ? `videos/${data.videoFileName}`
    : `packages/${name}/videos/${data.videoFileName}`;
  return <div className="video-player">
    {(isNext || isStaged) && <video autoPlay={isStaged} src={videoSrc} preload="metadata"></video>}
  </div>
}
