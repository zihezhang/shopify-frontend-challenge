import React, { useCallback, useEffect, useState } from "react";
// import "./App.css";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  Page,
  Button,
  Icon,
  Layout,
  MediaCard,
  DatePicker,
  Popover,
  VideoThumbnail,
  DisplayText,
  Subheading,
  TextContainer,
  Heading,
  Navigation,
} from "@shopify/polaris";
import { HomeMajor, CirclePlusMinor, HeartMajor } from "@shopify/polaris-icons";
import styled from "styled-components";

import moment from "moment";

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

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("ERROR");
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [selectedDates]);

  if (error) {
    return <FeedContainer>Error: {error.message}</FeedContainer>;
  } else if (!isLoaded) {
    return <FeedContainer>Loading...</FeedContainer>;
  } else {
    return (
      <FeedContainer>
        {items.map((item) => (
          <MediaCard
            title={item.title + " - " + item.date}
            primaryAction={{
              content: <Icon source={HeartMajor} color="critical" />,
              //   icon: HeartMajor,
              outline: false,
              onAction: () => {},
            }}
            secondaryAction={{
              content: "Share",
              onAction: () => navigator.clipboard.writeText(item.hdurl),
            }}
            description={item.explanation}
            // popoverActions={[
            //   { content: "Dismiss", onAction: () => {} },
            // ]}
            portrait={true}
            size="small"
          >
            {item.media_type === "image" ? (
              <img
                alt=""
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={item.url}
              />
            ) : (
              <VideoThumbnail
                videoLength={80}
                thumbnailUrl={item.thumbnail_url}
                // onClick()
              />
            )}
          </MediaCard>
        ))}

        <div className="App">
          <iframe
            width="560"
            height="315"
            src={url}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <button onClick={() => setPlay(true)}>Play</button>
        </div>
      </FeedContainer>
    );
  }
}

export default Feed;
