import express, { Application, Response } from 'express';
import http, { Server as httpServer } from 'http';
import io, { Server as SocketIOServer } from 'socket.io';
import { config } from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import authRoute from './routes/auth';

const app: Application = express();
const server: httpServer = http.createServer(app);
const dotEnvConfig: object = config();
const socketIO: SocketIOServer = io(server);

// middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// routes
app.use('/api/auth', authRoute);

socketIO.on('connection', (socket): void => {
  console.log('A user connected');
});

const port: number = parseInt(<string>process.env.PORT) || 5000;
server.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});
