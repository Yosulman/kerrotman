const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" , methods: ["GET", "POST"]} })
const PORT = process.env.PORT || 3000;   


const players = {}


io.on("connection", socket => {
    players[socket.id] = { rect: { x: 100, y: 100, w: 100, h: 100 }, vx: 0, vy: 0, side: false, dir: 0, delay: 0, state: "natural", normalattack: 0, strongattack: 0, health: 100, stancetype: 0, attack: false, body: 0, face: 0 }
    console.log(socket.id)
    io.emit("players", players)
    socket.on("give", data => {
        console.log(data)
        players[socket.id] = data
        io.emit("players", players)
    })
    socket.on("hit", data => {
        io.emit("hit", data)
    })
    socket.on("disconnect", () => {
        delete players[socket.id]
        io.emit("players", players)
    })
})

server.listen(PORT, () => {
    console.log("서버 실행")
})
