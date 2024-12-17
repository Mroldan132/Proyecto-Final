import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import router from './src/routes/index.js'

dotenv.config()


const app = express()
export const server = http.createServer(app)
export const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

console.log(`User connected: ${io.engine.clientsCount}`)


// Middlewares
app.use(morgan('dev'))
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    
    }
))


app.use(express.json())
app.use("/api", router);

// Settings
app.set('port', process.env.PORT || 5000)

app.get('/jsonfiles', (req, res) => {
    res.json({message: 'If you stay seeing this, is because the server is running 🚵🏾‍♂️'})
})

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html><html><head><title>Backend Web Page</title></head><body style="background-color:#242424;font-family: Arial, sans-serif;"><h1 style="color: antiquewhite;text-align: center;">If you stay seeing this, is because the server is running 🚵🏾‍♂️</h1><p style="color:antiquewhite;">We made it only with HTML5 from Node.js with Express and Express FileUpload</p></body></html>`)
})


export default app