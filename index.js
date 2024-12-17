import app from './server.js'
import {server, io} from './server.js'
import dotenv from 'dotenv'
import conectarDB from './src/config/db.js'

dotenv.config()

conectarDB()
server.listen(process.env.PORT, () => {
    console.log('Example app listening on port ' + process.env.PORT)
  });
  
  // Configuración de Socket.io
  io.on('connection', (socket) => {
    
    console.log(`New Connection: ${socket.id}`) 

    socket.on('message', (data) => {
        socket.broadcast.emit('message', {
            body: data.body,
            // en vez de from:socket.id que utilice el username del usuario
            from: data.from,
            
        })
    })
})
console.log('Example app listening on port !'+ app.get('port'))