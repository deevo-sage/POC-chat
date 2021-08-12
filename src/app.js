import React, { useState } from "react";
import userContext from "./context/user";
import Routes from "./router";
import { ChakraProvider } from "@chakra-ui/react";
const App = () => {
  const userState = useState({
    username: "testuser",
    roomid: "1234",
  });
  return (
    <div>
      <ChakraProvider>
        <userContext.Provider value={userState}>
          <Routes />
        </userContext.Provider>
      </ChakraProvider>
    </div>
  );
};
export default App;
