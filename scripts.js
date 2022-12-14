const gameBoard = (() => {

    let boardBoxes = []
    let boxId = 1
    let box

    const main = document.querySelector('main')
    const board = document.createElement('div')
        board.className = 'gameBoard'
        main.appendChild(board)

    const makeBoxes = (box) => {
        for(let i = boardBoxes.length; i <= 8; i++) {
            box = document.createElement('div')
            box.classList.add('boardBox')
            box.id = boxId++
            board.appendChild(box)
            boardBoxes.push(box)       
    }}


    return {boardBoxes, makeBoxes, box, main, board}
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

    const winner = (player) => {
        console.log('Winner');
        const winnerText = document.createElement('p')
        winnerText.className = 'winnerText'
        gameBoard.main.insertBefore(winnerText, gameBoard.board)
        if(player === player1) {
            console.log(player1);
            console.log('Player 1 wins!');
            winnerText.textContent = 'Player 1 Wins!'
        } else if (player === player2) {
            console.log(player2);
            console.log('Player 2 wins');
            winnerText.textContent = 'Player 2 Wins!'
        }
    }
    return { getMark, winner }
})()

const winningConditions = (() => {
 
    let player1Mark = player1.mark
    let player2Mark = player2.mark

    let winningBoxesPlayer1 = []
    let winningBoxesPlayer2 = []

    const player1Index = (box) => {
        if(box.textContent === player1Mark){
            winningBoxesPlayer1.push(box)
            isWinner(box)
        }
    }
    const player2Index = (box) => {
        if(box.textContent === player2Mark){
            winningBoxesPlayer2.push(box)
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

    const isWinner = (box) => {
        // let  = player1.mark
        // winnig condition for player 1
        if(rowA.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            display.winner(player1)
            return
        }
        if(rowB.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            display.winner(player1)
            return
        }
        if(rowC.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            display.winner(player1)
            return
        }
        if(col1.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            display.winner(player1)
            return
        }
        if(col2.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            display.winner(player1)
            return
        }
        if(col3.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            display.winner(player1)
            return
        }
        if(cross1.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            display.winner(player1)
            return
        }
        if(cross2.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            display.winner(player1)
            return
        }

        // winning coditons for player 2
        if(rowA.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            display.winner(player2)
            console.log(player2);
            return
        }
        if(rowB.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            display.winner(player2)
            return
        }
        if(rowC.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            display.winner(player2)
            return
        }
        if(col1.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            display.winner(player2)
            return
        }
        if(col2.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            display.winner(player2)
            return
        }
        if(col3.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            display.winner(player2)
            return
        }
        if(cross1.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            display.winner(player2)
            return
        }
        if(cross2.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            display.winner(player2)
            return
        }
    }

    return {player1Index, player2Index}
})()