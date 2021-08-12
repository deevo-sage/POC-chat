import { createContext } from "react";
const userContext = createContext([
  {
    username: "testuser",
    roomid: "1234",
  },
  () => {},
]);
export default userContext;
