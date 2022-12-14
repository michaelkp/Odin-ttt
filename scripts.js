const gameBoard = (() => {

    let boardBoxes = []
    let boxId = 1
    let box

    const _main = document.querySelector('main')
    const _board = document.createElement('div')
        _board.className = 'gameBoard'
        _main.appendChild(_board)

    const makeBoxes = (box) => {
        for(let i = boardBoxes.length; i <= 8; i++) {
            box = document.createElement('div')
            box.classList.add('boardBox')
            box.id = boxId++
            _board.appendChild(box)
            boardBoxes.push(box)       
    }}


    return {boardBoxes, makeBoxes, box}
})()

const players = (name, mark, turn, score) => {
    const getName = () => name
    const getMark = () => mark
    const getTurn = () => turn
    const getScore = () => score

    return {name, mark, turn, score}
}

const player1 = players('One', 'X', true)
const player2 = players('Two', 'O', false)

const gamePlay = (() => {
    gameBoard.makeBoxes()

    for (const box of gameBoard.boardBoxes) {
        box.addEventListener('pointerup', () => {
            if(box.classList.contains('played')) {
                return
            } else {
                console.log(box.id);
                box.classList.add('played')
                display.getMark(box)
                _togglePlayerTurn()
                winningConditions.player1Index(box)
                winningConditions.player2Index(box)

            }       
        })     
    }

    const _togglePlayerTurn = () => {
        if(player1.turn === true) {
            console.log('Player 1');
            player1.turn = !player1.turn
            player2.turn = !player2.turn
            return
        }
        if(player2.turn === true) {
            console.log('Player 2');
            player1.turn = !player1.turn
            player2.turn = !player2.turn
            return 
        }
    }

// then find position of marks and see if it matches win condiitons
    
    return {  }
})()

const display = (() => {

    const getMark = (box) => {
        if(player1.turn === true) return box.textContent = player1.mark
        if(player2.turn === true) return box.textContent = player2.mark
    } 

    const winner = () => {
        console.log('Winner');
    }
    return { getMark, winner }
})()

const winningConditions = ((box) => {
    // let boxMark = box.textContent
    // console.log(boxMark);
    let player1Mark = player1.mark
    let player2Mark = player2.mark

    let boxes = gameBoard.boardBoxes.indexOf(box)
    let winningBoxesPlayer1 = []
    let winningBoxesPlayer2 = []

    const player1Index = (box) => {
        if(box.textContent === player1Mark){
            console.log('LLLLL');
            winningBoxesPlayer1.push(box)
            console.log(winningBoxesPlayer1 + ' --Player 1 winning index');
            isWinner(box)
        }
    }
    const player2Index = (box) => {
        if(box.textContent === player2Mark){
            console.log('JJJJJ');
            winningBoxesPlayer2.push(box)
            console.log(winningBoxesPlayer2 + ' --Player 1 winning index');
            isWinner(box)
        }
    }
    const rowA = [gameBoard.boardBoxes[0], gameBoard.boardBoxes[1],gameBoard.boardBoxes[2]]
    const rowB = [gameBoard.boardBoxes[3], gameBoard.boardBoxes[4],gameBoard.boardBoxes[5]]
    const rowC = [gameBoard.boardBoxes[6], gameBoard.boardBoxes[7],gameBoard.boardBoxes[8]]

    const col1 = [gameBoard.boardBoxes[0], gameBoard.boardBoxes[3],gameBoard.boardBoxes[6]]
    const col2 = [gameBoard.boardBoxes[1], gameBoard.boardBoxes[4],gameBoard.boardBoxes[7]]
    const col3 = [gameBoard.boardBoxes[2], gameBoard.boardBoxes[5],gameBoard.boardBoxes[8]]

    const cross1 = [gameBoard.boardBoxes[0], gameBoard.boardBoxes[4],gameBoard.boardBoxes[8]]
    const cross2 = [gameBoard.boardBoxes[2], gameBoard.boardBoxes[4],gameBoard.boardBoxes[6]]

    // loop thorugh boardBoxes to find all player marks!!!!!!!!!

    const isWinner = (box) => {
        let boxMark = box.textContent
        // winnig condition for player 1
        if(rowA.every((boxMark) => winningBoxesPlayer1.includes(boxMark))) {
            console.log('winner player 1!!!!');
            console.log(box.textContent);
            return
        }
        if(rowB.every((boxMark) => winningBoxesPlayer1.includes(boxMark))) {
            console.log('winner player 1!!!!');
            console.log(box.textContent);
            return
        }
        if(rowC.every((boxMark) => winningBoxesPlayer1.includes(boxMark))) {
            console.log('winner player 1!!!!');
            console.log(box.textContent);
            return
        }
        if(col1.every((boxMark) => winningBoxesPlayer1.includes(boxMark))) {
            console.log('winner player 1!!!!');
            console.log(box.textContent);
            return
        }
        if(col2.every((boxMark) => winningBoxesPlayer1.includes(boxMark))) {
            console.log('winner player 1!!!!');
            console.log(box.textContent);
            return
        }
        if(col3.every((boxMark) => winningBoxesPlayer1.includes(boxMark))) {
            console.log('winner player 1!!!!');
            console.log(box.textContent);
            return
        }
        if(cross1.every((boxMark) => winningBoxesPlayer1.includes(boxMark))) {
            console.log('winner player 1!!!!');
            console.log(box.textContent);
            return
        }
        if(cross2.every((boxMark) => winningBoxesPlayer1.includes(boxMark))) {
            console.log('winner player 1!!!!');
            console.log(box.textContent);
            return
        }

        // winning coditons for player 2
        if(rowA.every((boxMark) => winningBoxesPlayer2.includes(boxMark))) {
            console.log('winner player 2!!!!!');
            console.log(box.textContent);
            return
        }
        if(rowB.every((boxMark) => winningBoxesPlayer2.includes(boxMark))) {
            console.log('winner player 2!!!!!');
            console.log(box.textContent);
            return
        }
        if(rowC.every((boxMark) => winningBoxesPlayer2.includes(boxMark))) {
            console.log('winner player 2!!!!!');
            console.log(box.textContent);
            return
        }
        if(col1.every((boxMark) => winningBoxesPlayer2.includes(boxMark))) {
            console.log('winner player 2!!!!!');
            console.log(box.textContent);
            return
        }
        if(col2.every((boxMark) => winningBoxesPlayer2.includes(boxMark))) {
            console.log('winner player 2!!!!!');
            console.log(box.textContent);
            return
        }
        if(col3.every((boxMark) => winningBoxesPlayer2.includes(boxMark))) {
            console.log('winner player 2!!!!!');
            console.log(box.textContent);
            return
        }
        if(cross1.every((boxMark) => winningBoxesPlayer2.includes(boxMark))) {
            console.log('winner player 2!!!!!');
            console.log(box.textContent);
            return
        }
        if(cross2.every((boxMark) => winningBoxesPlayer2.includes(boxMark))) {
            console.log('winner player 2!!!!!');
            console.log(box.textContent);
            return
        }
    }

    
    return {player1Index, player2Index}
})()