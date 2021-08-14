import React, { useRef, useEffect, useState, useContext } from "react";
import Layout from "../components/layout";
import { io } from "socket.io-client";
import userContext from "../context/user";
import {
  AspectRatio,
  Button,
  Flex,
  Input,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import Peer from "peerjs";
import { navigate, useNavigate } from "@reach/router";
import { config } from "../config";

const IndexPage = () => {
  const [calling, setcalling] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [user, setuser] = useContext(userContext);
  const [audio, setaudio] = useState(true);
  const [video, setvideo] = useState(true);
  const [stream, setstream] = useState(null);
  const [isFriend, setisFriend] = useState(false);
  const socket = useRef(null);
  const userVideo = useRef(null);
  const friendVideo = useRef(null);
  const peer = useRef(null);
  const nav = useNavigate();
  useEffect(() => {
    console.log(user, config);
    socket.current = io.connect(config.serverURL);

    socket.current.on("user-disconnected", () => {
      console.log("disconnected");
      setisFriend(true);
      friendVideo.current = null;
    });
  }, []);
  useEffect(() => {
    getstream();
  }, [video, audio]);
  const getstream = () => {
    const constraints = { video: video, audio: audio };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setstream(stream);
        console.log(stream, userVideo);
        userVideo.current.srcObject = stream;
        socket.current.on("user-connected", (userId) => {
          console.log(userId);
          connectToNewUser(userId, stream);
        });
        peersetup(stream);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const connectToNewUser = (userId, stream) => {
    const call = peer.current.call(userId, stream);
    call.on("stream", (userVideoStream) => {
      console.log(userVideoStream);
      friendVideo.current.srcObject = userVideoStream;
    });
  };
  const peersetup = (stream) => {
    peer.current = new Peer({
      secure: true,
      trickle: false,
      config: {
        iceServers: [
          {
            url: "stun:139.59.86.20:7000",
          },
          {
            url: "turn:139.59.86.20:7000",
            credential: "key1",
            username: "username1",
          },
        ],
      },
    });
    peer.current.on("open", (id) => {
      console.log(id, "open");
      console.log(user.roomid);
      socket.current.emit("join-room", user.roomid, id);
    });
    peer.current.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (userVideoStream) => {
        console.log(userVideoStream);
        friendVideo.current.srcObject = userVideoStream;
      });
    });
  };

  return (
    <Layout title="chat room">
      <Flex flexDir="column" w="100vw" h="100vh" bg="blue.800">
        <Flex
          flexDir={["column", "row"]}
          w="100%"
          mr={["0", "4"]}
          mb={["4", "0"]}
          flex={"1"}
          alignItems="center"
          justifyContent="center"
        >
          <AspectRatio
            w={["90%", "45%"]}
            ratio={4 / 3}
            mr={["0", "2"]}
            mb={["2", "0"]}
          >
            <video
              ref={userVideo}
              height="100%"
              width="100%"
              autoPlay
              muted
              playsInline
              controls={false}
            ></video>
          </AspectRatio>
          <AspectRatio
            w={["90%", "45%"]}
            ml={["0", "2"]}
            mt={["2", "0"]}
            ratio={4 / 3}
          >
            <video
              ref={friendVideo}
              style={{
                opacity: isFriend ? 0 : 1,
              }}
              height="100%"
              width="100%"
              autoPlay
              playsInline
              controls={false}
            ></video>
          </AspectRatio>
        </Flex>
        <Flex alignItems="center" justifyContent="center" m="4">
          <Button
            colorScheme={video ? "green" : "red"}
            m="2"
            onClick={() => {
              setvideo(!video);
            }}
          >
            video
          </Button>
          <Button
            colorScheme={audio ? "green" : "red"}
            m="2"
            onClick={() => {
              setaudio(!audio);
            }}
          >
            audio
          </Button>
          <Button
            colorScheme="red"
            m="2"
            onClick={() => {
              socket.current.disconnect();
              peer.current.destroy();
              stream.getTracks().forEach(function (track) {
                track.stop();
              });
              nav("/");
            }}
          >
            cut call
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};
export default IndexPage;
