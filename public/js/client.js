import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.js";

// Connect to the Socket.IO server
const socket = io();

console.log("Connecting to Socket.IO server...");

// Example player data (this would come from your UI form)
const myPlayerData = {
    playerName: 'PIXEL-PUNK', // This should be a dynamic value from your form
};

// Listen for a successful connection
socket.on('connect', () => {
    console.log("Successfully connected to the server with ID:", socket.id);
    
    // Once connected, immediately join the game
    socket.emit('joinGame', myPlayerData);
});

// Listen for a game state update from the server
socket.on('gameStateUpdate', (data) => {
    // This is the core event for keeping the UI in sync
    console.log("Received Game State Update:", data);

    // You would use this data to update your React UI components
    // For example, update the player list, scores, and health bars
    // You could also specifically update the player who was shot
    if (data.targetPlayer) {
        console.log(`Player ${data.targetPlayer.name} was hit! Health: ${data.targetPlayer.health}`);
    }
});

// Listen for a new player joining
socket.on('playerJoined', (newPlayer) => {
    console.log(`New player joined: ${newPlayer.name}`);
    // Your React UI would add this player to the list
});

// Listen for a player being eliminated
socket.on('playerEliminated', (playerId) => {
    console.log(`Player with ID ${playerId} was eliminated!`);
    // Your React UI would visually mark this player as eliminated
});

// Listen for a player disconnecting
socket.on('playerDisconnected', (playerId) => {
    console.log(`Player with ID ${playerId} disconnected.`);
    // Your React UI would remove this player from the list
});

// --- Dummy UI Interaction for Demonstration ---
// This is just to simulate a player shooting. In your React app, this would be
// triggered by a button click or other game event.

// Function to simulate a shot
function simulateShoot(targetPlayerId) {
    console.log(`Simulating a shot at player with ID: ${targetPlayerId}`);
    socket.emit('playerShoot', targetPlayerId);
}

// To test this, you'll need to know another player's ID.
// Open another browser window/tab to get a second ID.
// Then, from the console of the first window, call:
// simulateShoot('paste-second-player-id-here');

// This simulates a player joining a game and receiving updates.
// Now your React UI needs to listen for these events and render the data.