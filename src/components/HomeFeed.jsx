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
  const days = 86400000;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  console.log(todayDate.getMonth() + 1);
  const [{ month, year }, setDate] = useState({
    month: { ...todayDate.getMonth() },
    year: todayDate.getFullYear(),
  });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(todayDate - 5 * days),
    end: todayDate,
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  const [play, setPlay] = React.useState(false);
  const url = play
    ? `https://www.youtube.com/embed/tu-bgIg-Luo?autoplay=1`
    : `https://www.youtube.com/embed/tu-bgIg-Luo`;

  useEffect(() => {
    const start = moment(todayDate).subtract(7, "days").format("YYYY-MM-DD");
    const end = moment(todayDate).format("YYYY-MM-DD");
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API}&start_date=${start}&end_date=${end}&thumbs=true`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result, selectedDates);

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
