const socket = new WebSocket("wss://websocket.backendservices.in");

socket.onopen = () => {
  socket.send("Parisa");
};


socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

socket.onclose = (error) => {
  console.log("WebSocket closed",error);
};
