import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

let callSocket = null;

export const initCallSocket = () => {
  if (callSocket) {
    return callSocket;
  }

  callSocket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    path: '/socket.io/call',
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelayMax: 50000,
    timeout: 120000,
    withCredentials: true,
  })

  callSocket.on("connect", () => {
    console.log("Call socket connected");
  });
  return callSocket;
}

export const disconnectCallSocket = () => {
  if (callSocket && callSocket.connected) {
    callSocket.disconnect();
    console.log("Call socket disconnected");
    callSocket = null;
  }
}
