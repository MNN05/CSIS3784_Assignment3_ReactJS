const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' }
});

const generateRoomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

const rooms = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  //Game creation
  socket.on('create-game', () => {
    const roomCode = generateRoomCode();
    roos[roomCode] = [];
    socket.join(roomCode);
    io.to(socket.id).emit('game-created', { roomCode });
  });

  //Player joins game
  socket.on('join-game', ({ username, roomCode, role }) => {
     if (!rooms[roomCode]) {
      socket.emit('error', { message: 'Invalid room code' });
      return;
    }
    socket.join(roomCode);
    rooms[roomCode].push({id: socket.id, username, role});

    io.to(roomCode).emit('player-joined', {
      id: socket.id,
      username,
      role,
      score: 0,
      health: 100
    });
  });

  // Player starts stream
  socket.on('player-stream-started', ({ id, username, roomCode }) => {
    socket.join(roomCode);
    io.to(roomCode).emit('player-joined', {
      id,
      username,
      role: 'player',
      score: 0,
      health: 100
    });

    socket.to(roomCode).emit('request-stream', { playerId: id });
  });

  //Spectator requests stream
  socket.on('request-stream', ({ playerId }) => {
    io.to(playerId).emit('send-stream', { to: socket.id });
  });

  //Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // You can also emit a 'player-left' event here if needed
    for (const roomCode in rooms) {
    rooms[roomCode] = rooms[roomCode].filter(p => p.id !== socket.id);
    io.to(roomCode).emit('player-left', { id: socket.id });
    }
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
