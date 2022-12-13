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
                // box.textContent = player1.mark || player2.mark
                display.getMark(box)
                _togglePlayerTurn()
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
        console.log(box.id);

        if(player1.turn === true) return box.textContent = player1.mark
        if(player2.turn === true) return box.textContent = player2.mark
    } 

    return { getMark }
})()