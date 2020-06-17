import express, { Application, Request, Response, NextFunction } from 'express'
import http, { Server as httpServer } from 'http';
import io, { Server as SocketIOServer } from 'socket.io';
import { config } from 'dotenv'

const app: Application = express();
const server: httpServer = http.createServer(app);
const dotEnvConfig: object = config();
const socketIO: SocketIOServer = io(server);

// middlewares
app.use(express.json())

socketIO.on('connection', (socket): void => {
  console.log('A user connected')
})

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
server.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
})