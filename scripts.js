const gameBoard = (() => {
    console.log('hello');

    let boardBoxes = []
    let boxId = 1

    const main = document.querySelector('main')
    console.log(main);
    const board = document.createElement('div')
    console.log(board);
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

})()