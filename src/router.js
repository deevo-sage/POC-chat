import React from "react";
import { Router } from "@reach/router";
import IndexPage from "./pages";

const Routes = () => {
  return (
    <Router>
      <IndexPage path="/" />
    </Router>
  );
};
export default Routes;
