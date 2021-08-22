import React, { Suspense, useEffect } from "react";
import Reset from "./reset";
import { RecoilRoot } from "recoil";
import getUUID from "./utils/get-uuid";
import Homepage from "./features/homepage";

const App = (): JSX.Element => {
  useEffect(() => {
    getUUID();
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
