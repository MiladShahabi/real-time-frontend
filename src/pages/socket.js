import { io } from "socket.io-client"; // Import the Socket.IO client library

let socket; // Variable to store the socket connection

// Function to initialize the socket connection
export const initiateSocket = () => {
  if (!socket) {
    // If the socket is not already initialized, create a new connection
    socket = io("http://localhost:3001"); // Replace with your backend URL if different
  }
};

// Function to retrieve the socket instance
export const getSocket = () => socket; // Returns the current socket instance
