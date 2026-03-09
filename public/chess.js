let chessContainer = document.querySelector('.chessContainer')
let chessBox = document.querySelectorAll('.chessBox')
let n = 0;
let z = 0;
let selected = [];
//add X,Y Coordinate to chessBox
for (let index = 1; index <= 8; index++) {
    for (let j = 1; j <= 8; j++) {
        let numberIndex = n + 1;
        if ((numberIndex % 2) == z) {
            chessBox[n].style.backgroundColor = '#f9e4bc'
        } else {
            chessBox[n].style.backgroundColor = '23a86a';
        }
        chessBox[n].id = `${index},${j}`;
        n++
    }
    if (z == 0) {
        z = 1
    } else {
        z = 0;
    }
}
// place the chess Piece on there place
chessBox.forEach((value, index) => {
    let x_Coordinate = parseInt(chessBox[index].id.split(',')[0]);
    let y_Coordinate = parseInt(chessBox[index].id.split(',')[1]);
    //place the black pawn
    if (x_Coordinate == 2) {
        let pawnImg = document.createElement('img');
        pawnImg.id = 'B_pawn';
        pawnImg.src = 'black_Images/Pawn.png';
        chessBox[index].appendChild(pawnImg);
    }
    //place the white pawn 
    if (x_Coordinate == 7) {
        let pawnImg = document.createElement('img');
        pawnImg.id = 'W_pawn';
        pawnImg.src = 'white_Images/Pawn.png';
        chessBox[index].appendChild(pawnImg);
    }
})
//Func to display the 1 and 8 column pieces
let pieceDisplay = (X, Y, pieceName, pColor) => {
    let pieceImg = document.createElement('img');
    if (pColor == 'white') {
        pieceImg.id = 'W_piece';
        pieceImg.src = `white_Images/${pieceName}.png`;
    } else {
        pieceImg.id = 'B_piece';
        pieceImg.src = `black_Images/${pieceName}.png`;
    }
    //select the chessBox by X,Y Coordinate
    let tempChessBox = document.getElementById(`${X},${Y}`);
    tempChessBox.appendChild(pieceImg)
}
// Create the rest Pieces 
let pieceArr = ['Rook', 'Knight', 'Bishop', 'King', 'Queen'];
let altrN = [1, 8];
altrN.forEach((value, index) => {
    pieceArr.forEach((val, ind) => {
        let x_Axis = altrN[index];
        let y_Axis = ind + 1;
        let pieceColor = '';
        if (altrN[index] == 1) {
            pieceColor = 'black';
        } else {
            pieceColor = 'white';
        }
        pieceDisplay(x_Axis, y_Axis, pieceArr[ind], pieceColor)
        if (ind <= 2) {
            let copyYAxis = 8 - ind;
            pieceDisplay(x_Axis, copyYAxis, pieceArr[ind], pieceColor)
        }
    })
})
let turnB= true; // true for white turn and false for black turn
let turnW= true;
let chanceB= true;
let chanceW= true;
let pcsMoved = false;
// add event listener to chessBox
chessBox.forEach((value, index) => {
    chessBox[index].addEventListener('click', (e) => {
        let classlength = chessBox[index].classList;
        let chessBoxChild = chessBox[index].children;
        for (let ind = 0; ind < classlength.length; ind++) {
            if (classlength[ind] == 'nextSelected') {
                pcsMoved = true;
                if(selected[2] == 'Pawn.png'){
                    pawnPromotion(selected,chessBox[index])
                }

                if (chessBoxChild.length != 0) {
                    winnerCheck(selected,chessBox[index])
                    let x_Axis = parseInt(chessBox[index].id.split(',')[0]);
                    let y_Axis = parseInt(chessBox[index].id.split(',')[1]);
                    let pieceId = `${x_Axis},${y_Axis}`
                    pieceMover(pieceId)
                    pieceEliminate(x_Axis, y_Axis)
                    pieceRemover()
                    cleaner();
                    return
                } else {
                    let pieceid = e.target.id;
                    pieceMover(pieceid);
                    pieceRemover()
                }
            }

        }
        cleaner()

        if (e.target.src != undefined) {
            let pieceName = e.target.src.split('/').slice(-1)[0]
            let colorPiece = chessBox[index].children[0].id.split('_')[0];
            let x_Axis = parseInt(chessBox[index].id.split(',')[0])
            let y_Axis = parseInt(chessBox[index].id.split(',')[1])
            
            if(colorPiece =='B'){
                console.log('enter in black');
                if(turnW == true && turnB == false){
                    chanceB= false
                }
                if (turnB == true && turnW == true) {
                    console.log('both true');
                    turnB = false;
                    turnW = true;
                    chanceB= true
                }
                if (turnW == false && turnB == true && pcsMoved == true) {
                    pcsMoved = false
                    turnW = true;
                    turnB = false;
                    chanceB= false;
                }
                if (turnW == false && turnB == true && pcsMoved == false) {
                    chanceB = false;
                }
                if (turnW == true && turnB == false && pcsMoved == false) {
                    turnB = false;
                    turnW = true;
                    chanceB = true;
                }
            }
            if(colorPiece =='W'){
                console.log('enter in white');
                if(turnW == false && turnB == true){
                    chanceW= false;
                }
                if (turnB == true && turnW == true) {
                    turnB = true;
                    turnW = false;
                    chanceW= true
                }
                if (turnW == true && turnB == false && pcsMoved == true) {
                    pcsMoved = false;
                    turnW = false;
                    turnB = true;
                    chanceW= true;
                }
                if (turnW == true && turnB == false && pcsMoved == false) {
                    chanceW = false;
                }
                if (turnW == false && turnB == true && pcsMoved == false) {
                    turnB = true;
                    turnW = false;
                    chanceW = true;
                }
            }
         
            // first hand the pawn Movement
            if((colorPiece == 'W' && chanceW == true) || (colorPiece == 'B' && chanceB == true)){
            if (pieceName == 'Pawn.png') {
                pawnHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if (pieceName == 'Rook.png') {
                rookHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if (pieceName == 'Knight.png') {
                knightHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if (pieceName == 'Bishop.png') {
                bishopHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if (pieceName == 'King.png') {
                kingHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
            if (pieceName == 'Queen.png') {
                queenHandler(x_Axis, y_Axis, colorPiece, pieceName)
            }
        }
        }
    })
})
let winnerCheck = (select,clickedChessBox) =>{
    let pieceName = clickedChessBox.firstElementChild.src.split('/').slice(-1)[0];
    let colorPiece = clickedChessBox.firstElementChild.id.split('_')[0];
    if(pieceName == 'King.png'){
        if (select[3] !== colorPiece) {
            let winnerContainer = document.querySelector('.winnerContainer')
            let winnerName = document.getElementById('Winner')
            if(select[3] == 'W'){
                winnerName.innerText = 'White Piece Win The Game'
            }else{
                winnerName.innerText = 'Black Piece Win The Game'
            }
            winnerContainer.style.display = 'flex'
        }
    }
}
let resetBtn = document.getElementById('resetBtn')
resetBtn.addEventListener('click',()=>{
    turnB= true; // true for white turn and false for black turn
    turnW= true;
    chanceB= true;
    chanceW= true;
    pcsMoved = false;
    selected = [];
    let winnerContainer = document.querySelector('.winnerContainer')
    winnerContainer.style.display = 'none'
    window.location.reload();
})
let queenHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    bishopHandler(x_Axis, y_Axis, colorPiece, pieceName)
    rookHandler(x_Axis, y_Axis, colorPiece, pieceName)
}
let kingHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    console.log('you clicked');

    let changeX = 1;
    let changeY = 1;
    let tempChessBox, tempX, tempY;
    let checkX = true;
    let checkY = true;
    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    //for diagonal function
    for (let i = 1; i <= 4; i++) {
        checkX = true;
        checkY = true;
        if (i % 2 == false) {
            changeX = (changeX == 1) ? -1 : 1;
            changeY = changeX
        } else {
            changeY = (changeY == 1) ? -1 : 1;
            changeX = -1 * changeY;
        }
        tempX = changeX;
        tempY = changeY;
        tempChessBox = document.getElementById(`${x_Axis + tempX},${y_Axis + tempY}`)
        if (tempChessBox != undefined) {
            if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {
                checkX = false;
            }
            if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] != selected[3])) {
                if (checkX == true) {
                    tempChessBox.classList.add('nextSelected');
                }
                checkX = false;
            }
            if (checkX == true) {
                tempChessBox.classList.add('nextSelected');
            }
        }
    }
    //for the horizontal and vertical direction
    for (let i = 1; i <= 4; i++) {
        if (i % 2 == false) {
            changeX = (changeX == 1) ? -1 : 1;
            checkX = true
        } else {
            changeY = (changeY == 1) ? -1 : 1;
            checkY = true;
        }
        if (i % 2 == false) {
            tempChessBox = document.getElementById(`${x_Axis + changeX},${y_Axis}`)
            if (tempChessBox != undefined) {
                if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {
                    checkX = false;
                }
                if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] != selected[3])) {
                    if (checkX == true) {
                        tempChessBox.classList.add('nextSelected');
                    }
                    checkX = false;
                }
                if (checkX == true) {
                    tempChessBox.classList.add('nextSelected');
                }
            }
        }


        if (i % 2 == 0) {
            tempChessBox = document.getElementById(`${x_Axis},${y_Axis + changeY}`)
            if (tempChessBox != undefined) {
                if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {
                    checkY = false;
                }
                if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] != selected[3])) {
                    if (checkY == true) {
                        tempChessBox.classList.add('nextSelected');
                    }
                    checkY = false;
                }
                if (checkY == true) {
                    tempChessBox.classList.add('nextSelected');
                }
            }

        }


    }

}
let knightHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {


    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    let changeX = 1;
    let changeY = 1;
    let tempChessBox, n;
    for (let i = 1; i <= 4; i++) {
        if (i % 2 == false) {
            changeX = (changeX == 1) ? -1 : 1
        } else {
            changeY = (changeY == 1) ? -1 : 1
        }
        for (let j = 1; j <= 4; j++) {
            if (i % 2 == false) {
                if (j <= 2) {
                    n = changeX * j
                    tempChessBox = document.getElementById(`${x_Axis + n},${y_Axis}`)
                    console.log(tempChessBox);

                } else {
                    changeY = (changeY == 1) ? -1 : 1;
                    tempChessBox = document.getElementById(`${x_Axis + n},${y_Axis + changeY}`)
                    if (tempChessBox != undefined) {
                        if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {

                        } else {
                            tempChessBox.classList.add('nextSelected')
                        }
                    }
                }
            }
            if (i % 2 == 0) {
                if (j <= 2) {
                    n = changeY * j;
                    tempChessBox = document.getElementById(`${x_Axis},${y_Axis + n}`)

                } else {
                    changeX = (changeX == 1) ? -1 : 1;
                    tempChessBox = document.getElementById(`${x_Axis + changeX},${y_Axis + n}`)
                    if (tempChessBox != undefined) {
                        if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {

                        } else {
                            tempChessBox.classList.add('nextSelected')
                        }
                    }
                }
            }
        }
    }
}
//let make Bishop Handler Function
let bishopHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    let changeX = 1;
    let changeY = 1;
    let tempChessBox;
    let checkX = true;
    let checkY = true;
    let tempX, tempY;
    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    for (let i = 1; i <= 4; i++) {
        checkX = true;
        checkY = true;
        if (i % 2 == false) {
            changeX = (changeX == 1) ? -1 : 1;
            changeY = changeX;
        }
        if (i % 2 == true) {
            changeY = (changeY == 1) ? -1 : 1;
            changeX = -1 * changeY;
        }
        for (let j = 1; j <= 8; j++) {
            if (i % 2 == false) {
                tempX = changeX * j;
                tempY = changeY * j;
                tempChessBox = document.getElementById(`${x_Axis + tempX},${y_Axis + tempY}`)
                if (tempChessBox != undefined) {
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {
                        checkX = false;
                    }
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] != selected[3])) {
                        if (checkX == true) {
                            tempChessBox.classList.add('nextSelected');
                        }
                        checkX = false;
                    }
                    if (checkX == true) {
                        tempChessBox.classList.add('nextSelected');
                    }
                }

            }
            if (i % 2 == true) {
                tempX = changeX * j;
                tempY = changeY * j;
                tempChessBox = document.getElementById(`${x_Axis + tempX},${y_Axis + tempY}`)
                if (tempChessBox != undefined) {
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {
                        checkX = false;
                    }
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] != selected[3])) {
                        if (checkX == true) {
                            tempChessBox.classList.add('nextSelected');
                        }
                        checkX = false;
                    }
                    if (checkX == true) {
                        tempChessBox.classList.add('nextSelected');
                    }
                }
            }
        }

    }

}
// let make rook Handler function
let rookHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    let changeX = 1;
    let changeY = 1;
    let tempChessBox;
    let checkX = true;
    let checkY = true;
    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    for (let i = 1; i <= 4; i++) {
        if (i % 2 == false) {
            changeX = (changeX == 1) ? -1 : 1
            checkX = true;
        } else {
            changeY = (changeY == 1) ? -1 : 1
            checkY = true;
        }
        for (let j = 1; j <= 8; j++) {
            if (i % 2 == false) {
                n = changeX * j
                tempChessBox = document.getElementById(`${x_Axis + n},${y_Axis}`)
                if (tempChessBox != undefined) {
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {
                        checkX = false;
                    }
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] != selected[3])) {
                        if (checkX == true) {
                            tempChessBox.classList.add('nextSelected');
                        }
                        checkX = false
                    }
                    if (checkX == true) {
                        tempChessBox.classList.add('nextSelected')
                    }
                }
            }
            if (i % 2 == 0) {
                n = changeY * j
                tempChessBox = document.getElementById(`${x_Axis},${y_Axis + n}`)
                if (tempChessBox != undefined) {
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] == selected[3])) {
                        checkY = false;
                    }
                    if ((tempChessBox.firstElementChild != null) && (tempChessBox.firstElementChild.id.split('_')[0] != selected[3])) {
                        if (checkY == true) {
                            tempChessBox.classList.add('nextSelected');
                        }
                        checkY = false
                    }
                    if (checkY == true) {
                        tempChessBox.classList.add('nextSelected')
                    }
                }
            }
        }
    }
}

//CREATE FUNCTION FOR PAWN PROMOTION 
let pawnPromotion = (select, clickedChessBox) => {
    const clickedX = parseInt(clickedChessBox.id.split(",")[0]);
    const clickedY = parseInt(clickedChessBox.id.split(",")[1]);
    let pawnKnight = document.getElementById('pawnKnight')
    let pawnBishop = document.getElementById('pawnBishop')
    let pawnRook = document.getElementById('pawnRook')
    let pawnQueen = document.getElementById('pawnQueen')
    let pawnPromotionContainer = document.querySelector('.pawnPromotionContainer')
    let imgContainer = document.querySelectorAll('.imgContainer')
    if (select[3] == 'W' && clickedX == 1) {
        pawnBishop.src = "white_Images/Bishop.png";
        pawnKnight.src = "white_Images/Knight.png";
        pawnRook.src = "white_Images/Rook.png";
        pawnQueen.src = "white_Images/Queen.png";
    } else if (select[3] == 'B' && clickedX == 8) {
        pawnBishop.src = "black_Images/Bishop.png";
        pawnKnight.src = "black_Images/Knight.png";
        pawnRook.src = "black_Images/Rook.png";
        pawnQueen.src = "black_Images/Queen.png";
    }
    if (clickedX == 1 || clickedX == 8) {
        pawnPromotionContainer.style.display = 'flex';
    }
    imgContainer.forEach((value,index)=>{
        imgContainer[index].addEventListener('click',()=>{
            let tempChessBox = document.getElementById(`${clickedX},${clickedY}`)
            if (imgContainer[index].firstElementChild !== undefined && tempChessBox.firstElementChild !== undefined && (clickedX == 1 || clickedX == 8)) {
                let optionSrc = imgContainer[index].firstElementChild.src;
                tempChessBox.firstElementChild.src = optionSrc;
                pawnPromotionContainer.style.display = 'none';
            }
        })
    })
}
// let create the pawn handler Function to Handle the pawn Movement
let pawnHandler = (x_Axis, y_Axis, colorPiece, pieceName) => {
    selected = [x_Axis, y_Axis, pieceName, colorPiece];
    if ((x_Axis == 2 && colorPiece == 'B') || (x_Axis == 7 && colorPiece == 'W')) {
        if (colorPiece == 'W') {
            for (let index = 1; index <= 2; index++) {
                let tempChessBox = document.getElementById(`${x_Axis - index},${y_Axis}`)
                if (tempChessBox.children.length != 0) {
                    return
                }
                if (tempChessBox.children.length == 0) {
                    tempChessBox.classList.add('nextSelected');
                }

            }
        } else if (colorPiece == 'B') {
            for (let index = 1; index <= 2; index++) {
                let tempChessBox = document.getElementById(`${x_Axis + index},${y_Axis}`)
                if (tempChessBox.children.length != 0) {
                    return
                }
                if (tempChessBox.children.length == 0) {
                    tempChessBox.classList.add('nextSelected');
                }

            }
        }
    } else {
        //After pawn on first step it only able to move one step
        if (colorPiece == 'W') {
            let tempChessBox = document.getElementById(`${x_Axis - 1},${y_Axis}`);


            if (tempChessBox.children.length == 0) {
                tempChessBox.classList.add('nextSelected');
            }
        } else if (colorPiece == 'B') {
            let tempChessBox = document.getElementById(`${x_Axis + 1},${y_Axis}`);
            if (tempChessBox.children.length == 0) {
                tempChessBox.classList.add('nextSelected');
            }
        }
    }
    let n = 1;
    if (colorPiece == 'W') {
        for (let index = 1; index <= 2; index++) {
            let pieceIdSideOpp = `${x_Axis - 1},${y_Axis + n}`
            let tempChessBox = document.getElementById(`${pieceIdSideOpp}`);

            if (tempChessBox.children.length !== 0) {
                let temp = tempChessBox.firstElementChild.id.split('_')[0];
                if (colorPiece !== temp) {
                    tempChessBox.classList.add('nextSelected');
                }
            }
            n = (n == 1) ? -1 : 1
        }
    } else if (colorPiece == 'B') {
        for (let index = 1; index <= 2; index++) {
            let pieceIdSideOpp = `${x_Axis + 1},${y_Axis + n}`
            let tempChessBox = document.getElementById(`${pieceIdSideOpp}`);

            if (tempChessBox.children.length !== 0) {
                let temp = tempChessBox.firstElementChild.id.split('_')[0];
                if (colorPiece !== temp) {
                    tempChessBox.classList.add('nextSelected');
                }
            }
            n = (n == 1) ? -1 : 1
        }
    }
}
// let make a cleaner that remove the Border from chessBox
let cleaner = () => {
    chessBox.forEach((value, index) => {
        chessBox[index].classList.remove
            ('nextSelected')
    })
}

let pieceMover = (pieceid) => {
    let pieceImg = document.createElement('img');
    pieceImg.id = `${selected[3]}_pawn`;
    if (selected[3] == 'W') {
        pieceImg.src = `white_Images/${selected[2]}`;
    } else {
        pieceImg.src = `black_Images/${selected[2]}`;
    }
    let tempChessBox = document.getElementById(`${pieceid}`);
    console.log(tempChessBox);

    tempChessBox.appendChild(pieceImg)
}
// let make piece Remover
let pieceRemover = () => {
    if (selected.length !== 0) {
        const list = document.getElementById(`${selected[0]},${selected[1]}`)
        if (list.hasChildNodes()) {
            list.removeChild(list.children[0]);
        }
    }
}
// let make piece Eliminate Function
let pieceEliminate = (x_Axis, y_Axis) => {
    const list = document.getElementById(`${x_Axis},${y_Axis}`);
    if (list.hasChildNodes()) {
        list.removeChild(list.children[0]);
    }
}