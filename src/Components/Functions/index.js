import { ReadyState } from 'react-use-websocket';
import Swal from 'sweetalert2';

const customSwal = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary"
  },
  buttonsStyling: false,
  background: 'var(--bs-body-bg)',
  color: 'var(--bs-body-color)'
});

//#region Function to validate required fields / Função para validar campos obrigatórios
export function validateRequiredFields(field, label) {
  if (!field.trim()) {
    customSwal.fire({
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

    customSwal.fire({
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
      customSwal.fire({
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
      const message = messageData.message;
      const event = messageData.event;

      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const time = new Intl.DateTimeFormat('pt-BR', options).format(new Date());

      if ((sender && message) || event) {
        setMessages(prevMessages => [...prevMessages, {
          sender: sender,
          time: time,
          message: message,
          event: event
        }]);

        //#region Send notification if chat is not visible / Envia notificação se o chat não estiver visível
        if ('Notification' in window) {
          if (Notification.permission === 'granted' && document.hidden && !event) {
            new Notification(`New message from ${sender}`, {
              body: message.replace(/\\n/g, '\n'),
              icon: '../../../logo512.png',
            });
          }
        }
        //#endregion
      } else if (messageData.error) {
        customSwal.fire({
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
export function extendIdleTime(idleTimeoutCounter, setIdleTimeoutCounter, sendIdleMessage, navigate) {
  if (idleTimeoutCounter < 8) {
    sendIdleMessage();
  } else if (idleTimeoutCounter < 9) {
    customSwal.fire({
      icon: 'warning',
      text: 'Your session will expire in 60 seconds due to inactivity.'
    });

    setIdleTimeoutCounter(idleTimeoutCounter + 1);
  } else {
    customSwal.fire({
      icon: 'error',
      text: 'Your session expired due to inactivity.'
    });

    navigate('/');
  }
}
//#endregion
