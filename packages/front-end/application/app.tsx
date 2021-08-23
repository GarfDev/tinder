import React, { Suspense, useEffect } from "react";
import Reset from "./reset";
import { RecoilRoot } from "recoil";
import initializeUUID from "./utils/get-uuid";
import Homepage from "./features/homepage";

/**
 * Main
 */

const App = (): JSX.Element => {
  useEffect(() => {
    /**
     * Initialize UUID for current session
     * it will be stored in cookies
     */
    initializeUUID();
  }, []);

  // Main return
  return (
    <Suspense fallback={<>Loading</>}>
      <RecoilRoot>
        <Homepage />
        <Reset />
      </RecoilRoot>
    </Suspense>
  );
};

export default App;
