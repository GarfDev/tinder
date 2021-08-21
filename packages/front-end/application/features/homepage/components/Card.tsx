import React, { useEffect } from "react";
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

// Group them togother in here for
// easier to modify values
const HIDE = 0;
const SHOW = 1;
const SWITCH_POINT = 200;
const MAX_SWIPE_POINT = 200;
const MAX_ROTAGE_ANGLE = 15;
const MIN_SWIPE_POINT = 150;
const MIN_SWITCH_POINT = 40;
const SWIPE_RIGHT_COLOR = "#ed4264";
const SWIPE_LEFT_COLOR = "#585757";

interface Props {
  person?: Person;
  // Events
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const Card = ({ person, onSwipeLeft, onSwipeRight }: Props): JSX.Element => {
  // Initialize things
  const controls = useAnimation();

  // States
  const motionValue = useMotionValue(0);
  const rotateValue = useTransform(
    motionValue,
    [-MAX_SWIPE_POINT, MAX_SWIPE_POINT],
    [-MAX_ROTAGE_ANGLE, MAX_ROTAGE_ANGLE]
  );
  const opacityValue = useTransform(
    motionValue,
    [-MAX_SWIPE_POINT, -MIN_SWIPE_POINT, 0, MIN_SWIPE_POINT, MAX_SWIPE_POINT],
    [HIDE, SHOW, SHOW, SHOW, HIDE]
  );

  const rightStampOpacity = useTransform(
    motionValue,
    [0, MIN_SWITCH_POINT, MIN_SWIPE_POINT],
    [HIDE, HIDE, SHOW]
  );

  const leftStampOpacity = useTransform(
    motionValue,
    [-MIN_SWIPE_POINT, -MIN_SWITCH_POINT, 0],
    [SHOW, HIDE, HIDE]
  );

  const swipeColor = useTransform(
    motionValue,
    [-MIN_SWITCH_POINT, 0, MIN_SWITCH_POINT],
    [SWIPE_LEFT_COLOR, SWIPE_RIGHT_COLOR, SWIPE_RIGHT_COLOR]
  );

  // Mapped values
  const fullName = `${person?.firstName} ${person?.lastName}`;

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

      controls.start({ x: offset.x < 0 ? -MAX_SWIPE_POINT : MAX_SWIPE_POINT });
    }
  };

  const reInitialize = async () => {
    await controls.start({ x: 0 });
    await controls.start({ opacity: 1 });
  };

  // Side-Effects
  useEffect(() => {
    reInitialize();
  }, [person?.id]);

  // Main return
  return (
    <AnimatePresence>
      {person && (
        <Container
          drag="x"
          key="main-swipable-modal"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={controls}
          style={{
            x: motionValue,
            rotate: rotateValue,
            opacity: opacityValue,
            borderColor: swipeColor,
          }}
          onDragEnd={onDragEnd}
        >
          <Image src={person.picture} />
          <InfoContainer>
            <Text>{`${fullName}`}</Text>
          </InfoContainer>
          <Stamp
            style={{
              opacity: rightStampOpacity,
              backgroundColor: swipeColor,
            }}
          >
            <span className="fas fa-heart" />
          </Stamp>
          <Stamp
            style={{
              opacity: leftStampOpacity,
              backgroundColor: swipeColor,
            }}
          >
            <span className="fas fa-ban" />
          </Stamp>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Card;

const Container = styled(motion.div)`
  width: 300px;
  height: 600px;
  display: flex;
  position: relative;
  background: white;
  border: 5px solid;
  background-clip: padding-box;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  flex-direction: column;
  border-radius: 15px;
  overflow: hidden;
`;

const Image = styled.div<{ src: string }>`
  flex: 4;
  object-fit: cover;
  background-size: cover;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
`;

const InfoContainer = styled.div`
  bottom: 0;
  height: 25%;
  width: 100%;
  position: absolute;
  padding: 15px 15px;
  color: white;
`;

const Text = styled.span`
  font-size: 1.5rem;
`;

const Stamp = styled(motion.span)`
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
