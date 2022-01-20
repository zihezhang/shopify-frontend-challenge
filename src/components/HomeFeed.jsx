import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Post from "./Post";
import moment from "moment";
import { Spinner } from "@shopify/polaris";
import { isLiked } from "../utils/likesUtil";
import useFetch from "../hooks/useFetch";

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
  const endDate = moment(todayDate).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(
    moment(todayDate).subtract(14, "days").format("YYYY-MM-DD")
  );
  const { loading, error, list } = useFetch(startDate, endDate);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      console.log("subtract");
      setStartDate((prev) =>
        moment(prev).subtract(7, "days").format("YYYY-MM-DD")
      );
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "10px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  if (error) {
    return <FeedContainer>Error: {error.message}</FeedContainer>;
  } else if (loading) {
    return (
      <FeedContainer>
        <Spinner accessibilityLabel="Spinner example" size="large" />
        Loading...
      </FeedContainer>
    );
  } else {
    return (
      <FeedContainer>
        {list.map((item) => (
          <Post
            item={item}
            liked={isLiked(item.date)}
            toggleToastActive={toggleToastActive}
            key={item.date}
          />
        ))}
        <p>You've viewed all the recent posts, come back later for more!</p>
        <div ref={loader} />
      </FeedContainer>
    );
  }
}

export default HomeFeed;
