const WebSocket = require('ws');
const axios = require('axios');

const wsServer = new WebSocket.WebSocketServer({ port: '8080' });
const apiClient = axios.create({
  baseURL: 'http://localhost:4000/',
});

wsServer.on('connection', (ws) => {
  console.log(`New connection ${new Date()}`);

  ws.on('message', (action) => {
    const { type, payload } = JSON.parse(action);
    let messageId;

    switch (type) {
      case 'connect': {
        if (payload?.channelId) {
          ws.channelId = payload.channelId;
        }

        if (payload?.postId) {
          ws.postId = payload.postId;
        }

        break;
      }
      case 'message': {
        messageId = Date.now();

        wsServer.clients.forEach((client) => {
          if (
            client?.channelId === payload.channelId &&
            client.readyState === WebSocket.OPEN
          ) {
            client.send(
              JSON.stringify({
                type: 'message',
                payload: {
                  id: messageId,
                  ...payload,
                },
              })
            );
          }
        });

        apiClient.post('/messages', {
          id: messageId,
          channelId: payload.channelId,
          content: payload.content,
          username: payload.username,
        });

        messageId = undefined;
        break;
      }
      case 'typing': {
        wsServer.clients.forEach((client) => {
          if (
            client !== ws &&
            client?.channelId === payload.channelId &&
            client.readyState === WebSocket.OPEN
          ) {
            client.send(
              JSON.stringify({
                type: 'typing',
                payload: {
                  username: payload.username,
                },
              })
            );
          }
        });

        break;
      }
      case 'incrementLike': {
        wsServer.clients.forEach((client) => {
          if (
            client?.postId === payload.postId &&
            client.readyState === WebSocket.OPEN
          ) {
            client.send(
              JSON.stringify({
                type: 'incrementLike',
                payload: {
                  likes: payload.likes + 1,
                },
              })
            );
          }
        });

        apiClient.patch(`/posts/${payload.postId}`, {
          likes: payload.likes + 1,
        });

        break;
      }
      default: {
        console.log(`Unknown action type: ${type}`);
        break;
      }
    }
  });

  ws.on('close', () => {
    console.log(`Disconnect ${new Date()}`);
  });
});
