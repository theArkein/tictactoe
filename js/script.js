class UI{
     constructor(game){
          this.game = game
     }
     clearBoard(){
          let cells = document.querySelectorAll('.display .cell')
          cells.forEach(cell=>{
               cell.innerText=""
          })
     }
     setPlayers(){
          let nameA = document.querySelector('.display .player-left .player-name')
          let nameB = document.querySelector('.display .player-right .player-name')
          let scoreA = document.querySelector('.display .player-left .player-score')
          let scoreB = document.querySelector('.display .player-right .player-score')

          nameA.innerText = this.game.playerA.name
          nameB.innerText = this.game.playerB.name          
          scoreA.innerText = this.game.playerA.score
          scoreB.innerText = this.game.playerB.score
     }
     setTurn(){
          let turnSign = document.querySelector('.display .info.turn div')
          turnSign.innerText = this.game.turn
          let infoTurn = document.querySelector('.info.turn')
          infoTurn.style.display="flex"
     }
     setWinner(){
          let cells = document.querySelectorAll(".display .cell")
          cells.forEach((cell,i) => {
               if(this.game.winState.includes(i)){
                    cell.style.color = "#69c575"
               }
               else
                    cell.style.color = "#555"
          });

          let infoWinner = document.querySelector('.info.winner')
          infoWinner.style.display="flex"
          let winnerSign = document.querySelector('.info.winner div')
          winnerSign.innerText = this.game.turn
          let infoTurn = document.querySelector('.info.turn')
          infoTurn.style.display="none"
          this.increaseScore()

     }
     setTie(){
          let cells = document.querySelectorAll(".display .cell")
          cells.forEach(cell => {
                    cell.style.color = "#555"
          });
          let infoTie = document.querySelector(".display .info.tie")
          infoTie.style.display = "block"
          
          let infoTurn = document.querySelector('.info.turn')
          infoTurn.style.display="none"
     }
     increaseScore(){
          if(this.game.winner=="x"){
               let score = document.querySelector('.player-left .player-score')
               score.innerText = this.game.playerA.score
          }
          else{
               let score = document.querySelector('.player-right .player-score')
               score.innerText = this.game.playerB.score
          }
     }
     makeMove(position){
          let cells = document.querySelectorAll('.display .cell')
          cells[position].innerText = this.game.turn
     }
}

class Game{
     constructor(gameMode, playerA, playerB){
          this.mode = gameMode
          this.playerA = {name: playerA.name, sign: playerA.sign, score: playerA.score}
          this.playerB = {name: playerB.name, sign: playerB.sign, score: playerB.score}
          this.turn = this.playerA.sign
          this.signs = ["x","o"]
          this.movesPlayed = 0
          this.winner = undefined
          this.winState = undefined
          this.board = ["","","","","","","","",""]
          this.ui = undefined
     }
     start(){
          this.ui = new UI(this)
          console.log({game: this})
          this.clearBoard()
          this.setPlayers()
          this.setTurn()
          if(game.mode == 0 && this.playerA.name == "Bot"){
               this.botMove()
          }
     }
     clearBoard(){
          this.ui.clearBoard()
     }
     setPlayers(){
          this.ui.setPlayers()
     }
     setTurn(){
          this.ui.setTurn()
     }
     botMove(boardState, huplayer, bot){
          let position = Math.floor(Math.random()*9)
          if(!this.checkTie() && !this.winner){
               if(this.validateMove(position))
                    this.makeMove(position)
               else
                    this.botMove()
          }
     }
     makeMove(position){
          if(this.validateMove(position)){
               this.board[position] = this.turn
               this.ui.makeMove(position)
               let winState = this.checkWin()
               if(winState){
                    this.setWinner(winState)
               } else {
                    this.increaseMovesPlayed()
                    this.changeTurn()
               }
          }
          this.checkTie()
     }
     validateMove(position){
          if(this.board[position]=="" && !this.movesPlayed<=8 && !this.winner)
               return true
     }
     checkTie(){
          if(!this.winner && this.movesPlayed==9){
               this.ui.setTie()
               return true
          }
          else {
               return false
          }
     }
     checkWin(){
          let winStates = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ]
          let winState
          winStates.forEach(state=>{
               let a = this.board[state[0]]
               let b = this.board[state[1]]
               let c = this.board[state[2]]
               if(a==b && a==c && a==this.turn){
                    winState = state
               }
          })
          return winState
     }
     setWinner(state){
          this.winner = this.turn
          this.winState = state
          if(this.winner=="x")
               this.playerA.score++
          else
               this.playerB.score++

          this.ui.setWinner()
     }
     changeTurn(){
          if(this.turn == "o")
               this.turn = "x"
          else
               this.turn = "o"
          this.ui.setTurn()
     }
     increaseMovesPlayed(){
          this.movesPlayed++
     }
     playAgain(){
          this.mode = gameMode
          this.playerA = {name: players.playerA[0], sign: players.playerA[1], score: 0}
          this.playerB = {name: players.playerB[0], sign: players.playerB[1], score: 0}
          this.turn = this.playerA.sign
          this.signs = ["x","o"]
          this.movesPlayed = 0
          this.winner = undefined
          this.winState = undefined
          this.board = ["","","","","","","","",""]
          this.ui = undefined
     }
}
var game
var gameMode 
var singlePlayerSign

let startGame = (playerA, playerB)=>{
     game = new Game(gameMode, playerA, playerB)
     changeScreen("screen-D")
     game.start()

     
     let cells = document.querySelectorAll('.display .cell')
     cells.forEach((cell, i)=>{
           cell.onclick = ()=>{
                game.makeMove(i)
                if(game.mode == 0){
                    game.botMove()
               }
           }
           
      })
     
}

let playAgain = ()=>{
     let players = {playerA: game.playerA, playerB: game.playerB}
     console.log(players)
     startGame(players.playerA, players.playerB)
}
let resetGame = ()=>{
     window.location.href = "./"
}
let changeScreen = (newScreen)=>{
     let display = document.querySelector('.display')
     display.innerHTML = ""

     let screen = document.querySelector(`.${newScreen}`)
     display.innerHTML = screen.innerHTML
}

let selectGameMode = (newScreen, mode)=>{
     gameMode = mode 
     changeScreen(newScreen)
}

let setSinglePlayerSign = (sign)=>{
     singlePlayerSign = sign
     let signs = document.querySelectorAll('.signs div')
     signs.forEach(sign=>{
          sign.classList.remove("active")
     })
     signs[sign].classList.add("active")
}

let startSinglePlayer = ()=>{
     let players = getPlayers()
     if(players)
          startGame(players.playerA, players.playerB)
}
let startMultiPlayer = ()=>{
     let players = getPlayers()
     if(players)
          startGame(players.playerA, players.playerB)
}

let getPlayers = ()=>{
     var error = document.querySelector(".display .error")
     
     let checkError = (players)=>{
          if(players.playerA.name == "" || players.playerB.name == "" || players.playerA.sign==undefined){
               error.style.display = "block"
               setTimeout(()=>{
                    error.style.display = "none"
               },2000)
               return false
          } else {
               return true
          }
     }

     if(gameMode==0){
          let playerName = document.querySelector("#singlePlayerName").value
          let botName = "Bot"
          let players
          if(singlePlayerSign){
               players = {
                    playerA : {
                         name: botName,
                         sign: "x",
                         score: 0
                    },
                    playerB : {
                         name: playerName,
                         sign: "o",
                         score: 0
                    },
               }
          } else {
               players = {
                    playerA : {
                         name: playerName,
                         sign: "x",
                         score: 0
                    },
                    playerB : {
                         name: botName,
                         sign: "o",
                         score: 0
                    },
               }
          }

          
          if(checkError(players)){
               return players
          } else {
               return false
          }
     } else{
          let nameA = document.querySelector("#player_A_name").value
          let nameB = document.querySelector("#player_B_name").value
          let  players = {
               playerA : {
                    name: nameA,
                    sign: "x",
                    score: 0
               },
               playerB : {
                    name: nameB,
                    sign: "o",
                    score: 0
               },
          }
          if(checkError(players)){
              return players
          } else {
               return false
          }
     }

     
}
changeScreen("screen-A")