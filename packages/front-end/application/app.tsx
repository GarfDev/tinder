import React from "react";
import Reset from "./reset";
import Homepage from "./features/homepage";

const App = (): JSX.Element => {
  // Main return
  return (
    <>
      <Homepage />
      <Reset />
    </>
  );
};

export default App;
