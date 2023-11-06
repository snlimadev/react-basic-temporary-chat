import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../Header';
import Footer from '../../Footer';
import { useChatParameters } from '../../../Contexts/ChatParametersContext';

export default function Home() {
  const [isDarkMode, toggleDarkMode] = useState(false);

  const { setChatParameters } = useChatParameters();

  useEffect(() => {
    setChatParameters('', '', 0); // eslint-disable-next-line
  }, []);

  return (
    <div className='vh-100 d-flex flex-column justify-content-center'>
      <Header
        title='Home'
        icon='hidden'
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className='w-100 mx-auto text-center px-3 py-5'>
        <h3>Welcome to Basic - Temporary Chat!</h3>

        <h5 className='pt-2'>Just create a room, share the room code with your friends and start chatting!</h5>

        <div className='col col-md-9 col-lg-6 mx-auto pt-3'>
          <Link className='btn btn-primary w-100' to='/create-room'>CREATE A ROOM</Link>
        </div>

        <div className='col col-md-9 col-lg-6 mx-auto pt-3 pb-2'>
          <Link className='btn btn-primary w-100' to='/join-room'>JOIN A ROOM</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}