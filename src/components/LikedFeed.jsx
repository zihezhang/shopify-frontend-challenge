import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import { Spinner } from "@shopify/polaris";
import { getLiked, isLiked } from "../utils/likesUtil";

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

function LikedFeed({ toggleToastActive }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [play, setPlay] = React.useState(false);
  const url = play
    ? `https://www.youtube.com/embed/tu-bgIg-Luo?autoplay=1`
    : `https://www.youtube.com/embed/tu-bgIg-Luo`;

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
    return (
      <FeedContainer>
        <Spinner accessibilityLabel="Spinner example" size="large" />
        Loading...
      </FeedContainer>
    );
  } else {
    return (
      <FeedContainer>
        {items.length !== 0 ? (
          items.map((item) => (
            <Post
              item={item}
              liked={isLiked(item.date)}
              toggleToastActive={toggleToastActive}
            />
          ))
        ) : (
          <p>No posts liked :(</p>
        )}
      </FeedContainer>
    );
  }
}

export default LikedFeed;
