import React from "react";
import styled from "styled-components";
import Noise from "../../../public/noise.png";

import NavigationBar from "./components/navigation-bar";
import VideoBackground from "./components/video-background";

const Homepage = (): JSX.Element => {
  return (
    <Container>
      <VideoBackground />
      <NavigationBar />
      <Content>
        <Text>My Best Ability</Text>
        <Text>
          is building <Text className="highlighted">MERN</Text> Stack
        </Text>
        <Text>applications.</Text>
      </Content>
    </Container>
  );
};

export default Homepage;

const Container = styled.div`
  width: 100vw;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: url(${Noise});
  animation: grain 8s steps(10) infinite;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  padding: 4% 10%;
`;

const Text = styled.h3`
  font-family: "Times new roman", serif;
  font-weight: 400;
  font-size: 6rem;
  opacity: 0.85;

  .highlighted {
    color: #f24d41;
    font-weight: 500;
    display: inline-block;
  }
`;
