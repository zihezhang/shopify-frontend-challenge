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

function HomeFeed({ toggleToastActive }) {
  const todayDate = new Date();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const start = moment(todayDate).subtract(7, "days").format("YYYY-MM-DD");
    const end = moment(todayDate).format("YYYY-MM-DD");
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API}&start_date=${start}&end_date=${end}&thumbs=true`
    )
      .then((res) => res.json())
      .then(
        (result) => {
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
        {items.map((item) => (
          <Post
            item={item}
            liked={isLiked(item.date)}
            toggleToastActive={toggleToastActive}
          />
        ))}
      </FeedContainer>
    );
  }
}

export default HomeFeed;
