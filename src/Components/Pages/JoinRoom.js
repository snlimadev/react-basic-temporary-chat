import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../Header';
import FormFields from '../FormFields';
import Footer from '../Footer';
import { validateRequiredFields } from '../Functions';
import { useChatParameters } from '../../Contexts/ChatParametersContext';

export default function JoinRoom() {
  const [userName, setUserName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const { setChatParameters } = useChatParameters();
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    const passedValidation = validateRequiredFields(roomCode, 'Room code') && validateRequiredFields(userName, 'Username');

    if (passedValidation) {
      setChatParameters(userName, roomCode);
      navigate('/chat/join');
    }
  };

  useEffect(() => {
    setChatParameters('', ''); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header
        title='Join Room'
        icon='back'
      />

      <FormFields
        userName={userName}
        setUserName={setUserName}
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        buttonTitle='JOIN'
        buttonAction={handleJoinRoom}
      />

      <Footer />
    </div>
  );
}