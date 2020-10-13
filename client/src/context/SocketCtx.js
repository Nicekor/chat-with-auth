import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isSocketLoaded, setIsSocketLoaded] = useState(false);

  useEffect(() => {
    if (!socket) {
      const socketIO = io('http://192.168.1.157:5000/chat', {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        },
      }).on('error', (reason) => {
        console.error(reason);
      });
      setSocket(socketIO);
      setIsSocketLoaded(true);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return isSocketLoaded ? (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  ) : null;
};

export default SocketProvider;
