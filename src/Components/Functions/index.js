import { ReadyState } from 'react-use-websocket';

//#region Function to validate required fields / Função para validar campos obrigatórios
export function validateRequiredFields(field, label) {
  if (!field) {
    Swal.fire({
      icon: 'warning',
      text: `${label} must not be empty.`
    });

    return false;
  } else {
    return true;
  }
}
//#endregion

//#region Function to handle client connection / Função para lidar com a conexão do cliente
export function handleClientConnection(serverCalled, setServerCalled, readyState, navigate) {
  if (!serverCalled) {
    //#region Request notification permission / Solicita permissão para notificações
    if ('Notification' in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    } else {
      console.log('Notification is not supported in this browser.');
    }
    //#endregion

    Swal.fire({
      title: 'Connecting...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setServerCalled(true);
    return false;
  } else {
    if (readyState === ReadyState.OPEN) {
      Swal.close();
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Connection to the server lost. Please check your internet connection and try again later.'
      });

      navigate('/');
      return false;
    }
  }
}
//#endregion

//#region Function to create a chat room / Função para criar uma sala de chat
export function createRoom(user, roomCode, maxClients, readyState, sendJsonMessage) {
  if (readyState === ReadyState.OPEN) {
    const message = {
      action: 'create',
      user: user,
      roomCode: roomCode,
      maxClients: maxClients
    };

    sendJsonMessage(message);
  }
};
//#endregion

//#region Function to join a chat room / Função para entrar em uma sala de chat
export function joinRoom(user, roomCode, readyState, sendJsonMessage) {
  if (readyState === ReadyState.OPEN) {
    const message = {
      action: 'join',
      user: user,
      roomCode: roomCode
    };

    sendJsonMessage(message);
  }
};
//#endregion

//#region Function to send messages / Função para enviar mensagens
export function sendMessage(textMessage, setTextMessage, readyState, sendJsonMessage) {
  if (readyState === ReadyState.OPEN) {
    const message = {
      text: textMessage
    };

    sendJsonMessage(message);
    setTextMessage('');
  }
};
//#endregion

//#region Function to handle chat messages / Função para lidar com as mensagens do chat
export function handleChatMessages(lastMessage, setMessages, navigate) {
  if (lastMessage?.data) {
    try {
      const messageData = JSON.parse(lastMessage.data);
      const sender = messageData.sender;
      const time = messageData.time;
      const message = messageData.message;
      const event = messageData.event;

      if ((sender && time && message) || event) {
        setMessages(prevMessages => [...prevMessages, {
          sender: sender,
          time: time,
          message: message,
          event: event
        }]);

        //#region Send notification if chat is not visible / Envia notificação se o chat não estiver visível
        if ('Notification' in window) {
          if (Notification.permission === 'granted' && document.hidden && !event) {
            new Notification('Basic - Temporary Chat', {
              body: 'You have a new message.',
              icon: '../../../logo512.png',
            });
          }
        }
        //#endregion
      } else if (messageData.error) {
        Swal.fire({
          icon: 'error',
          text: messageData.error
        });

        navigate('/');
      }
    } catch (error) {
      console.log('Failed to parse message data: ' + lastMessage.data);
    }
  }
}
//#endregion

//#region Extend idle time from 3 to 10 minutes / Aumenta o tempo de inatividade de 3 para 10 minutos
export function extendIdleTime(idleTimeoutCounter, setIdleTimeoutCounter, sendIdleMessage) {
  if (idleTimeoutCounter < 7) {
    sendIdleMessage();
  } else if (idleTimeoutCounter < 9) {
    setIdleTimeoutCounter(idleTimeoutCounter + 1);

    if (idleTimeoutCounter === 8) {
      Swal.fire({
        icon: 'warning',
        text: 'Your session will expire in 60 seconds due to inactivity.'
      });
    }
  }
}
//#endregion
