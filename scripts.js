const gameBoard = (() => {

    let boardBoxes = []
    let boxId = 1
    // let box

    const main = document.querySelector('main')
    const board = document.createElement('div')
        board.className = 'gameBoard'
        main.appendChild(board)

    const makeBoxes = () => {
        for(let i = boardBoxes.length; i <= 8; i++) {
            box = document.createElement('div')
            box.classList.add('boardBox')
            box.id = 'box-'+boxId++
            board.appendChild(box)
            boardBoxes.push(box)       
    }}

    return {boardBoxes, makeBoxes, main, board}
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
                    display.display_players.appendChild(display.display_playerNames)
                    display.display_playerNames.textContent = `Player 1: ${player_1.name}`
                } else if(saveDialogBtn.className === 'player2') {
                    player_2.name = nameInput.value
                    display.display_players.appendChild(display.display_playerNames)
                    display.display_playerNames.textContent = `Player 1: ${player_1.name} Player 2: ${player_2.name}`
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
const computer = players('Computer', 'O', false)

const gamePlay = (() => {
    gameBoard.makeBoxes()

    for (const box of gameBoard.boardBoxes) {
        box.addEventListener('pointerup', () => {
            if(box.classList.contains('played')) {
                return
            } else {
                box.classList.add('played')
                display.getMark(box)
                display.addPlayerClass(box)
                winningConditions.player_1Index(box)
                winningConditions.player_2Index(box)
                togglePlayerTurn()
            }       
        })     
    }
    const player_1Turn = () => {
        player_1.turn = true
        if(player_1.name === ''){
            // if player did not enter name
            player_1.name = 'Player 1'
            display.display_playersTurn.textContent = `${player_1.name}'s turn.`
            return player_1.name
        } else {
            display.display_playersTurn.textContent = `${player_1.name}'s turn.`
        }
        
    }
    const player_2Turn = () => {
        if(player_2.name === ''){
            // if player did not enter name
            player_2.name = 'Player 2'
            display.display_playersTurn.textContent = `${player_2.name}'s turn.`
            return player_2.name
        } else {
            display.display_playersTurn.textContent = `${player_2.name}'s turn.`
        }
    }
    const computerTurn = () => {
        display.display_playersTurn.textContent = `Computer's turn.`
        let unplayedBox = gameBoard.boardBoxes.filter(box => !box.classList.contains('played'))

        if(unplayedBox.length === 0) {
            return
        } else {
            setTimeout(() => {
                let randomBox = Math.floor(Math.random() * unplayedBox.length)

                unplayedBox[randomBox].classList.add('played', 'computer')
                unplayedBox[randomBox].textContent = computer.mark
                
                winningConditions.computerIndex(unplayedBox[randomBox])
                togglePlayerTurn()
                }, 600);
        }
    }

    let playingComputer = false
    const startComputer = () => {
        return playingComputer = true
    }
    const togglePlayerTurn = () => {

        if(player_1.turn === true) {
            player_1.turn = !player_1.turn
            if(playingComputer === true) {
                computer.turn = !computer.turn
                return computerTurn()
            } else {
                player_2.turn = !player_2.turn
                return player_2Turn()
            } 
        } else if(player_2.turn === true) {
            player_1.turn = !player_1.turn
            player_2.turn = !player_2.turn
            return player_1Turn()
        } else if(computer.turn === true) {
            player_1.turn = !player_1.turn
            computer.turn = !computer.turn
            return player_1Turn()
        } 
    }

    const startOver = (box) => {
        function removeClasses() {
            for(const box of gameBoard.boardBoxes) {
                box.classList.remove('player1')
                box.classList.remove('player2')
                box.classList.remove('computer')
                box.classList.remove('played')
                console.log(box.classList + ' -- box class');
            }
        }removeClasses()

        function clearWinningArrays() {
            winningConditions.winningBoxesplayer_1.length = 0
            winningConditions.winningBoxesplayer_2.length = 0
            winningConditions.winningBoxesComputer.length = 0
        }clearWinningArrays()

        function clearBoxText() {
            for(const box of gameBoard.boardBoxes) {
                box.textContent = ''
            }
        }clearBoxText()

        function resetPlayerTurns() {
            player_1Turn()
        }resetPlayerTurns()
    }
    let gameOver = false
    const getGameOver = () => {
        return gameOver = true
    }
    return { player_1Turn, togglePlayerTurn, startComputer, startOver, getGameOver }
})()

const display = (() => {

    const display_players = document.createElement('div')
        display_players.className = 'display_players'
    const display_addPlayerNames = document.createElement('p')
        display_addPlayerNames.textContent = `Add players names: `
        display_players.appendChild(display_addPlayerNames)
        display_addPlayerNames.appendChild(getNameDialog.namePlayer_1Btn)
        display_addPlayerNames.appendChild(getNameDialog.namePlayer_2Btn)
    const display_playComputer = document.createElement('p')
        display_playComputer.textContent = `Or play against the computer: `
    const display_playComputerBtn = document.createElement('button')
        display_playComputerBtn.textContent = 'Play Computer'
        display_playComputerBtn.addEventListener('pointerup', () => {
            getNameDialog.namePlayer_2Btn.setAttribute('disabled', 'disabled')
            gamePlay.startComputer()
        })
        display_players.appendChild(display_playComputer)
        display_players.appendChild(display_playComputerBtn)

    const display_playerNames = document.createElement('p')
        
    
    const display_playersTurn = document.createElement('div')
        display_playersTurn.className = 'displayText'

    const playAgain = document.createElement('div')
        playAgain.className = 'playAgain'
    const playAgainText = document.createElement('p')
        playAgainText.textContent = 'Play again?'
    const playAgainBtn = document.createElement('button')
        playAgainBtn.addEventListener('pointerup', () => {
            gamePlay.startOver()
            gameBoard.main.removeChild(playAgain)
        })
        playAgainBtn.textContent = 'Start Over'
        playAgain.appendChild(playAgainText)
        playAgain.appendChild(playAgainBtn)

    gameBoard.main.insertBefore(display_playersTurn, gameBoard.board)
    gameBoard.main.insertBefore(display_players, display_playersTurn)

    const getMark = (box) => {
        if(player_1.turn === true) return box.textContent = player_1.mark
        if(player_2.turn === true) return box.textContent = player_2.mark
        if(computer.turn === true) return box.textContent = computer.mark
    } 
    const addPlayerClass = (box) => {
        if(player_1.turn === true) return box.classList.add('player1')
        if(player_2.turn === true) return box.classList.add('player2')
        if(computer.turn === true) return box.classList.add('computer')
    }
    const winner = (player) => {
        gameBoard.main.insertBefore(playAgain, gameBoard.board)

        if(player === undefined) return display_playersTurn.textContent = 'Tied game!'
        if(player === player_1) {
            console.log('player 1 win test');
            return display_playersTurn.textContent = `${player_1.name} Wins!`}
        if (player === player_2){
            console.log('player 2 win test');
             return display_playersTurn.textContent = `${player_2.name} Wins!`}
        if (player === computer) {
            console.log('computer win test');
            return display_playersTurn.textContent = `Computer Wins!`}
    }

    return { getMark, addPlayerClass, winner, display_players, display_playerNames, display_playersTurn, display_playComputerBtn, playAgainBtn}
})()

const winningConditions = (() => {
 
    let player_1Mark = player_1.mark
    let player_2Mark = player_2.mark
    let computer_mark = computer.mark

    let winningBoxesplayer_1 = []
    let winningBoxesplayer_2 = []
    let winningBoxesComputer = []

    const player_1Index = (box) => {
        if(box.classList.contains('player1')){
            winningBoxesplayer_1.push(box)
            isWinner(box)
        }
    }
    const player_2Index = (box) => {
        if(box.classList.contains('player2')){
            winningBoxesplayer_2.push(box)
            isWinner(box)
        }
    }
    const computerIndex = (box) => {
        if(box.classList.contains('computer')){
            console.log(gameBoard.boardBoxes.classList + ' -- winning cons classes');
            winningBoxesComputer.push(box)
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
        // winning condition for player 1
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
            console.log('winner player 2');

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
        // winning conditions for computer 
        if(rowA.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.winner(computer)
        } else if(rowB.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            console.log('winner computer');
            disablePlayerTurn()
            return display.winner(computer)
        } else if(rowC.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.winner(computer)
        } else if(col1.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.winner(computer)
        } else if(col2.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.winner(computer)
        } else if(col3.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.winner(computer)
        } else if(cross1.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.winner(computer)
        } else if(cross2.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.winner(computer)
        }

        if(gameBoard.boardBoxes.every((box) => box.classList.contains('played'))) return display.winner()
    }

    const disablePlayerTurn = () => {
        console.log('game over!!!!!');
        player_1.turn = false
        player_2.turn = false
        computer.turn = false
    }

    return {player_1Index, player_2Index, computerIndex, winningBoxesComputer, winningBoxesplayer_1, winningBoxesplayer_2}
})()