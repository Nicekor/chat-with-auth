import io from 'socket.io';

export interface ServerOptionsExtended extends io.ServerOptions {
  handlePreflightRequest: (req, res) => void;
}
