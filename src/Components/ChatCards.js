export default function ChatCards(props) {
  return (
    <div className='px-3'>
      {
        props.chatMessages.map((messageData, index) => {
          const cardHeaderUser = messageData.sender;
          const cardHeaderTime = messageData.time;
          const cardBodyMessage = messageData.message;
          const cardBodyEvent = messageData.event;

          //#region Keep line breaks / Mantém as quebras de linha
          let cardBodyMessageWithLineBreaks;

          if (cardBodyMessage) {
            const cardBodyMessageFormatted = cardBodyMessage.replace(/\\n/g, '\n');
            const lines = cardBodyMessageFormatted.split('\n');

            cardBodyMessageWithLineBreaks = lines.map((line, lineIndex) => (
              <div key={lineIndex}>{line}</div>
            ));
          }
          //#endregion

          return (
            <div key={index} className='card mb-3'>
              {
                (!cardBodyEvent) && (
                  <div className='card-header'>
                    <span className='fw-bold'>{cardHeaderUser}</span> at {cardHeaderTime}
                  </div>
                )
              }

              <div className='card-body'>{cardBodyMessageWithLineBreaks || cardBodyEvent}</div>
            </div>
          );
        })
      }

      <div ref={props.messagesEndRef}></div>
    </div>
  );
}