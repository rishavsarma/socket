const socket = new WebSocket("ws://websocket.backendservices.in");

socket.onopen = () => {
  socket.send("Rishav");
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
