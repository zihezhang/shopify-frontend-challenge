import React, { useCallback, useRef, useState } from "react";
import {
  AppProvider,
  ActionList,
  Avatar,
  Card,
  ContextualSaveBar,
  FormLayout,
  Frame,
  Layout,
  Loading,
  Navigation,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  Toast,
  TopBar,
} from "@shopify/polaris";
import { BrowserRouter } from "react-router-dom";
import { HomeMajor, HeartMajor } from "@shopify/polaris-icons";
import styled from "styled-components";
import spacegram from "./spacegram.png";
import BrowserRoutes from "./BrowserRoutes";

import Feed from "./components/Feed";

const NavContainer = styled.div`
  ${
    "" /* display: flex;
  flex-direction: column; */
  }
  @media (min-width: 769px) {
    margin: 5px 10px;
  }
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export default function FrameExample() {
  const skipToContentRef = useRef(null);

  const [toastActive, setToastActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      //   userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <NavContainer>
        <Navigation.Section
          title="Navigation"
          items={[
            {
              url: "/home",
              label: "Home",
              icon: HomeMajor,
            },
            {
              url: "/liked",
              label: "Liked",
              icon: HeartMajor,
            },
          ]}
        />
      </NavContainer>
    </Navigation>
  );

  const pageMarkup = (
    <Page title="Your Feed">
      <BrowserRoutes />
      {toastMarkup}
    </Page>
  );

  const theme = {
    logo: {
      width: 124,
      topBarSource: spacegram,
      contextualSaveBarSource:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Shopify_logo.svg/2560px-Shopify_logo.svg.png",
      accessibilityLabel: "Spacegram",
    },
  };

  return (
    <div style={{ height: "500px" }}>
      <BrowserRouter>
        <AppProvider
          theme={theme}
          i18n={{
            Polaris: {
              Avatar: {
                label: "Avatar",
                labelWithInitials: "Avatar with initials {initials}",
              },
              ContextualSaveBar: {
                save: "Save",
                discard: "Discard",
              },
              TextField: {
                characterCount: "{count} characters",
              },
              TopBar: {
                toggleMenuLabel: "Toggle menu",
              },
              Modal: {
                iFrameTitle: "body markup",
              },
              Frame: {
                skipToContent: "Skip to content",
                navigationLabel: "Navigation",
                Navigation: {
                  closeMobileNavigationLabel: "Close navigation",
                },
              },
            },
          }}
        >
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
            skipToContentTarget={skipToContentRef.current}
          >
            {pageMarkup}
            {toastMarkup}
          </Frame>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}
