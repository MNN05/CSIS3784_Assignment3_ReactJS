import { useEffect, useState } from 'react';
import { socket } from '../socket';

const CreateCodeScreen = ({ onNext }) => {
  const [roomCode, setRoomCode] = useState('');

  useEffect(() => {
    socket.emit('create-game');
    socket.on('game-created', ({ roomCode }) => {
      setRoomCode(roomCode);
    });

    return () => socket.off('game-created');
  }, []);

  return (
    <div>
      <h2>Your Game Code: {roomCode}</h2>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default CreateCodeScreen;