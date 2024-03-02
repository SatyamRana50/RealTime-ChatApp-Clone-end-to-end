import express from "express";
import {Server} from "socket.io"
import { createServer } from "http";
import bodyParser from "body-parser";
import cors from "cors";
import { mainRouter } from "./routes";

const app=express();
const server= createServer(app)
const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST","PUT, DELETE"],
        credentials:true
    }
})
app.use(cors())
app.use(bodyParser.json());
app.use("/user",mainRouter);

io.on('connection',(socket)=>{
    console.log("user connected", socket.id)
    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id)
    })
    socket.on("message",(msg)=>{
        msg.isChatOwner=false;
        io.emit("response",msg)
    })
})

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});