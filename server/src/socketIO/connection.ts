import io from 'socket.io';

const connection = async (
  socket: io.Socket,
  chatNamespace: io.Namespace
): Promise<void> => {
  const userId: string = socket.request.authData.userId;

  socket.on('joinRoom', (addresseeId: string) => {
    const room: string = [userId, addresseeId].sort().join('&');
    socket.join(room);

    socket.on('sendMessage', (message: string, cb: () => void) => {
      chatNamespace.to(room).emit('message', {
        author: userId,
        text: message.trim(),
      });
      cb();
    });
  });

  socket.on('leaveRoom', (addresseeId: string) => {
    const room: string = [userId, addresseeId].sort().join('&');
    socket.leave(room);
  });

  socket.on('disconnect', (reason) => {
    console.error('user disconnected');
    console.error(reason);
  });
};

export default connection;
