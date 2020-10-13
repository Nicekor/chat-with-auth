import express, { Application } from 'express';
import path from 'path';
import http, { Server as httpServer } from 'http';
import io, { Server as SocketIOServer } from 'socket.io';
import { ServerOptionsExtended } from './interfaces/ioServerOptions.interface';
import { config } from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import attachmentRoute from './routes/attachment';
import addresseesRoute from './routes/addressees';
import verifySocketToken from './middlewares/verifySocketToken';
import connection from './socketIO/connection';

// server initialization and configs
const app: Application = express();
const server: httpServer = http.createServer(app);
const dotEnvConfig: object = config();
const socketIO: SocketIOServer = io(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Authorization',
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Credentials': true,
    };
    res.writeHead(200, headers);
    res.end();
  },
} as ServerOptionsExtended);

// static files
app.use(express.static(path.join(__dirname, 'uploads')));

// middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/attachment', attachmentRoute);
app.use('/api/addressees', addresseesRoute);

// socketIO
const chatNamespace = socketIO.of('/chat');
chatNamespace
  .use((socket, next) => verifySocketToken(socket.request, next))
  .on('connection', (socket) => connection(socket, chatNamespace));

const port: number = parseInt(<string>process.env.PORT) || 5000;
server.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});
