import React from "react";
import { Router } from "@reach/router";
import IndexPage from "./pages";
import LoginPage from "./pages/login";

const Routes = () => {
  return (
    <Router>
      <LoginPage path="/" />
      <IndexPage path="/meet/:id" />
    </Router>
  );
};
export default Routes;
