const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

const clients = []; // Store connected clients

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.channel = null;

  // Handle messages from clients
  ws.on("message", (message) => {
    const msg = JSON.parse(message);

    if (msg.type === "channel") {
      ws.channel = msg.channel;
      console.log(`Client assigned to channel: ${ws.channel}`);
    }

    // Send message to clients in the same channel
    if (ws.channel && msg.channel === ws.channel) {
      clients.forEach((client) => {
        if (client !== ws && client.channel === msg.channel) {
          client.send(JSON.stringify(msg)); // Send message to matching clients
        }
      });
    }
  });

  // Add client to clients array
  clients.push(ws);

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1); // Remove the client from the array
    }
  });
});

console.log(`WebSocket server running on port ${PORT}`);
