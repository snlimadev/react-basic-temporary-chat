import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Pages/Home';
import CreateRoom from '../Pages/CreateRoom';
import JoinRoom from '../Pages/JoinRoom';
import Chat from '../Pages/Chat';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/create-room' element={<CreateRoom />} />
        <Route path='/join-room' element={<JoinRoom />} />
        <Route path='/chat/:action' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}