// src/utils/socket.js
import { io } from "socket.io-client"; // Import the Socket.IO client library

let socket; // Variable to store the socket connection

// Backend URLs for local and production
const LOCAL_URL = "http://localhost:3001"; // Local backend URL
const NETWORK_URL = "https://api.miladshahabi.de"; // Network backend URL

// Function to initialize the socket connection
export const initiateSocket = () => {
  if (!socket) {
    // Choose the URL based on the environment
    const backendUrl =
      process.env.NODE_ENV === "production" ? NETWORK_URL : LOCAL_URL;

    socket = io(backendUrl, {
      secure: process.env.NODE_ENV === "production", // Secure connection for production
      transports: ["websocket"], // Use WebSocket as the primary transport
    });
  }
};

// Function to retrieve the socket instance
export const getSocket = () => socket; // Returns the current socket instance
