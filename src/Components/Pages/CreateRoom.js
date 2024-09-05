import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../Header';
import FormFields from '../FormFields';
import Footer from '../Footer';
import { validateRequiredFields } from '../Functions';
import { useChatParameters } from '../../Contexts/ChatParametersContext';

export default function CreateRoom() {
  const [userName, setUserName] = useState('');
  const [maxRoomSize, setMaxRoomSize] = useState(2);

  const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
  const { setChatParameters } = useChatParameters();
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const passedValidation = validateRequiredFields(userName, 'Username');

    if (passedValidation) {
      setChatParameters(userName, roomCode, maxRoomSize);
      navigate('/chat/create');
    }
  };

  useEffect(() => {
    setChatParameters('', '', 0); // eslint-disable-next-line
  }, []);

  return (
    <div className='vh-100 d-flex flex-column justify-content-center'>
      <Header
        title='Create Room'
        icon='back'
      />

      <FormFields
        userName={userName}
        setUserName={setUserName}
        setMaxRoomSize={setMaxRoomSize}
        buttonTitle='CREATE'
        buttonAction={handleCreateRoom}
      />

      <Footer />
    </div>
  );
}