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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0rem;
`;
const ContentContainer = styled.div`
  position: relative;
  display: flex;
  padding: 2rem 1rem;
  flex-direction: column;
  max-width: 1080px;
  @media (min-width: 769px) {
    width: 70%;
    margin: auto;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

function App() {
  const todayDate = new Date();
  const days = 86400000;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [popoverActive, setPopoverActive] = useState(false);
  const [tagValue, setTagValue] = useState("");

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleTagValueChange = useCallback((value) => setTagValue(value), []);
  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Filter
    </Button>
  );
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
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <AppProvider i18n={enTranslations}>
          <Page>
            <HeaderContainer>
              {/* <ContentContainer> */}
              <TextContainer>
                <DisplayText size="extraLarge">Spacestagram</DisplayText>
                <Heading>
                  Brought to you by NASA's Astronomy Photo of the Day (APOP) API
                </Heading>
              </TextContainer>
              {/* </ContentContainer> */}
            </HeaderContainer>
            <Layout>
              <Navigation location="/">
                <Navigation.Section
                  items={[
                    {
                      url: "/",
                      label: "Home",
                      icon: HomeMajor,
                    },
                    {
                      url: "/path/to/place",
                      label: "Orders",
                      // icon: OrdersMajor,
                      badge: "15",
                    },
                    {
                      url: "/path/to/place",
                      label: "Products",
                      // icon: ProductsMajor,
                    },
                  ]}
                />

                <DatePicker
                  month={month}
                  year={year}
                  onChange={setSelectedDates}
                  onMonthChange={handleMonthChange}
                  selected={selectedDates}
                  allowRange
                />
              </Navigation>

              <Icon source={CirclePlusMinor} color="critical" />

              <Layout.Section>
                {items.map((item) => (
                  <MediaCard
                    title={item.title + " - " + item.date}
                    primaryAction={{
                      content: <Icon source={HeartMajor} color="critical" />,
                      //   icon: HeartMajor,
                      outline: false,

                      onAction: () => {},
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
              </Layout.Section>
            </Layout>
          </Page>
        </AppProvider>
        <h1> Fetch data from an api in react </h1>
        {items.map((item) => (
          <ol key={item.id}>
            Title: {item.title}, Date: {item.date}, Caption: {item.email}
          </ol>
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
      </div>
    );
  }
}

export default App;
