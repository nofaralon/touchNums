
var gNums
var gNextNum = 1
var gLevel
var gInterval

function restartGame() {
    var strHtml = `<img class="img" src="pic/letsplay.png">`
    var elImg = document.querySelector('.div')
    elImg.innerHTML = strHtml;
    renderBoard(0)
    gNextNum = 1
    startGame(size)
}

function startGame(size) {
    gLevel = size
    var elImg = document.querySelector('.img')
    if (elImg) elImg.style.display = 'none'
    renderBoard(size)

    var strHtml = `<div class="nextNum">Next Number: ${gNextNum}</div>
    <div class="timer">Game Time:</div>`
    var elBtn = document.querySelector('.div');
    elBtn.innerHTML = strHtml;
}

function cellClicked(clickedNum) {
    if (gNextNum === 1) {
        gameTime()
    }
    
    if (+clickedNum.innerText === gNextNum) {
        clickedNum.classList.add('clicked')
        gNextNum++
        updateBtn()
    }

    if (gNextNum === gLevel + 1) { 
        clearInterval(gInterval)
        strHtml = ` <button class="nGame" onclick="restartGame()">Play Again!</button>`
        var elBtn = document.querySelector('.div');
        elBtn.innerHTML = strHtml;
    }
}

function renderBoard(size) {
    gNums = createNums(size)
    var strHtml = '';
    var length = Math.sqrt(size)
    
    for (var i = 0; i < length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < length; j++) {
            strHtml += `<td onclick="cellClicked(this)"> ${drawNum()} </td>`;
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
    
}

function updateBtn() {
    var elBtn = document.querySelector('.nextNum');
    elBtn.innerText = `Next Number: ${gNextNum}`
}

function gameTime() {
    var startTime = Date.now()
    var elTimer = document.querySelector('.timer')
    console.log('elTimer', elTimer)
    gInterval = setInterval(function () {
        var second = ((Date.now() - startTime) / 1000).toFixed(3)
        elTimer.innerText = 'Game Time: ' + second
    }, 1000)
}

function createNums(size) {
    var num = 1
    var nums = []

    for (var i = 0; i < size; i++) {
        nums.push(num)
        num++
    }
    return nums
}

function drawNum() {
    var idx = getRandomIntInclusive(0, gNums.length - 1)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num
}


//util.js:
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
