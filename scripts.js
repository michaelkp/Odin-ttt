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
    const addMark = () => mark
    const getTurn = () => turn
    const getScore = () => score

    return {name, mark, turn, score}
}

const getNameDialog = (() => {
    const dialog = document.getElementById('playerNameDialog')
        dialog.returnValue = 'playerName'
    const nameForm = document.getElementById('playerNameForm')
    const nameInput = document.getElementById('playerName')

    const saveBtn = document.getElementById('dialogSave')
        saveBtn.addEventListener('pointerup', () => {
            if(saveBtn.className === 'player1') {
                player_1.name = nameInput.value
                display.display_players.appendChild(display.display_playerNames)
                display.display_playerNames.textContent = `Player 1: ${player_1.name}`
                gamePlay.player_1Turn()

            } else if(saveBtn.className === 'player2') {
                player_2.name = nameInput.value
                display.display_players.appendChild(display.display_playerNames)
                display.display_playerNames.textContent = `Player 1: ${player_1.name} Player 2: ${player_2.name}`
                gamePlay.player_1Turn()

            }
            nameForm.reset()
            dialog.close()
        })
    const namePlayer_1Btn = document.getElementById('player1Btn')
            namePlayer_1Btn.addEventListener('pointerup', () => {
                saveBtn.className = 'player1'
                dialog.showModal()
            })
    const namePlayer_2Btn = document.getElementById('player2Btn')
            namePlayer_2Btn.addEventListener('pointerup', () => {
                saveBtn.className = 'player2'
                dialog.showModal()
            })

        const cancelDialogBtn = document.getElementById('dialogCancel')
            cancelDialogBtn.addEventListener('pointerup', () => {
                nameForm.reset()
                dialog.close()
            })

    return { namePlayer_1Btn, namePlayer_2Btn, dialog, nameInput}
})()

const player_1 = players(getNameDialog.nameInput.value, 'X', true, 0)
const player_2 = players(getNameDialog.nameInput.value, 'O', false, 0)
const computer = players('Computer', 'O', false, 0)

const gamePlay = (() => {
    gameBoard.makeBoxes()

    for (const box of gameBoard.boardBoxes) {
        box.addEventListener('pointerup', () => {
            if(box.classList.contains('played')) {
                return
            } else {
                box.classList.add('played')
                display.addMark(box)
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

        setTimeout(() => {
            let randomBox = Math.floor(Math.random() * unplayedBox.length)

            unplayedBox[randomBox].classList.add('played', 'computer')
            unplayedBox[randomBox].textContent = computer.mark
            
            winningConditions.computerIndex(unplayedBox[randomBox])
            togglePlayerTurn()
        }, 600);
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

    const getScore = (player) => {
        if(player === player_1) {
            console.log('score test-- player 1');
            player_1.score++
            console.log(player_1.score + ' -- player 1 score');
        }
        if(player === player_2) {
            console.log('score test-- player 2');
            player_2.score++
            console.log(player_2.score + ' -- player 2 score');
        }
        if(player === computer) {
            console.log('score test-- computer 1');
            computer.score++
            console.log(computer.score + ' -- computer 1 score');
        }
    }

    const startOver = (box) => {
        function removeClasses() {
            for(const box of gameBoard.boardBoxes) {
                box.classList.remove('player1')
                box.classList.remove('player2')
                box.classList.remove('computer')
                box.classList.remove('played')
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

    return { player_1Turn, togglePlayerTurn, startComputer, startOver, getScore }
})()

const display = (() => {

    const display_players = document.createElement('div')
        display_players.className = 'display_players'
    
    const display_playComputerBtn = document.getElementById('playComputer')
        display_playComputerBtn.addEventListener('pointerup', () => {
            getNameDialog.namePlayer_2Btn.setAttribute('disabled', 'disabled')
            gamePlay.startComputer()
        })

    const display_playerNames = document.getElementById('player_names')
        
    const display_playersTurn = document.getElementById('players_turn')

    const playAgain = document.createElement('div')
        playAgain.className = 'play_again'
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

    const addMark = (box) => {
        if(player_1.turn === true) return box.textContent = player_1.mark
        if(player_2.turn === true) return box.textContent = player_2.mark
    } 
    const addPlayerClass = (box) => {
        if(player_1.turn === true) return box.classList.add('player1')
        if(player_2.turn === true) return box.classList.add('player2')
    }
    const getWinner = (player) => {
        gameBoard.main.insertBefore(playAgain, gameBoard.board)

        if(player === undefined) return display_playersTurn.textContent = 'Tied game!'
        if(player === player_1) {
            console.log('player 1 win test');
            gamePlay.getScore(player_1)
            display.displayScore()

            return display_playersTurn.textContent = `${player_1.name} Wins!`}
        if (player === player_2){
            console.log('player 2 win test');
            gamePlay.getScore(player_2)
            display.displayScore()

            return display_playersTurn.textContent = `${player_2.name} Wins!`}
        if (player === computer) {
            console.log('computer win test');
            gamePlay.getScore(computer)
            display.displayScore()

            return display_playersTurn.textContent = `Computer Wins!`}
    }

    const displayScore = () => {
        console.log('DISPLAY SCORE TEST');
        const display_score = document.getElementById('display_score')
            display_score.textContent = `${player_1.name}: ${player_1.score}
                                 ${player_2.name || computer.name}: ${player_2.score || computer.score}`
    }
    return { addMark, addPlayerClass, getWinner, displayScore, display_players, display_playerNames, display_playersTurn, display_playComputerBtn, playAgainBtn}
})()

const winningConditions = (() => {

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
            return display.getWinner(player_1)
        } else if(rowB.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_1)
        } else if(rowC.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_1)
        } else if(col1.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_1)
        } else if(col2.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_1)
        } else if(col3.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_1)
        } else if(cross1.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_1)
        } else if(cross2.every((player_1Mark) => winningBoxesplayer_1.includes(player_1Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_1)
        }

        // winning coditons for player 2
        if(rowA.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_2)
        } else if(rowB.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            console.log('getWinner player 2');

            disablePlayerTurn()
            return display.getWinner(player_2)
        } else if(rowC.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_2)
        } else if(col1.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_2)
        } else if(col2.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_2)
        } else if(col3.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_2)
        } else if(cross1.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_2)
        } else if(cross2.every((player_2Mark) => winningBoxesplayer_2.includes(player_2Mark))) {
            disablePlayerTurn()
            return display.getWinner(player_2)
        }
        // winning conditions for computer 
        if(rowA.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.getWinner(computer)
        } else if(rowB.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            console.log('getWinner computer');
            disablePlayerTurn()
            return display.getWinner(computer)
        } else if(rowC.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.getWinner(computer)
        } else if(col1.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.getWinner(computer)
        } else if(col2.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.getWinner(computer)
        } else if(col3.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.getWinner(computer)
        } else if(cross1.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.getWinner(computer)
        } else if(cross2.every((computer_mark) => winningBoxesComputer.includes(computer_mark))) {
            disablePlayerTurn()
            return display.getWinner(computer)
        }

        if(gameBoard.boardBoxes.every((box) => box.classList.contains('played'))) {
            disablePlayerTurn()
            return display.getWinner(undefined)
        }
    }

    const disablePlayerTurn = () => {
        console.log('game over!!!!!');
        player_1.turn = false
        player_2.turn = false
        computer.turn = false
    }

    return {player_1Index, player_2Index, computerIndex, winningBoxesComputer, winningBoxesplayer_1, winningBoxesplayer_2}
})()