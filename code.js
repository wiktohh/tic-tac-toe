const boxes = document.querySelectorAll('.board-item')
let round = 0
let moves = ["","","","","","","","",""]
let isWinner = false
const playerInfo =document.querySelector(".playerInfo")
const resetButton = document.querySelector('.reset')

const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]

const restartGame = () => {
    moves = ["","","","","","","","",""]
    boxes.forEach(box => {
        isWinner = false
        playerInfo.textContent = ''
        box.textContent = ''
        box.disabled = false
        box.classList.remove('winner')
    })
}

const checkWinner = () => {
    winningConditions.forEach(condition => {
        let[a,b,c] = condition
        if(moves[a] && moves[a]===moves[b] && moves[a]===moves[c])
        {
            const aBox = document.querySelector(`[data-number="${a}"]`)
            aBox.classList.add('winner')
            const bBox = document.querySelector(`[data-number="${b}"]`)
            bBox.classList.add('winner')
            const cBox = document.querySelector(`[data-number="${c}"]`)
            cBox.classList.add('winner')
            disableBoxes()
            isWinner = true
        }
    })
}

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true)
}

boxes.forEach(box => box.addEventListener('click', (e) => {
    let a  = box.dataset.number
    let player = round % 2 === 0 ? "X" : "O"
    if(moves[a] === "")
    {
        moves[a] = player
        e.target.textContent = player
        round++
        checkWinner()
        
    }
    if(isWinner){
        playerInfo.textContent = `${player} wygrał!`
    }
}))

resetButton.addEventListener('click', restartGame)