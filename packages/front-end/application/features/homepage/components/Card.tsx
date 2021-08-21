import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Person } from "@tinder/shared-types";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  PanHandlers,
  AnimatePresence,
} from "framer-motion";

/**
 * Constants
 */

const SWITCH_POINT = 150;

interface Props {
  person: Person;
  // Events
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const Card = ({ person, onSwipeLeft, onSwipeRight }: Props): JSX.Element => {
  // Initialize things
  const controls = useAnimation();

  // States
  const motionValue = useMotionValue(0);
  const [reInitializing, setReinitializing] = useState(false);
  const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);
  const opacityValue = useTransform(
    motionValue,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  );

  // Event handlers
  const onDragEnd: PanHandlers["onPan"] = (_, { offset }) => {
    if (Math.abs(offset.x) <= SWITCH_POINT) {
      controls.start({
        x: 0,
      });
    } else {
      const swipeRight = offset.x > 0;

      if (swipeRight) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }

      controls.start({ x: offset.x < 0 ? -200 : 200 });
    }
  };

  const reInitialize = async () => {
    setReinitializing(true);
    await controls.start({ x: 0 });
    await controls.start({ opacity: 1 });
    setReinitializing(false);
  };

  // Side-Effects
  useEffect(() => {
    reInitialize();
  }, [person.id]);

  // Main return
  return (
    <AnimatePresence>
      <Container
        drag="x"
        animate={controls}
        style={{
          x: motionValue,
          rotate: rotateValue,
          opacity: !reInitializing ? opacityValue : 0,
        }}
        onDragEnd={onDragEnd}
      >
        <Image src={person.picture} />
        <InfoContainer>
          <Text>{`${person.firstName} ${person.lastName}`}</Text>
        </InfoContainer>
      </Container>
    </AnimatePresence>
  );
};

export default Card;

const Container = styled(motion.div)`
  width: 300px;
  height: 600px;
  display: flex;
  box-shadow: 5px 10px 18px #888888;
  flex-direction: column;
  border-radius: 5px;
`;

const Image = styled.div<{ src: string }>`
  flex: 4;
  object-fit: cover;
  background-size: cover;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 15px 10px;
`;

const Text = styled.span`
  font-size: 1.5rem;
`;
