const gameInfo = document.querySelector(".game-info");
const allBox = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".new-game-btn");

let currentPlayer;
let gameGrid; //2d array of 3*3 to check we have to more turn or not

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initGame();

// let's create a function to initialize he game
function initGame() {
  currentPlayer = "X";

  //  Empty boxes in Js
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  gameInfo.innerHTML = `Current Player-${currentPlayer}`;

  //  Empty boxes in UI
  allBox.forEach((box,index) => {
    box.textContent = "";
    box.classList.remove("no-pointer-events");

    // box.classList.remove("win"); don't use this
    // initialise box with css pproperties again
    box.classList=`box box${index+1}`;
  });

  //remove new game btn
  newGameBtn.classList.remove("active");
}

// for(let box of allBox){
//    box.addEventListener("click",() => {
//     handleClick(box)
//    })
// }

// function handleClick(index){
//     if(currentPlayer==="X"){
//         currentPlayer="O"
//         index.classList.add("no-pointer-events")
//     }
//     else{
//         currentPlayer="X"
//         index.classList.add("no-pointer-events")

//     }
//     index.innerHTML=currentPlayer
// }

// allBox.forEach( (box,index) => {
//     box.addEventListener("click",() => {
//         handleClick(box)
//     })
// })

// function handleClick(box){
//     if(currentPlayer==="X"){
//        currentPlayer="O"
//       box.classList.add("no-pointer-events")
//     }
//     else{
//         currentPlayer="X"
//       box.classList.add("no-pointer-events")
//     }
//     box.innerHTML=currentPlayer
// }

allBox.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// function handleClick(index,event){
//     // another way to get element
//     // let x=event.target
//     // x.classList.add("no-pointer-events")

//     gameInfo.innerHTML=`Current Player-${currentPlayer}`
//     if(currentPlayer==="X"){
//        allBox[index].innerHTML=currentPlayer
//        allBox[index].classList.add("no-pointer-events")
//        currentPlayer="O"

//     }
//     else{
//         allBox[index].innerHTML=currentPlayer
//         allBox[index].classList.add("no-pointer-events")
//         currentPlayer="X"

//     }

// }

function handleClick(index) {
  if (gameGrid[index] === "") {
    allBox[index].classList.add("no-pointer-events");

    //updating UI
    allBox[index].innerHTML = currentPlayer;

    // Update array
    gameGrid[index] = currentPlayer;

    // swap kro turn ko
    swapTurn();

    // check if koi jeet toh nhi gya

    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  // UI update
  gameInfo.innerHTML = `Current Player-${currentPlayer}`;
}

// Important part in thi project
// 3 boxes must be Non empty+ same value
// win only when 3 indexes of winning positions have same value either X or O otherwise no winner
// means gridGame ke 2,4,6 index pr same values hai toh winner mil jaayega otherwise no winner

// function checkGameOver(){
//     let p,q,r;
//     for(let i=0;i<9;i++){
//             p=winningPositions[i][0]
//             q=winningPositions[i][1]
//             r=winningPositions[i][2]
//             if(gameGrid[p]===gameGrid[q]===gameGrid[r]){
//                 // allBox[p].classList.add("win")
//                 // allBox[q].classList.add("win")
//                 // allBox[r].classList.add("win")
//                 console.log(gameGrid[p],gameGrid[q],gameGrid[r])
//             }
//             else{

//             }
//     }
// }

function checkGameOver() {
  let winner = "";
  winningPositions.forEach((position) => {
    // all 3 boxes should be non-empty and exactly same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {

    
      // get winner
      winner = gameGrid[[position[0]]];

      // disable pointer events after winning the game
      allBox.forEach((box) => {
        box.classList.add("no-pointer-events");
      });


      //   now  we know X or O is a winner so we have to add win class
      allBox[position[0]].classList.add("win");
      allBox[position[1]].classList.add("win");
      allBox[position[2]].classList.add("win");
    }

    // visible new game btn
    if (winner !== "") {
      newGameBtn.classList.add("active");

      //   update game-info in UI
      gameInfo.innerHTML = `Winner Player-${winner}`;

      return;
    }

    // special case can't inculse in else bcoz then it will work for every click and we want it to work after filling all boxes
    // check whether there is no tie
    let fillCount=0
    gameGrid.forEach(box=> {
        if(box!=="")
           fillCount+=1;
    })

    // board is filled
    if(fillCount===9){
        gameInfo.textContent=`Match Tied !`

            // visible new game btn
        newGameBtn.classList.add("active");
    }
  });
}

// New Game Btn

newGameBtn.addEventListener("click", initGame);
