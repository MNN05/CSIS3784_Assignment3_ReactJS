// src/socket.js
import { io } from 'socket.io-client';

// Use your backend URL here
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

export const socket = io(URL, {
  autoConnect: false, // Set to false if you want to connect manually
});