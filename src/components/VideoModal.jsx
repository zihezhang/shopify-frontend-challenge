import React from "react";

function VideoModal({ link }) {
  const [play, setPlay] = React.useState(false);
  const url = play ? `${link}autoplay=1` : link;

  return (
    <div className="App">
      <iframe
        width="560"
        height="315"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button onClick={() => setPlay(true)}>Play</button>
    </div>
  );
}

export default VideoModal;
