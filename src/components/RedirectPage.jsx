import React from "react";
import styled from "styled-components";

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

function RedirectPage() {
  return (
    <FeedContainer>
      <p>Github repository has been open in new tab</p>
    </FeedContainer>
  );
}

export default RedirectPage;
