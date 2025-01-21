import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { initiateSocket, getSocket } from "../utils/socket";

import styles from "./../styles/data.module.css"; // Import the CSS file for styling

initiateSocket(); // Initialize the socket connection
const socket = getSocket(); // Retrieve the socket instance

export default function DataPage() {
  // State to store the data for the chart
  const [chartData, setChartData] = useState([]);
  // State to dynamically adjust the chart's width
  const [chartWidth, setChartWidth] = useState(600);
  // State to store the latest random number received
  const [currentNumber, setCurrentNumber] = useState(0);
  // State to track the countdown timer
  const [countdown, setCountdown] = useState(10);

  // Handle socket connections and data updates
  useEffect(() => {
    initiateSocket(); // Initialize the socket connection
    const socket = getSocket(); // Retrieve the socket instance
    // Join the specific room on the server
    socket.emit("joinRoom", "randomNumbersRoom");

    // Listen for the "newNumber" event to receive a random number and reset the timer
    socket.on("newNumber", ({ randomNumber, timer }) => {
      const timestamp = new Date().toLocaleTimeString(); // Current timestamp
      setCurrentNumber(randomNumber); // Update the current random number
      setCountdown(timer); // Reset the timer
      setChartData((prev) => [
        ...prev,
        { timestamp, value: randomNumber }, // Add the new data to the chart
      ]);
    });

    // Listen for the "updateTimer" event to update the countdown
    socket.on("updateTimer", ({ timer }) => {
      setCountdown(timer);
    });

    // Cleanup the socket listeners when the component unmounts
    return () => {
      socket.off("newNumber");
      socket.off("updateTimer");
    };
  }, []);

  // Dynamically adjust the chart's width when the window is resized
  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        document.getElementById("chart-container").offsetWidth;
      setChartWidth(containerWidth - 20); // Update chart width with a margin
    };

    handleResize(); // Adjust width on the initial render
    window.addEventListener("resize", handleResize); // Listen for window resize events

    // Cleanup the resize event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Page heading */}
      <h1 className={styles.header}>
        Real-Time Randomizer with Line Chart and Countdown Timer
      </h1>

      {/* Display the current random number and countdown timer */}
      <div className={styles.animatedNumber}>
        {/* Display the current random number */}
        <div>{currentNumber}</div>
        {/* Display the countdown timer */}
        <div className={styles.countdownText}>
          Countdown: <span className={styles.countdownValue}>{countdown}</span>{" "}
          Seconds
        </div>
      </div>

      {/* Container for the line chart */}
      <div id="chart-container" className={styles.chartContainer}>
        <LineChart
          width={chartWidth} // Dynamic width based on window size
          height={500} // Fixed height
          data={chartData} // Data for the chart
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
        >
          {/* Add a grid to the chart */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-axis configuration */}
          <XAxis
            dataKey="timestamp" // Data key for X-axis
            label={{
              value: "Time", // Label for the X-axis
              position: "insideBottom", // Position the label
              offset: -90, // Offset for spacing
              style: { fontSize: "16px", fill: "#ffffff", fontWeight: "bold" },
            }}
            angle={-90} // Rotate X-axis labels
            textAnchor="end"
            tick={{
              fontSize: 16,
              fill: "white",
            }}
            tickLine={{ stroke: "white", strokeWidth: 2 }} // Customize tick lines
          />
          {/* Y-axis configuration */}
          <YAxis
            label={{
              value: "Random Number", // Label for the Y-axis
              angle: -90, // Rotate vertically
              position: "insideLeft", // Position the label inside
              style: { fontSize: "16px", fill: "#ffffff", fontWeight: "bold" },
            }}
            tick={{
              fontSize: 16,
              fill: "white",
            }}
            tickLine={{ stroke: "white", strokeWidth: 2 }} // Customize tick lines
          />
          {/* Tooltip to display data on hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#2c3e50", // Tooltip background color
              borderRadius: "10px", // Rounded corners
              border: "1px solid #ffffff", // Border styling
              color: "white", // Text color
            }}
            itemStyle={{
              color: "#1abc9c", // Tooltip item color
              fontSize: "16px", // Tooltip item font size
              fontWeight: "bold", // Bold text
            }}
            labelStyle={{
              color: "#f39c12", // Label text color
              fontSize: "16px", // Label font size
              fontWeight: "bold", // Bold label text
            }}
          />
          {/* Line representing the data */}
          <Line
            type="monotone" // Smooth line
            dataKey="value" // Data key for the Y-axis
            stroke="yellow" // Line color
            strokeWidth={3} // Line thickness
            activeDot={{ r: 8 }} // Highlighted dot on hover
          />
        </LineChart>
      </div>

      {/* Table to display data in tabular format */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Random Number</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through chart data to display each entry */}
            {chartData.map((data, index) => (
              <tr key={index}>
                <td>{data.value}</td>
                <td>{data.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
