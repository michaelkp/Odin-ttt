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

const getNameDialog = (() => {
    const nameBtn = document.createElement('button')
        nameBtn.textContent = 'Player Name'
        nameBtn.addEventListener('pointerup', () => {
            gameBoard.main.appendChild(dialog)
            dialog.showModal(dialog)
        })
    const dialog = document.createElement('dialog')
        dialog.id  = 'playerNameDialog'
        const nameForm = document.createElement('form')
            dialog.appendChild(nameForm)
            nameForm.textContent = `Player's name: `
            nameForm.setAttribute('method', 'dialog')
            nameForm.setAttribute('label', 'playerName') 

        const nameInput = document.createElement('input')
        nameInput.setAttribute('type', 'text')
        nameInput.setAttribute('name', 'playerName')
        nameInput.setAttribute('placeholder', 'Name')
        nameForm.appendChild(nameInput)

        const cancelDialogBtn = document.createElement('button')
            cancelDialogBtn.textContent = 'Cancel'
            cancelDialogBtn.addEventListener('pointerup', () => {
                nameForm.reset()
                gameBoard.main.removeChild(dialog)
                dialog.close(dialog)
            })
        const saveDialogBtn = document.createElement('button')
            saveDialogBtn.textContent = 'Save'
            saveDialogBtn.addEventListener('pointerup', () => {
                console.log(player1.name + ' --name test');
                player1.name = nameInput.value
                console.log(nameInput.value);
                console.log(player1.name + ' --player1 name test');
// ADD DISPLAY NAME AND PLAYER 2 NAME!!!!!!!!!!
                gameBoard.main.removeChild(dialog)
                dialog.close(dialog)
            })
        dialog.appendChild(cancelDialogBtn)
        dialog.appendChild(saveDialogBtn)
    return { nameBtn, nameInput}
})()

const player1 = players(getNameDialog.nameInput.value, 'X', true)
const player2 = players(getNameDialog.nameInput.value, 'O', false)

const gamePlay = (() => {
    gameBoard.makeBoxes()

    for (const box of gameBoard.boardBoxes) {
        box.addEventListener('pointerup', () => {
            if(box.classList.contains('played')) {
                return
            } else {
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
            player1.turn = !player1.turn
            player2.turn = !player2.turn
            return display.player2Turn()
        } else if(player2.turn === true) {
            player1.turn = !player1.turn
            player2.turn = !player2.turn
            return display.player1Turn()
        }
    }
    return {  }
})()

const display = (() => {

    const displayPlayers = document.createElement('div')
          displayPlayers.className = 'displayPlayers'
          displayPlayers.textContent = 'Player 1: '
          displayPlayers.appendChild(getNameDialog.nameBtn)

          const displayText = document.createElement('div')
          displayText.className = 'displayText'

    gameBoard.main.insertBefore(displayText, gameBoard.board)
    gameBoard.main.insertBefore(displayPlayers, displayText)

    const player1Turn = () => {
        if(player1.name === ''){
            player1.name = 'Player 1'
            displayText.textContent = `${player1.name}'s turn.`
            return player1.name
        } else {
            displayText.textContent = `${player1.name}'s turn.`
        }
    }
    const player2Turn = () => {
        if(player2.name === ''){
            player2.name = 'Player 2'
            displayText.textContent = `${player2.name}'s turn.`
            return player2.name
        } else {
            displayText.textContent = `${player2.name}'s turn.`
        }
    }

    const getMark = (box) => {
        if(player1.turn === true) return box.textContent = player1.mark
        if(player2.turn === true) return box.textContent = player2.mark
    } 

    const winner = (player) => {
        if(player === undefined) return displayText.textContent = 'Tied game!'
        if(player === player1) return displayText.textContent = `${player1.name} Wins!`
        if (player === player2) return displayText.textContent = `${player2.name} Wins!`
    }

    return { getMark, winner, displayText, player1Turn, player2Turn }
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

    const isWinner = () => {
        // winnig condition for player 1
        if(rowA.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            disablePlayerTurn()
            return display.winner(player1)
        } else if(rowB.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            disablePlayerTurn()
            return display.winner(player1)
        } else if(rowC.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            disablePlayerTurn()
            return display.winner(player1)
        } else if(col1.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            disablePlayerTurn()
            return display.winner(player1)
        } else if(col2.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            disablePlayerTurn()
            return display.winner(player1)
        } else if(col3.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            disablePlayerTurn()
            return display.winner(player1)
        } else if(cross1.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            disablePlayerTurn()
            return display.winner(player1)
        } else if(cross2.every((player1Mark) => winningBoxesPlayer1.includes(player1Mark))) {
            disablePlayerTurn()
            return display.winner(player1)
        }

        // winning coditons for player 2
        if(rowA.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            disablePlayerTurn()
            return display.winner(player2)
        } else if(rowB.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            disablePlayerTurn()
            return display.winner(player2)
        } else if(rowC.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            disablePlayerTurn()
            return display.winner(player2)
        } else if(col1.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            disablePlayerTurn()
            return display.winner(player2)
        } else if(col2.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            disablePlayerTurn()
            return display.winner(player2)
        } else if(col3.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            disablePlayerTurn()
            return display.winner(player2)
        } else if(cross1.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            disablePlayerTurn()
            return display.winner(player2)
        } else if(cross2.every((player2Mark) => winningBoxesPlayer2.includes(player2Mark))) {
            disablePlayerTurn()
            return display.winner(player2)
        }

        if(gameBoard.boardBoxes.every((box) => box.classList.contains('played'))) return display.winner()
    }

    const disablePlayerTurn = () => {
        player1.turn = false
        player2.turn = false
    }

    return {player1Index, player2Index}
})()