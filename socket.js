const { channel } = require("diagnostics_channel");

const socket = new WebSocket("ws://localhost:8080");

// Send text to all users through the server
function sendText() {
  const msg = {
    type: "channel",
    channel: "trendingcut/1",
    date: Date.now(),
  };
  socket.send(JSON.stringify(msg));
}

socket.onopen = () => {
  sendText();
};

socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = () => {
  console.log("WebSocket closed");
};
