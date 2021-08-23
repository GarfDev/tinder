import React, { useEffect } from "react";
import {
  useMotionValue,
  useTransform,
  useAnimation,
  PanHandlers,
  AnimatePresence,
} from "framer-motion";
import { IPerson } from "../../types";
import { Container, InfoContainer, Image, Text, Stamp } from "./styles";
import {
  HIDE,
  SHOW,
  MAX_ROTAGE_ANGLE,
  MAX_SWIPE_POINT,
  MIN_SWIPE_POINT,
  MIN_SWITCH_POINT,
  SWIPE_LEFT_COLOR,
  SWIPE_RIGHT_COLOR,
  SWITCH_POINT,
} from "./constants";

interface Props {
  person?: IPerson;
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
  }, [person?.uuid]);

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
          <Image src={person.avatarUrl} />
          <InfoContainer>
            <Text weight="bold">
              {`${person.lastName},`}
              <Text weight="normal" size="1.3rem">
                {" "}
                {person.age}
              </Text>
            </Text>
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
