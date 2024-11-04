require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const searchRoutes = require("./routes/search");

const app = express();
app.use(cors());
app.use(express.json());

// Define routes
app.use("/search", searchRoutes);

const server = http.createServer(app);

// Set up Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Listen for "send_song" event
  socket.on("send_song", (data) => {
    // Emit the data to all other connected clients
    io.emit("receive_song", data);
  });

  // handle disconnection event
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING on http://localhost:${PORT}`);
});
