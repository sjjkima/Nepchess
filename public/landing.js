function playNow(){
  window.location="play.html";
}

// Animated counters
function counter(id,end){
  let el=document.getElementById(id);
  let n=0;
  let interval=setInterval(()=>{
    n+=Math.ceil(end/100);
    if(n>=end){ n=end; clearInterval(interval); }
    el.innerText=n;
  },20);
}

// Example live stats
counter("players",1543);
counter("games",8921);
counter("puzzles",4321);

// Hero board preview animation
const board=document.getElementById("heroBoard");
const pieces=["♜","♞","♝","♛","♚","♟","♖","♘","♗","♕","♔","♙"];

for(let r=0;r<8;r++){
  for(let c=0;c<8;c++){
    let sq=document.createElement("div");
    sq.style.background=(r+c)%2?"#769656":"#eeeed2";
    if(Math.random()<0.15){ sq.innerHTML=pieces[Math.floor(Math.random()*pieces.length)]; }
    board.appendChild(sq);
  }
}

// Animate pieces randomly
setInterval(()=>{
  let squares=document.querySelectorAll("#heroBoard div");
  let random=squares[Math.floor(Math.random()*squares.length)];
  random.style.transform="scale(1.2)";
  setTimeout(()=>{random.style.transform="scale(1)";},300);
},700);