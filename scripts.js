const gameBoard = (() => {

    let boardBoxes = []
    let boxId = 1

    const _main = document.querySelector('main')
    const _board = document.createElement('div')
        _board.className = 'gameBoard'
        _main.appendChild(_board)

    const makeBoxes = () => {
        for(let i = boardBoxes.length; i <= 8; i++) {
        const box = document.createElement('div')
            box.classList.add('boardBox')
            box.id = boxId++
            _board.appendChild(box)
            boardBoxes.push(box) 

            
    }}

    return {boardBoxes, makeBoxes}
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
                box.textContent = player1.mark || player2.mark 
                togglePlayerTurn()
            }       
        })     
    }
// player1 has a turn
    const togglePlayerTurn = () => {
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
// then player2 has a turn

// then find position of marks and see if it matches win condiitons

    return {  }
})()