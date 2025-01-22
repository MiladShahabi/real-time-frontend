
# **Real-Time Random Number Viewer**

## **Project Overview**
This project is a two-page web application built using **Next.js** and **Node.js**. It demonstrates real-time communication between a backend server and a frontend client. The backend sends random numbers to a "room" every 10 seconds using **Socket.IO**, and the frontend dynamically displays these numbers in real time. In addition to the original requirements, I extended the project with several creative features, which are detailed below.

---

## **Steps to Complete the Project**

### **1. Planning**
- [ ] Review the project requirements.
- [ ] Identify tools and libraries to be used:
  - Backend: Node.js, Express, Socket.IO.
  - Frontend: Next.js, Socket.IO-client, Recharts (for charts), CSS (for styling).
- [ ] Plan project structure:
  - Separate backend and frontend repositories.
  - Use modular file organization.

---

### **2. Backend Setup**

#### **Environment Setup**
- [ ] Install Node.js on the development machine.
- [ ] Initialize a new Node.js project:
  ```bash
  npm init -y
  ```
- [ ] Install required dependencies:
  ```bash
  npm install express socket.io cors
  ```

#### **Server Implementation**
- [ ] Set up an Express server.
- [ ] Configure `Socket.IO` for real-time communication.
- [ ] Handle client connections and room joining:
  - [ ] `connection`: Log when a client connects.
  - [ ] `joinRoom`: Allow clients to join a specific room.
  - [ ] `disconnect`: Log when a client disconnects.
- [ ] Create a timer that:
  - [ ] Counts down from 10 to 0.
  - [ ] Sends a random number and resets the timer at 0.
  - [ ] Updates clients with the timer value every second.
- [ ] Test the backend to ensure it broadcasts the correct events:
  - `newNumber` for random numbers and timer resets.
  - `updateTimer` for countdown updates.

---

### **3. Frontend Setup**

#### **Initialize the Project**
- [ ] Create a Next.js project:
  ```bash
  npx create-next-app real-time-app-frontend
  ```
- [ ] Install Socket.IO-client:
  ```bash
  npm install socket.io-client recharts
  ```

#### **Main Page (/)** 
- [ ] Create the Main Page component.
- [ ] Add a welcome message.
- [ ] Create a button to navigate to `/data`.

#### **Data Page (/data)**
- [ ] Create the Data Page component.
- [ ] Integrate the `socket.js` utility:
  - [ ] Add functions for initializing and retrieving the socket instance.
- [ ] Implement real-time updates:
  - [ ] Join the "randomNumbersRoom".
  - [ ] Listen for `newNumber` and `updateTimer` events.
  - [ ] Update the displayed random number and timer dynamically.

#### **Enhance the UI**
- [ ] Style the pages using CSS modules:
  - Main Page: Simple design with a button.
  - Data Page: Responsive layout with chart and table.
- [ ] Use blue-and-white color codes with an Arctic water source background.

#### **Additional Features**
- [ ] Add a **countdown timer** synchronized with the backend.
- [ ] Implement a **line chart** to visualize random number trends.
- [ ] Create a **table** to display random numbers with timestamps.

---

### **4. Deployment**

#### **Set Up VPS**
- [ ] Acquire a Virtual Private Server (VPS).
- [ ] Set up the server environment:
  - [ ] Install Node.js.
  - [ ] Install Nginx as a web server.
  - [ ] Install PM2 for managing Node.js processes.

#### **Deploy the Backend**
- [ ] Transfer backend code to the VPS.
- [ ] Start the backend using PM2:
  ```bash
  pm2 start server.js
  ```

#### **Deploy the Frontend**
- [ ] Transfer frontend code to the VPS.
- [ ] Build the Next.js application:
  ```bash
  npm run build
  ```
- [ ] Start the frontend application using PM2.

#### **Set Up Nginx**
- [ ] Configure Nginx as a reverse proxy:
  - [ ] Route `/` to the frontend.
  - [ ] Route `/api` to the backend.
- [ ] Secure the application with an SSL certificate:
  - [ ] Install Certbot.
  - [ ] Obtain and configure an SSL certificate.
- [ ] Test the deployment by accessing the application via the custom domain with HTTPS.

---

## **Enhancements Beyond the Requirements**

### **1. Real-Time Countdown Timer**
I added a countdown timer synchronized with the backend, ensuring complete alignment with random number updates.

### **2. Line Chart Visualization**
Using **Recharts**, I implemented a line chart that dynamically updates to show trends in random numbers over time.

### **3. Data Table with Timestamps**
To provide historical context, I included a table displaying each random number alongside its timestamp.

### **4. UI Design Inspired by Watergenics**
- Designed a blue-and-white theme to match the spirit of Watergenics.
- Added an Arctic water source background for thematic relevance.

---

## **Challenges Faced and Solutions**

### **Challenge 1: Timer Synchronization**
#### **Problem**
- [ ] The countdown timer was initially implemented on the **frontend**, starting when the Data Page loaded.
- [ ] This caused a mismatch with the backend timer, which reset every 10 seconds.

#### **Troubleshooting**
- [ ] Investigated the root cause by checking the flow of timer logic between frontend and backend.
- [ ] Observed that the frontend started its own timer independently, leading to discrepancies.

#### **Solution**
- [ ] Moved the timer logic to the **backend**:
  - [ ] Updated the backend to include the timer value in the `newNumber` event.
  - [ ] Modified the frontend to receive and display the timer value from the backend instead of maintaining its own timer.
- [ ] Tested the solution by ensuring the frontend timer reset perfectly with the backend's updates.

---

### **Challenge 2: Duplicate Room Join Requests**
#### **Problem**
- [ ] Upon navigating to the **Data Page**, the `joinRoom` event was emitted twice.
- [ ] This caused the backend to log duplicate `User joined room: randomNumbersRoom` messages.
- [ ] The issue occurred because **React Strict Mode** in development caused `useEffect` to run twice.

#### **Troubleshooting**
- [ ] Analyzed the behavior of `useEffect` and found that it was being executed twice in development mode.
- [ ] Confirmed the issue was caused by **React Strict Mode**, which intentionally mounts and unmounts components twice to catch potential bugs.

#### **Solution**
- [ ] Disabled **React Strict Mode** in the `next.config.js` file by setting:
  ```javascript
  const nextConfig = {
    reactStrictMode: false,
  };
  module.exports = nextConfig;
  ```
- [ ] Verified that `useEffect` only executed once after the change.
- [ ] Tested the solution to ensure only a single `joinRoom` event was emitted.

---

## **Conclusion**
This project successfully demonstrates real-time data synchronization using Socket.IO. Through thoughtful planning and problem-solving, I enhanced the application beyond the original requirements, delivering a professional and visually appealing solution.