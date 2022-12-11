const gameBoard = (() => {
    console.log('hello');

    let boardBoxes = []
    let boxId = 1

    const main = document.querySelector('main')
    const board = document.createElement('div')
        board.className = 'gameBoard'
        main.appendChild(board)

    for(let i = boardBoxes.length; i <= 8; i++) {

        if(boardBoxes.length <= 8) {
            const box = document.createElement('div')
                box.className = 'boardBox'
                box.id = boxId
                boxId++
                board.appendChild(box)

                boardBoxes.push(box)
        }
    }

    return {boardBoxes}

})()


console.log(gameBoard.boardBoxes);
const players = (name, score) => {
    const getName = () => name
    const getScore = () => score
 
    return {name, score}
}

const player1 = players('One')
console.log(player1.score + ' -- player test');