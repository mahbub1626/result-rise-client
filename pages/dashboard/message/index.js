import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import io from "socket.io-client";
import ActiveFriend from "../../../components/Message/ActiveFriend";
import FriendsInfo from "../../../components/Message/FriendsInfo";
import RightSide from "../../../components/Message/RightSide";
import { useFirebase } from "../../../context/UserContext";

const index = () => {
  const [newMessage, setNewMessage] = useState(" ");
  const { user } = useFirebase();
  const [currentFriend, setCurrentFriend] = useState("");
  const [activeUser, setActiveUser] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketMessage, setSocketMessage] = useState("");
  const scrollRef = useRef();
  const socket = useRef();

  const activeUserFilter = activeUser.filter(
    (ativeUserInfo) => ativeUserInfo?.userEmail == currentFriend?.email
  );
  useEffect(() => {
    socket.current = io("http://localhost:3100");
    socket.current.on("connected", () => setSocketConnected(true));
    socket.current.on("getMessage", (getMessageData) => {
      setSocketMessage([...socketMessage, getMessageData]);

      // setSocketMessage(getMessageData)
    });
  }, []);
  console.log(socketMessage);

  const userInfo = {
    userEmail: user?.email,
    userName: user?.displayName,
    userPhoto: user?.photoURL,
  };

  useEffect(() => {
    socket.current.emit("addUsers", userInfo.userEmail, userInfo);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (connectuser) => {
      const filterUser = connectuser.filter(
        (u) => u.userEmail !== userInfo?.userEmail
      );
      setActiveUser(filterUser);
    });
  }, []);

  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderEmail === currentFriend.email &&
        socketMessage.receiverid === user.email
      ) {
      }
    }
  }, [socketMessage]);

  const {
    data: friend = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3100/verified/student");
      const data = await res.json();
      const fitlterdata = data.filter((fdata) => fdata.email !== user?.email);
      return fitlterdata;
    },
  });

  const {
    data: showmessage = [],
    refetch: messageReftch,
    isLoading: messageLoading,
  } = useQuery({
    queryKey: [currentFriend?.email, user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3100/message/${currentFriend?.email}/${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    if (friend && friend.length > 0) {
      setCurrentFriend(friend[0]);
    }
  }, [friend]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;

    const msg = {
      senderName: user?.displayName,
      senderEmail: user?.email,
      senderPhotot: user?.photoURL,
      receiverid: currentFriend?.email,
      time: new Date().toLocaleDateString(),
      message: message,
    };

    socket.current.emit("sendMessage", msg);
    setNewMessage([...socketMessage, msg]);
    // setNewMessage(msg)
    handleMessagePost(msg);
    form.reset();
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    console.log("typing value", e.target.value);
  };

  const handleMessagePost = (messagedata) => {
    fetch("http://localhost:3100/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagedata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        messageReftch();
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [showmessage]);

  return (
    <div>
      <div className="flex flex-row h-screen bg-gray-100 border ">
        <div className="flex flex-row flex-auto bg-white rounded-tl-xl border-l shadow-xl">
          <div className="flex flex-col w-4/12">
            <div className="flex-none">
              <div className="p-4">
                <div className="flex font-bold text-xl items-center gap-2">
                  <img
                    className="rounded-full w-10 h-10"
                    src={user?.photoURL}
                  />
                  <h1>{user.displayName}</h1>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="font-bold  text-2xl p-2">Chats</h1>
                <div className="flex gap-1">
                  <AiOutlineVideoCameraAdd size="20px" />
                  <BiEdit size="20px" />
                </div>
              </div>
              <div className=" p-2">
                <input
                  type="text"
                  placeholder="search message"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className=" flex gap-2 p-2 border overflow-x-scroll">
              {activeUser.length > 0
                ? activeUser?.map((fd) => (
                  <ActiveFriend
                    setCurrentFriend={setCurrentFriend}
                    activefd={fd}
                  />
                ))
                : "Loading..."}
            </div>

            <div className="flex-auto overflow-y-auto ">
              {friend.length > 0
                ? friend?.map((fd) => (
                  <RightSide
                    currentFriend={currentFriend}
                    friend={fd}
                    setCurrentFriend={setCurrentFriend}
                  />
                ))
                : "loading..."}
            </div>
          </div>

          <div className="w-3/5 border-l border-r border-gray-400 flex flex-col">
            <FriendsInfo
              currentFriend={currentFriend}
              user={user}
              setNewMessage={setNewMessage}
              typingHandler={typingHandler}
              newMessage={newMessage}
              activeUser={activeUser}
              handleMessageSubmit={handleMessageSubmit}
              socketMessage={socketMessage}
              showmessage={showmessage}
              activeUserFilter={activeUserFilter}
              scrollRef={scrollRef}
            />
          </div>

          <div className="w-1/5 bg-gray-200 overflow-y-auto flex flex-col ">
            <div className="  flex flex-col justify-center items-center mt-4">
              {activeUserFilter.length > 0 ? (
                activeUserFilter?.map((singleActiveUser, index) => (
                  <div className="p-2 " key={index}>
                    <img
                      className="w-10 h-10 rounded-full hover:bg-gray-100 md:mt-5 border border-green-600"
                      src={singleActiveUser?.userInfo?.userPhoto}
                    />
                    <h1 className="flex-grow md:text-xl font-bold">
                      {singleActiveUser?.userInfo?.userName}
                    </h1>
                    <p className="text-green-500">active now</p>
                  </div>
                ))
              ) : (
                <div>
                  <img
                    className="w-10 h-10 rounded-full hover:bg-gray-100 md:mt-5 "
                    src={currentFriend?.photoURL}
                  />
                  <h1 className="flex-grow md:text-xl font-bold">
                    {currentFriend?.name}
                  </h1>
                  <p>ofline</p>
                </div>
              )}
              {/* <div className="text-sm text-gray-600 text-center">5hr</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
