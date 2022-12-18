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
    const body = document.querySelector('body')

    const saveDialogBtn = document.createElement('button')
            saveDialogBtn.textContent = 'Save'
            saveDialogBtn.addEventListener('pointerup', () => {
                if(saveDialogBtn.className === 'player1') {
                    player_1.name = nameInput.value
                    console.log('Player 1: ' + player_1.name);
                } else if(saveDialogBtn.className === 'player2') {
                    player_2.name = nameInput.value
                    console.log('Player 2: ' + player_2.name);
                }
                nameForm.reset()
                dialog.close(dialog)
            })
    const namePlayer_1Btn = document.createElement('button')
            namePlayer_1Btn.textContent = 'Player 1 Name'
            namePlayer_1Btn.className = 'player1Btn'

            namePlayer_1Btn.addEventListener('pointerup', () => {
                saveDialogBtn.className = 'player1'
                dialog.showModal(dialog)
            })
    const namePlayer_2Btn = document.createElement('button')
            namePlayer_2Btn.textContent = 'Player 2 Name'
            namePlayer_2Btn.className = 'player2Btn'

            namePlayer_2Btn.addEventListener('pointerup', () => {
                saveDialogBtn.className = 'player2'

                dialog.showModal(dialog)
            })
    const dialog = document.createElement('dialog')
            body.appendChild(dialog)
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
                dialog.close(dialog)
            })
        
        dialog.appendChild(cancelDialogBtn)
        dialog.appendChild(saveDialogBtn)
    return { namePlayer_1Btn, namePlayer_2Btn, nameInput}
})()

const player_1 = players(getNameDialog.nameInput.value, 'X', true)
const player_2 = players(getNameDialog.nameInput.value, 'O', false)
const computer = players('Computer', player_2.mark, player_2.turn)

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
                winningConditions.player_1Index(box)
                winningConditions.player_2Index(box)
            }       
        })     
    }

    const _togglePlayerTurn = () => {
        if(player_1.turn === true) {
            player_1.turn = !player_1.turn
            player_2.turn = !player_2.turn
            return display.player_2Turn()
        } else if(player_2.turn === true) {
            player_1.turn = !player_1.turn
            player_2.turn = !player_2.turn
            return display.player_1Turn()
        }
    }
    return {  }
})()

const display = (() => {

    const displayPlayers = document.createElement('div')
        displayPlayers.className = 'displayPlayers'
        displayPlayers.textContent = `Add players names: `
        displayPlayers.appendChild(getNameDialog.namePlayer_1Btn)
        displayPlayers.appendChild(getNameDialog.namePlayer_2Btn)

    const displayPlayerTurn = document.createElement('div')
        displayPlayerTurn.className = 'displayText'

    gameBoard.main.insertBefore(displayPlayerTurn, gameBoard.board)
    gameBoard.main.insertBefore(displayPlayers, displayPlayerTurn)

    const player_1Turn = () => {
        if(player_1.name === ''){
            player_1.name = 'Player 1'
            displayPlayerTurn.textContent = `${player_1.name}'s turn.`
            return player_1.name
        } else {
            displayPlayerTurn.textContent = `${player_1.name}'s turn.`
        }
    }
    const player_2Turn = () => {
        if(player_2.name === ''){
            player_2.name = 'Player 2'
            displayPlayerTurn.textContent = `${player_2.name}'s turn.`
            return player_2.name
        } else {
            displayPlayerTurn.textContent = `${player_2.name}'s turn.`
        }
    }

    const computerTurn = () => {
        displayPlayerTurn.textContent = `Computer's turn.`
    }

    const getMark = (box) => {
        if(player_1.turn === true) return box.textContent = player_1.mark
        if(player_2.turn === true) return box.textContent = player_2.mark
        if(computer.turn === true) return box.textContent = computer.mark
    } 

    const winner = (player) => {
        if(player === undefined) return displayPlayerTurn.textContent = 'Tied game!'
        if(player === player_1) return displayPlayerTurn.textContent = `${player_1.name} Wins!`
        if (player === player_2) return displayPlayerTurn.textContent = `${player_2.name} Wins!`
        if (player === computer) return displayPlayerTurn.textContent = `Computer Wins!`
    }

    return { getMark, winner, displayPlayerTurn, player_1Turn, player_2Turn }
})()

const winningConditions = (() => {
 
    let player_1Mark = player_1.mark
    let player_2Mark = player_2.mark

    let winningBoxesplayer_1 = []
    let winningBoxesplayer_2 = []

    const player_1Index = (box) => {
        if(box.textContent === player_1Mark){
            winningBoxesplayer_1.push(box)
            isWinner(box)
        }
    }
    const player_2Index = (box) => {
        if(box.textContent === player_2Mark){
            winningBoxesplayer_2.push(box)
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
        if(rowA.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.winner(player_1)
        } else if(rowB.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.winner(player_1)
        } else if(rowC.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.winner(player_1)
        } else if(col1.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.winner(player_1)
        } else if(col2.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.winner(player_1)
        } else if(col3.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.winner(player_1)
        } else if(cross1.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.winner(player_1)
        } else if(cross2.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.winner(player_1)
        }

        // winning coditons for player 2
        if(rowA.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.winner(player_2)
        } else if(rowB.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.winner(player_2)
        } else if(rowC.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.winner(player_2)
        } else if(col1.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.winner(player_2)
        } else if(col2.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.winner(player_2)
        } else if(col3.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.winner(player_2)
        } else if(cross1.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.winner(player_2)
        } else if(cross2.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.winner(player_2)
        }

        if(gameBoard.boardBoxes.every((box) => box.classList.contains('played'))) return display.winner()
    }

    const disablePlayerTurn = () => {
        player_1.turn = false
        player_2.turn = false
    }

    return {player_1Index, player_2Index}
})()