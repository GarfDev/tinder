import React, { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import styled from "styled-components";
import { insightQuery } from "./atoms";
import BaseIcon from "../icon";

const NavigationBar = (): JSX.Element => {
  // States
  const [userInsight, setUserInsight] = useState({ liked: 0, passed: 0 });
  const remoteUserInsight = useRecoilValueLoadable(insightQuery);

  // Side Effects
  useEffect(() => {
    switch (remoteUserInsight.state) {
      case "hasValue": {
        setUserInsight({
          ...remoteUserInsight.getValue(),
        });
      }
    }
  }, [remoteUserInsight.state]);

  // Main return
  return (
    <Container>
      <IconBox>
        <Icon className="fas fa-ban" /> <Text>{userInsight.passed}</Text>
      </IconBox>
      <IconBox>
        <Icon className="fas fa-heart" /> <Text>{userInsight.liked}</Text>
      </IconBox>
    </Container>
  );
};

export default NavigationBar;

const Icon = styled(BaseIcon)`
  color: white;
  font-size: 1.5rem;
  transition-duration: 300ms;
`;

const Text = styled(Icon)`
  margin-left: 5px;
  font-weight: bold;
`;

const IconBox = styled.div`
  height: 60px;
  display: flex;
  padding: 0px 5px;
  width: max-content;
  align-items: center;
  min-width: 60px;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #000;
    opacity: 0.4;
  }

  &:active {
    ${Icon} {
      color: #ed4264;
    }
    background-color: #000;
    opacity: 0.9;
  }
`;

const Container = styled.div`
  top: 0;
  width: 100%;
  display: flex;
  position: fixed;
  padding: 0px 20px;
  align-items: center;
  justify-content: flex-end;
  height: 60px;

  ${IconBox}:last-child {
    margin-right: 15px;
  }
`;
