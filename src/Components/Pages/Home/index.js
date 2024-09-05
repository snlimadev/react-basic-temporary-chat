import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../Header';
import Footer from '../../Footer';
import { useChatParameters } from '../../../Contexts/ChatParametersContext';

export default function Home() {
  const { setChatParameters } = useChatParameters();

  useEffect(() => {
    setChatParameters('', '', 0); // eslint-disable-next-line
  }, []);

  return (
    <div className='vh-100 d-flex flex-column justify-content-center'>
      <Header
        title='Home'
        icon='hidden'
      />

      <main className='w-100 overflow-auto mx-auto mt-5 mb-4 text-center px-3'>
        <h3>Welcome to Basic - Temporary Chat!</h3>

        <h5 className='pt-2'>Just create a room, share the room code with your friends and start chatting!</h5>

        <div className='col col-md-9 col-lg-6 mx-auto pt-3'>
          <Link className='btn btn-primary w-100' to='/create-room'>CREATE A ROOM</Link>
        </div>

        <div className='col col-md-9 col-lg-6 mx-auto pt-3'>
          <Link className='btn btn-primary w-100' to='/join-room'>JOIN A ROOM</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}