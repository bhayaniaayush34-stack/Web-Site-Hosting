import { FaPlay } from "react-icons/fa6";

interface Props {
  Video: string;
  alt?: string;
}

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const WorkVideo = ({ Video, alt }: Props) => {
  const ytId = getYoutubeId(Video);

  return (
    <div className="work-video">
      <a
        className="work-video-in"
        href={Video}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="disable"
      >
        {ytId ? (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1`}
              title={alt || "Youtube Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              style={{ pointerEvents: "none" }}
            ></iframe>
            {/* Overlay to block iframe scroll-jacking and show play icon on hover */}
            <div className="work-video-overlay">
              <div className="play-btn-circle">
                <FaPlay className="play-icon" />
              </div>
            </div>
          </>
        ) : (
          <>
            <video src={Video} autoPlay muted playsInline loop></video>
            <div className="work-video-overlay">
              <div className="play-btn-circle">
                <FaPlay className="play-icon" />
              </div>
            </div>
          </>
        )}
      </a>
    </div>
  );
};

export default WorkVideo;
