const WebSocket = require("ws");

const PORT = process.env.PORT || 8080; // Use the port provided by Render
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`); // Echo back to the client
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server running on port ${PORT}`);
