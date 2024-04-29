
const board = [['', '', ''], ['', '', ''], ['', '', '']];
let playerSelection='';
let computerSelection='';
let playerTurn=true;
let compTurn=false;
let boardElement=0;
let gameFinished=false;
window.onload=function(){
  askPlayerChoice();
  renderBoard();
}
function askPlayerChoice(){
  const userWantsToBeX = window.confirm("Do you want to be player X? Click 'OK' for X, 'Cancel' for O.");

  if (userWantsToBeX) {
      playerSelection = 'X';
      computerSelection = 'O';
  } else {
      playerSelection = 'O';
      computerSelection = 'X';
  }

  // Update the text content on the page based on the player's choice
  document.getElementById("playerSelection").textContent = playerSelection;

  document.getElementById("computerSelection").textContent = computerSelection;
}
// Function to render the tic-tac-toe board
function renderBoard() {
  // Initialize an empty string to build the HTML structure
  let boardHTML = '';
  // Iterate through the board array
  board.forEach((row, rowIndex) => {
      // Start a new row div
      boardHTML += '<div class="row justify-content-center">';
      // Iterate through each cell in the row
      row.forEach((col, colIndex) => {
          // Create a cell div with styling and content
          const id=rowIndex+""+colIndex;
          boardHTML += `
              <div id="${id}" class="cell col-lg-2 d-flex align-items-center justify-content-center" 
                   style="">
                  ${col}
              </div>
          `;
      });

      // Close the row div
      boardHTML += '</div>';
  });

  // Set the HTML content of the board element to the constructed HTML
  document.getElementById("board").innerHTML = boardHTML;
  board.forEach((row,rowIndex)=>{
    row.forEach((col,colIndex)=>{
      const id=rowIndex+""+colIndex;
      const cellElement=document.getElementById(id);
      cellElement.addEventListener('click',()=>{handleClick(rowIndex,colIndex,cellElement)});
    })
  })
  displayMessage();
}
function handleClick(row,col,cellElement){
  if(board[row][col]===''&& !(gameFinished)){
    if(playerTurn){
      board[row][col]=playerSelection;
      cellElement.innerHTML=playerSelection;
      if(checkWin(row,col,"Player"))
      {
        setTimeout(() => {
          window.alert("The Player has won");
      }, 10);
      gameFinished=true;
        
      }
      playerTurn=false;
      compTurn=true;
    }
    else{
      board[row][col]=computerSelection;
      cellElement.innerHTML=computerSelection;
      if(checkWin(row,col,"Computer"))
      {
        setTimeout(() => {
          window.alert("The Computer has won");
      }, 20);
      gameFinished=true;
      }
      playerTurn=true;
      compTurn=false;
    }
    boardElement++;
  }
  displayMessage();
}
function displayMessage(){
  const message=document.getElementById("message");
  const mes=playerTurn?`Its Player's Turn!`:`Its Computer's Turn!`;
  message.innerHTML=`<p1 class="col-4 text-center" style="font-size:32px;">${mes}</p1>`;
}
// Call the function to render the board
function gameReset(){
 
    board.forEach((row,rowIndex)=>{
      row.forEach((col,colIndex)=>{
        board[rowIndex][colIndex]='';
      })
    })
    boardElement=0;
    document.getElementById("message").innerHTML=`<p1 class="col-6">Its Player's Turn!</p1>`;
    playerTurn=true;
    compTurn=false;
    gameFinished=false;
    renderBoard();
}
function checkWin(row,col,playedBy){
  const sym=board[row][col];
  console.log(boardElement);
  if(boardElement==8 && result===""){
    result="Draw";
  }
  if(board[row][0]===sym && board[row][1]===sym && board[row][2]===sym){
    result=playedBy;
    return true;
  }
  if(board[0][col]===sym && board[1][col]===sym && board[2][col]===sym){
    result=playedBy;
    return true;
  }
  if(board[0][0]===sym && board[1][1]==sym && board[2][2]==sym){
   result=playedBy;
    return true;
  }
  if(board[2][0]===sym && board[1][1]===sym && board[0][2]===sym){
    result=playedBy
    return true;
  }

}
function minimax(board,depth,isMaximizing,player,comp){
  const result=gameFinished;
  if(result!==false){
    return getScore(result,player,comp);
  }
  let bestScore=isMaximizing?-Infinity:Infinity;
  for(let row=0;row<3;row++){
    for(let col=0;col<3;col++){
      if(board[row][col]===''){
        board[row][col]=isMaximizing? player:comp;
        const score=minimax(board,depth+1,!isMaximizing,player,comp);
        board[row][col]='';
        if(isMaximizing){
          bestScore=Math.max(bestScore,score);
        }
        else{
          bestScore=Math.min(bestScore,score);
        }
      }
    }
  }
  return bestScore;
}
function getScore(result,player,comp){
  if(result===player){
    return 1;
  }
  else if(result===comp){
    return -1;
  }
  else if(result==='draw'){
    return 0;
  }
  return null;
}
