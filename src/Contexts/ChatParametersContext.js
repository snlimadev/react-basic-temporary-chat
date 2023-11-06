import { createContext, useContext, useState } from 'react';

const ChatParametersContext = createContext();

export function useChatParameters() {
  return useContext(ChatParametersContext);
}

export function ChatParametersProvider({ children }) {
  const [user, setUser] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [maxRoomSize, setMaxRoomSize] = useState(0);

  const setChatParameters = (p_user, p_roomCode, p_maxRoomSize) => {
    setUser(p_user);
    setRoomCode(p_roomCode);
    setMaxRoomSize(p_maxRoomSize);
  };

  return (
    <ChatParametersContext.Provider value={{ user, roomCode, maxRoomSize, setChatParameters }}>
      {children}
    </ChatParametersContext.Provider>
  );
}