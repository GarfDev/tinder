import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { Person } from "@tinder/shared-types";
import { peopleFetchProperitiesState, peopleQuery } from "./atoms";
import { LOADING_OFFSET } from "./constants";
import { PeopleMap } from "./types";
import { Card } from "./components";

/**
 *
 * @returns Homepage Element
 */
const Homepage = (): JSX.Element => {
  // State
  const [viewIndex, setViewIndex] = useState(0);
  const [fetchProperities, setFetchProperities] = useRecoilState(
    peopleFetchProperitiesState
  );
  const [peopleMap, setPeopleMap] = useState<PeopleMap>({});

  // Remote States
  const remotePeoples = useRecoilValueLoadable(peopleQuery);

  // Mapped values
  const loading = remotePeoples.state === "loading";
  const peoples: Person[] = Object.values(peopleMap).flat();
  const peopleLength = peoples.length || LOADING_OFFSET;
  const viewingPerson = peoples[viewIndex];

  // Event Handlers

  const onNextPerson = () => setViewIndex(viewIndex + 1);

  const onSwipeLeft = () => {
    onNextPerson();
  };

  const onSwipeRight = () => {
    onNextPerson();
  };

  const loadNextPage = () => {
    setFetchProperities({
      ...fetchProperities,
      page: fetchProperities.page + 1,
    });
  };

  // Side-Effects

  useEffect(() => {
    if (!loading) {
      const offsetPoint = peopleLength - LOADING_OFFSET;
      if (viewIndex > offsetPoint) {
        loadNextPage();
      }
    }
  }, [viewIndex]);

  useEffect(() => {
    switch (remotePeoples.state) {
      case "hasValue": {
        /**
         * Update People Hashmap
         * Since there a little change
         * that we can duplicate `page`
         * param, so I used a hashmap to
         * guard that.
         */
        setPeopleMap({
          ...peopleMap,
          ...remotePeoples.getValue(),
        });
      }
    }
  }, [remotePeoples.state]);

  useEffect(() => {
    return () => {
      setFetchProperities({
        ...fetchProperities,
        page: 1,
      });
    };
  }, []);

  // Main return
  return (
    <Container>
      <Card
        person={viewingPerson}
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
      />
    </Container>
  );
};

export default Homepage;

/**
 * Styles
 */

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: #ed4264;
  background: -webkit-linear-gradient(to right, #ffedbc, #ed4264);
  background: linear-gradient(to right, #ffedbc, #ed4264);
  justify-content: center;
  align-items: center;
`;
