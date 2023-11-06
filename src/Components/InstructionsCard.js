import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaCopy, FaShareAlt } from 'react-icons/fa';

export default function InstructionsCard(props) {
  const [copiedTooltipVisible, setCopiedTooltipVisible] = useState(false);

  const textToShare = `Room code for Basic - Temporary Chat is ${props.shareRoomCode}`;
  const urlToShare = 'https://basic-temporary-chat.vercel.app/join-room';
  const copiedTooltip = <Tooltip>Copied</Tooltip>;

  //#region Local functions / Funções locais
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Share Room Code',
        text: textToShare,
        url: urlToShare,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing', error));
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Share action is not supported in this browser.'
      });
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${textToShare} - ${urlToShare}`)
      .then(() => console.log('Copied successfully'))
      .catch((error) => console.error('Error copying', error));
  }

  const handleCopyButtonClick = () => {
    handleCopyToClipboard();
    setCopiedTooltipVisible(true);
    setTimeout(() => setCopiedTooltipVisible(false), 2000);
  };
  //#endregion

  return (
    <div className='px-3 pt-2'>
      <div className='card mb-3 text-center'>
        <div className='card-header fw-bold'>
          Instructions
        </div>

        <div className='card-body'>
          Please be aware this is a temporary chat room.
          If you close your browser or reload the page, you will exit the room and you will need to join it again.
          Additionally, once the last person leaves the room it will be automatically deleted.
        </div>

        <OverlayTrigger placement='top' overlay={copiedTooltip} show={copiedTooltipVisible}>
          <Button variant='outline-info' onClick={handleCopyButtonClick} className='mx-3 mb-2'>
            <FaCopy /> COPY ROOM CODE
          </Button>
        </OverlayTrigger>

        <Button variant='outline-info' onClick={handleShare} className='mx-3 mb-2'>
          <FaShareAlt /> SHARE ROOM CODE
        </Button>
      </div>
    </div>
  );
}