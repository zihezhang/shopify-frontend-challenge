import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import moment from "moment";
import { getLiked, isLiked, setLiked } from "../utils/likesUtil";

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

function Feed() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [play, setPlay] = React.useState(false);
  const url = play
    ? `https://www.youtube.com/embed/tu-bgIg-Luo?autoplay=1`
    : `https://www.youtube.com/embed/tu-bgIg-Luo`;

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    const likedPosts = getLiked();
    console.log(likedPosts);
    Promise.all(
      likedPosts.map((date) =>
        fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API}&date=${date}&thumbs=true`
        )
      )
    )
      .then((res) => Promise.all(res.map((response) => response.json())))
      .then(
        (result) => {
          console.log(result);

          setIsLoaded(true);
          setItems(result.reverse());
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("ERROR");
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <FeedContainer>Error: {error.message}</FeedContainer>;
  } else if (!isLoaded) {
    return <FeedContainer>Loading...</FeedContainer>;
  } else {
    return (
      <FeedContainer>
        {items.map((item) => (
          <Post item={item} liked={isLiked(item.date)} />
        ))}

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
      </FeedContainer>
    );
  }
}

export default Feed;
