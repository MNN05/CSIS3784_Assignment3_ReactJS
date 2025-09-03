const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST"]
  }
});

// A simple in-memory game state object
const gameState = {
    players: {}, // Stores player data by their Socket.IO ID
    gameCode: 'LASER1',
    status: 'waiting' // Can be 'waiting', 'in-progress', 'game-over'
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Handle real-time connections via Socket.IO
io.on('connection', (socket) => {
    console.log(`User connected with ID: ${socket.id}`);

    // --- Game Logic Events ---

    // Event: A player joins the game
    socket.on('joinGame', (data) => {
        const { playerName } = data;
        const newPlayerId = socket.id;

        // Check if the player already exists (reconnection scenario)
        if (!gameState.players[newPlayerId]) {
            // Add the new player to the game state
            gameState.players[newPlayerId] = {
                id: newPlayerId,
                name: playerName,
                score: 0,
                health: 100
            };

            console.log(`${playerName} joined the game.`);
        }

        // Send the updated game state to the player who just joined
        socket.emit('gameStateUpdate', {
            player: gameState.players[newPlayerId],
            allPlayers: Object.values(gameState.players),
            gameStatus: gameState.status,
            gameCode: gameState.gameCode
        });
        
        // Broadcast the new player's info to all other players
        socket.broadcast.emit('playerJoined', {
            id: newPlayerId,
            name: playerName,
            score: 0,
            health: 100
        });
    });

    // Event: A player shoots a laser and hits another player
    socket.on('playerShoot', (targetId) => {
        // Find the players
        const shooter = gameState.players[socket.id];
        const target = gameState.players[targetId];

        if (shooter && target && target.health > 0) {
            const damage = 10; // Simple damage value
            const scoreIncrease = 50; // Points for a hit

            // Update the game state: target's health and shooter's score
            target.health -= damage;
            shooter.score += scoreIncrease;

            // Check if the target is eliminated
            if (target.health <= 0) {
                target.health = 0; // Ensure health doesn't go negative
                // Notify everyone that the player is out
                io.emit('playerEliminated', target.id);
            }

            console.log(`${shooter.name} shot ${target.name}. ${target.name}'s health is now ${target.health}.`);

            // Broadcast the state change to all clients
            io.emit('gameStateUpdate', {
                player: shooter,
                targetPlayer: target,
                allPlayers: Object.values(gameState.players)
            });
        }
    });

    // Event: A player disconnects from the game
    socket.on('disconnect', () => {
        const disconnectedPlayer = gameState.players[socket.id];

        if (disconnectedPlayer) {
            console.log(`${disconnectedPlayer.name} disconnected.`);
            // Remove the player from the game state
            delete gameState.players[socket.id];

            // Broadcast the player's ID to all clients so they can remove them from their UI
            io.emit('playerDisconnected', socket.id);
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});