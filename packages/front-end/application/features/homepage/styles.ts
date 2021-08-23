import styled, { keyframes } from "styled-components";

export const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 70%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-size: 150% 150%;
  background: -webkit-linear-gradient(to right, #ffedbc, #ed4264);
  background: linear-gradient(to right, #ffedbc, #ed4264);
  animation: ${gradient} 15s ease infinite;
  height: 100vh;

  justify-content: center;
  align-items: center;
`;
