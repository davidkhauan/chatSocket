import express, { Application } from 'express'
import http from 'http'
import { Server } from 'socket.io'

class App {
    private app: Application
    private http: http.Server
    private io: Server

    constructor() {
        this.app = express()
        this.http = http.createServer (this.app)
        this.io = new Server (this.http)
        this.listenSocket()
        this.setupRoutes()
    }

    listenServer() {
        this.http.listen (3000, 
            () => console.log ('Servidor está rodando...')
        )
    }
    listenSocket() {
        this.io.on ('connection', (socket) => {
            console.log ('Usuário conectado =>', socket.id)
        
            socket.on ('message', (msg) => {
                console.log ('Mensagem enviada:', msg)
                this.io.emit ('message', msg)
            })
        })
    }

    setupRoutes() {
        this.app.get ('/', (requistion, response) => {
            response.sendFile (__dirname + '/index.html')
        })
    }
}

const app = new App()

app.listenServer()