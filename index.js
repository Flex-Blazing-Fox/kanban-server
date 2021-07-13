require("dotenv").config();
const express = require("express");
const routers = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);
app.use(errorHandler);

const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server: server });
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// module.exports = app.listen(PORT, () => {
//   console.log(`listening to port ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
