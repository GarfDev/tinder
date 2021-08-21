import React from "react";
import styled from "styled-components";

const Homepage = (): JSX.Element => {
  return (
    <Container>
      <Text>Test 18</Text>
    </Container>
  );
};

export default Homepage;

/**
 * Styles
 */

const Container = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Text = styled.span`
  justify-self: center;
  align-self: center;
`;
