const isProd = process.env.NODE_ENV === 'production';

export default function VideoPlayer({id, name, isNext, isStaged, data}) {
  name = "video-player";
  const videoSrc = isProd
    ? `videos/${data.videoFileName}`
    : `packages/${name}/videos/${data.videoFileName}`;

  return (
    <div className="video-player">
      {(isNext || isStaged) && <video autoPlay src={videoSrc} preload="metadata"></video>}
    </div>
  )
}