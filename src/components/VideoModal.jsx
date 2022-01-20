import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import moment from "moment";
import { Spinner } from "@shopify/polaris";
import { isLiked } from "../utils/likesUtil";

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 769px) {
    margin: auto;
  }
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

function VideoModal({ link }) {
  const [play, setPlay] = React.useState(false);
  const url = play
    ? `https://www.youtube.com/embed/tu-bgIg-Luo?autoplay=1`
    : `https://www.youtube.com/embed/tu-bgIg-Luo`;

  {
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
}

export default VideoModal;
