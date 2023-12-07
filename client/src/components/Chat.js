import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate,useLocation} from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "./Chats/chatContainer";
import Contacts from "./Chats/contacts";
import Welcome from "./Chats/welcome";
import Cookies from 'universal-cookie'
const cookies = new Cookies()
export default function Chat(props) {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const query = searchParams.get('with');
  console.log("params" ,query)
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(query?{email:query}:undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    if (!cookies.get('SELLER-TOKEN') && !cookies.get('BUYER-TOKEN')) {
      navigate("/login");
    } else {
      setCurrentUser(
        cookies.get('SELLER-TOKEN')?cookies.get('SELLER-TOKEN').user:cookies.get('BUYER-TOKEN').user
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io('http://localhost:3001');
      socket.current.emit("add-user", currentUser.username);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
        //console.log("HERE" ,currentUser)
        axios.get(`http://localhost:3001/message/${currentUser.username}`).then(date=>{
            console.log("answer",date.data)
        setContacts(date.data)
    })
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <>
            <Welcome />
            </>
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;