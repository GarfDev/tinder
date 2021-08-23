import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  width: 380px;
  height: 600px;
  display: flex;
  cursor: grabbing;
  position: relative;
  background: white;
  background-clip: padding-box;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  flex-direction: column;
  overflow: hidden;
`;

export const Image = styled.div<{ src: string }>`
  flex: 4;
  object-fit: cover;
  background-size: cover;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-position: center;
`;

export const InfoContainer = styled.div`
  bottom: 0;
  height: 15%;
  width: 100%;
  position: absolute;
  padding: 15px 15px;
  color: white;
`;

export const Text = styled.span<{
  size?: React.ReactText;
  weight?: React.ReactText;
}>`
  font-size: ${({ size }) => size || "2rem"};
  font-weight: ${({ weight }) => weight};
`;

export const Stamp = styled(motion.span)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  font-size: 9rem;
  justify-content: center;
  align-items: center;
  color: #f0f0f0;
`;
