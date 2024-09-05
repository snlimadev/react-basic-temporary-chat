import { Button } from 'react-bootstrap';

export default function FormFields(props) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.buttonAction();
    }
  };

  return (
    <main className='w-100 overflow-auto mx-auto mt-5 mb-4 px-3 py-1'>
      <div className='col col-md-9 col-lg-6 mx-auto'>
        {
          (props.buttonTitle === 'CREATE') ? (
            <div>
              <label className='form-label'>Max Room Size</label>

              <select className='form-select' onChange={(e) => props.setMaxRoomSize(Number(e.target.value))} autoFocus={true}>
                {[...Array(15).keys()].map((value) => (
                  // From 2 to 16 / De 2 até 16
                  <option key={value + 2} value={value + 2}>
                    {value + 2} users
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className='form-label'>Room Code</label>

              <input
                className='form-control'
                type='number'
                placeholder='Enter the room code'
                value={props.roomCode}
                onChange={(e) => props.setRoomCode(e.target.value)}
                autoFocus={true}
              />
            </div>
          )
        }

        <div className='pt-2 pb-3'>
          <label className='form-label'>Username</label>

          <input
            className='form-control'
            type='text'
            placeholder='Choose your username'
            value={props.userName}
            onChange={(e) => props.setUserName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <Button variant='primary' type='button' className='w-100' onClick={props.buttonAction}>
            {props.buttonTitle}
          </Button>
        </div>
      </div>
    </main>
  );
}