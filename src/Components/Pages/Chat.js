/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { PiPaperPlaneRightFill } from 'react-icons/pi';

import Header from '../Header';
import { validateRequiredFields, handleClientConnection, createRoom, joinRoom, sendMessage, handleChatMessages, extendIdleTime } from '../Functions';
import { useChatParameters } from '../../Contexts/ChatParametersContext';
import InstructionsCard from '../InstructionsCard';
import ChatCards from '../ChatCards';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isDarkMode, toggleDarkMode] = useState(false);
  const [serverCalled, setServerCalled] = useState(false);
  const [idleMessage, setIdleMessage] = useState('');
  const [idleTimeoutCounter, setIdleTimeoutCounter] = useState(0);

  const { sendJsonMessage, readyState, lastMessage } = useWebSocket('wss://api-basic-temporary-chat.glitch.me');
  const { action } = useParams();
  const { user, roomCode, maxRoomSize } = useChatParameters();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  //#region Local functions / Funções locais
  const createOrJoinRoom = () => {
    if (user !== '' && roomCode !== '' && ((action === 'create' && maxRoomSize !== 0) || action !== 'create')) {
      if (action === 'create') {
        createRoom(user, roomCode, maxRoomSize, readyState, sendJsonMessage);
      } else {
        joinRoom(user, roomCode, readyState, sendJsonMessage);
      }
    } else {
      navigate('/');
    }
  }

  const handleSendMessage = () => {
    const passedValidation = validateRequiredFields(message, 'Message');

    if (passedValidation) {
      sendMessage(message, setMessage, readyState, sendJsonMessage);
      setIdleTimeoutCounter(0);

      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }

  const sendIdleMessage = () => {
    sendMessage(idleMessage, setIdleMessage, readyState, sendJsonMessage);
    setIdleTimeoutCounter(idleTimeoutCounter + 1);
  }

  const sendMessageOnEnterPress = (e) => {
    // Check if it's not Shift + Enter or a mobile device / Verifica se não é Shift + Enter ou um dispositivo móvel
    if (e.key === 'Enter' && !e.shiftKey && !/Mobi|Android/i.test(navigator.userAgent)) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  //#endregion

  //#region useEffect hooks
  useEffect(() => {
    const clientConnected = handleClientConnection(serverCalled, setServerCalled, readyState, navigate);

    if (clientConnected) {
      createOrJoinRoom();
      setIdleTimeoutCounter(0);
    }
  }, [action, user, roomCode, maxRoomSize, readyState, sendJsonMessage]);

  useEffect(() => {
    handleChatMessages(lastMessage, setChatMessages, navigate);
  }, [lastMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const interval = setInterval(() => {
      extendIdleTime(idleTimeoutCounter, setIdleTimeoutCounter, sendIdleMessage, navigate);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [idleTimeoutCounter]);
  //#endregion

  return (
    <div className='pb-5'>
      <Header
        title={`Room ${roomCode}`}
        icon='home'
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className='py-5'>
        <InstructionsCard shareRoomCode={roomCode} />
        <ChatCards chatMessages={chatMessages} messagesEndRef={messagesEndRef} />
      </main>

      <footer className='px-2 py-2 d-flex fixed-bottom'>
        <textarea
          ref={textareaRef}
          rows={3}
          className='form-control border border-primary'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={sendMessageOnEnterPress}
          style={{ resize: 'none' }}
        />

        <Button variant='primary' type='button' onClick={handleSendMessage}>
          <PiPaperPlaneRightFill />
        </Button>
      </footer>
    </div>
  );
}