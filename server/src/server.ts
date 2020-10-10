import express, { Application, Response } from 'express';
import path from 'path';
import http, { Server as httpServer } from 'http';
import io, { Server as SocketIOServer } from 'socket.io';
import { config } from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import attachmentRoute from './routes/attachment';

const app: Application = express();
const server: httpServer = http.createServer(app);
const dotEnvConfig: object = config();
const socketIO: SocketIOServer = io(server);

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

socketIO.on('connection', (socket): void => {
  console.log('A user connected');
});

const port: number = parseInt(<string>process.env.PORT) || 5000;
server.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});
