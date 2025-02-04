import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaArrowLeft, FaHome, FaMoon, FaSun } from 'react-icons/fa';

import { useDarkMode } from '../Contexts/DarkModeContext';

export default function Header(props) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header
      className='header fixed-top text-white p-1 d-flex justify-content-between align-items-center'
      style={{ backgroundColor: 'var(--primary-color)' }}
    >
      <Link to='/' className='btn float-left text-white'>
        {
          (props.icon === 'back') && <FaArrowLeft />
        }

        {
          (props.icon === 'home') && <FaHome />
        }

        {
          (props.icon === 'hidden') && <FaHome className='invisible' />
        }
      </Link>

      <div>
        <h3 className='m-0'>{props.title}</h3>
      </div>

      <Button variant='link' type='button' className='btn float-right text-white' onClick={toggleDarkMode}>
        {
          (isDarkMode) ? <FaSun /> : <FaMoon />
        }
      </Button>
    </header>
  );
}