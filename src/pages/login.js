import React, { useContext, useState } from "react";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import userContext from "../context/user";
import { useNavigate } from "@reach/router";

function LoginPage(props) {
  const [roomid, setroomid] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useContext(userContext);
  const nav = useNavigate();
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      justifyContent="center"
      h="100vh"
      w="100vw"
    >
      <Heading mb="4">Join Room</Heading>
      <Input
        colorScheme="linkedin"
        type="text"
        value={username}
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        maxW="300px"
        mb="4"
      />{" "}
      <Input
        colorScheme="linkedin"
        type="text"
        value={roomid}
        placeholder="roomid"
        onChange={(e) => {
          setroomid(e.target.value);
        }}
        maxW="300px"
        mb="4"
      />
      <Button
        colorScheme="linkedin"
        onClick={() => {
          setUser({ username, roomid });
          nav("/meet/" + roomid);
        }}
      >
        Join
      </Button>
    </Flex>
  );
}

export default LoginPage;
