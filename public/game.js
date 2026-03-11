const socket = io()

const chess = new Chess()

let board
let room
let aiMode = window.location.search.includes("ai=true")

board = Chessboard('board',{
draggable:true,
position:'start',
onDrop:onDrop
})

function onDrop(source,target){

let move = chess.move({
from:source,
to:target,
promotion:'q'
})

if(move===null) return 'snapback'

board.position(chess.fen())

if(aiMode){

fetch("/aiMove",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({fen:chess.fen()})
})
.then(r=>r.json())
.then(data=>{

chess.move(data.move)
board.position(chess.fen())

})

}else{

socket.emit("move",{room:room,move:move})

}

}

socket.on("gameStart",(data)=>{

room = data.room

})

socket.on("move",(move)=>{

chess.move(move)
board.position(chess.fen())

})