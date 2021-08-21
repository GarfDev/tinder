import React, { Suspense } from "react";
import Reset from "./reset";
import { RecoilRoot } from "recoil";
import Homepage from "./features/homepage";

const App = (): JSX.Element => {
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
