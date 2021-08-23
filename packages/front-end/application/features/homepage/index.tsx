import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { Person } from "@tinder/shared-types";
import { navigateUpdateState } from "../../global/components/navigation-bar/atoms";
import { NavigationBar } from "../../global/components";
import { peopleFetchProperitiesState, peopleQuery } from "./atoms";
import { callLikePerson, callPassPerson } from "./utils";
import { LOADING_OFFSET } from "./constants";
import { PeopleMap, IPerson } from "./types";
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
  const [navigateUpdate, updateNavigate] = useRecoilState(navigateUpdateState);
  const [peopleMap, setPeopleMap] = useState<PeopleMap>({});

  // References
  const preloadRef = React.useRef(document.createElement("img"));

  // Remote States
  const remotePeoples = useRecoilValueLoadable(peopleQuery);

  // Mapped values
  const loading = remotePeoples.state === "loading";
  const peoples: Person[] = Object.values(peopleMap).flat();
  const peopleLength = peoples.length || LOADING_OFFSET;
  const viewingPerson = peoples[viewIndex] as IPerson;
  const nextPerson = peoples[viewIndex + 1] as IPerson;

  // Event Handlers

  const handleLike = useCallback(async () => {
    await callLikePerson(viewingPerson.uuid);
  }, [viewingPerson]);

  const handlePass = useCallback(async () => {
    await callPassPerson(viewingPerson.uuid);
  }, [viewingPerson]);

  const onNextPerson = () => {
    setViewIndex(viewIndex + 1);
  };

  const onUpdateNavibar = () => {
    updateNavigate(navigateUpdate + 1);
  };

  const onSwipeLeft = () => {
    handlePass();
    onNextPerson();
  };

  const onSwipeRight = () => {
    handleLike();
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
    onUpdateNavibar();
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

  useEffect(() => {
    /**
     * Prefetch next
     * person image
     */
    if (nextPerson) {
      preloadRef.current.src = nextPerson.avatarUrl;
    }
  }, [nextPerson]);

  // Main return
  return (
    <Container>
      <NavigationBar />
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
