import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

let conversationSocket = null;

export const initConversationSocket = (token) => {
  if (conversationSocket) {
    return conversationSocket;
  }

  conversationSocket = io(SOCKET_URL, {
    transports: ['websocket'],
    path: '/socket.io/',
    port: 6000,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelayMax: 50000,
    timeout: 120000,
    withCredentials: false,
    auth: {
      access_token: token
    }
  })

  conversationSocket.on("connect", () => {
    console.log("Socket connected");
  });

  return conversationSocket;
}

export const disconnectConversationSocket = () => {
  if (conversationSocket && conversationSocket.connected) {
    conversationSocket.disconnect();
    console.log("Socket disconnected");
    conversationSocket = null;
  }
}

