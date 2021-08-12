import React from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "./navbar";
import { Helmet } from "react-helmet";
const Layout = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main style={{ width: "100vw", overflowX: "hidden" }}>{children}</main>
    </div>
  );
};

export default Layout;
