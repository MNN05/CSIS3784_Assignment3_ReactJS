import React, { useState, useEffect } from 'react';
import { socket } from './socket';

// Correcting component names to match what's used in the JSX
import StartScreen from './components/StartScreen';
import ModeSelectScreen from './components/CreateGameScreen';
import CreateCodeScreen from './components/CreateCodeScreen';
import EnterCodeScreen from './components/EnterCode';
import EnterUsernameScreen from './components/Username';
import LobbyScreen from './components/WaitingLobby';
import PlayerView from './components/Player';       // Changed from PlayerScreen
import SpectatorView from './components/Spectator'; // Changed from SpectatorScreen

const App = () => {
  const [gameState, setGameState] = useState('start');
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [players, setPlayers] = useState([]);

  // Socket listeners
  useEffect(() => {
    socket.on('game-created', ({ roomCode }) => {
      setRoomCode(roomCode);
      setGameState('enter-username');
    });

    socket.on('player-joined', (player) => {
      setPlayers(prev => [...prev, player]);
    });

    // Moved inside the useEffect hook
    socket.on('connect_error', (err) => {
      console.error('Connection failed:', err.message);
    });

    return () => {
      socket.off('game-created');
      socket.off('player-joined');
      socket.off('connect_error'); // Also clean this up
    };
  }, []);

  // UI flow
  return (
    <>
      {gameState === 'start' && (
        <StartScreen onNext={() => setGameState('mode-select')} />
      )}

      {gameState === 'mode-select' && (
        <ModeSelectScreen
          onCreate={() => setGameState('create-code')}
          onJoin={() => setGameState('enter-code')}
        />
      )}

      {gameState === 'enter-code' && (
        <EnterCodeScreen
          onSubmit={(code) => {
            setRoomCode(code);
            setGameState('enter-username');
          }}
        />
      )}

      {gameState === 'enter-username' && (
        <EnterUsernameScreen
          roomCode={roomCode}
          onSubmit={(name, role) => {
            setUsername(name);
            setRole(role);
            socket.emit('join-game', { username: name, roomCode, role });

            if (role === 'player') {
              setGameState('player-view');
            } else if (role === 'spectator') {
              setGameState('spectator-view');
            }
          }}
        />
      )}

      {gameState === 'lobby' && (
        <LobbyScreen
          roomCode={roomCode}
          players={players}
          onStart={() => setGameState('player-view')}
        />
      )}

      {gameState === 'player-view' && (
        <PlayerView username={username} roomCode={roomCode} players={players} />
      )}

      {gameState === 'spectator-view' && (
        <SpectatorView roomCode={roomCode} players={players} />
      )}
    </>
  );
};

export default App;