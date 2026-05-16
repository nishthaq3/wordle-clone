const secretWord=words[Math.floor(Math.random() * words.length)].toUpperCase();
const board = document.querySelector(".board");

const rows=6;
const cols=5;


let currentRow=0;
let currentCol=0;
let isAnimating=false;
let gameEnd=false;

const tiles=[];

function showMessage(text){

    const container = document.getElementById("message-container");

    container.innerHTML = "";

    const message = document.createElement("div");

    message.classList.add("message");

    message.textContent = text;

    container.appendChild(message);
}
function colorKey(letter, className){

    const keys = document.querySelectorAll(".key");

    keys.forEach((key) => {

        if(key.textContent === letter){

            if(key.classList.contains("correct")){
                return;
            }

            if(
                key.classList.contains("present")
                &&
                className === "absent"
            ){
                return;
            }

            key.classList.remove("present");
            key.classList.remove("absent");

            key.classList.add(className);
        }
    });
}

for(let r=0;r<rows;r++){
   const row=[]
    for(let c=0;c<cols;c++){
       const tile=document.createElement("div");
       tile.classList.add("tile");
       board.appendChild(tile);
       row.push(tile);
    }
    tiles.push(row);
}
function handleKeyPress(key){
    if(gameEnd || isAnimating){
        return;
    }
    if(currentCol < cols && /^[a-zA-Z]$/.test(key)) {

        tiles[currentRow][currentCol].textContent = key.toUpperCase();

        currentCol++;
    }
    //adding backspace feature
    else if(key==="Backspace"){
        if(currentCol>0){
            currentCol--;
            tiles[currentRow][currentCol].textContent="";
        }
    }
    //move to next line if pressed enter
    else if(key==="Enter"){

        if(currentCol===cols){
            //adding guess logic
            const rowToEvaluate = currentRow;
        let guess="";
        for(let c=0;c<cols;c++){
            guess += tiles[currentRow][c].textContent;
        }
        console.log(guess);
        
        if(!words.includes(guess.toLowerCase())){

            showMessage("Not in word list");
        
            return;
        }
        isAnimating = true;
        const letterCount = {};
        for(let letter of secretWord) {

            if(letterCount[letter]) {
                letterCount[letter]++;
            } else {
                letterCount[letter] = 1;
            }
        }
        for(let c = 0; c < cols; c++) {

            if(guess[c] === secretWord[c]) {
                
                setTimeout(() => {

                    tiles[rowToEvaluate][c].classList.add("flip");
                
                    tiles[rowToEvaluate][c].classList.add("correct");
                    colorKey(guess[c], "correct");
                
                }, c * 450);
        
                letterCount[guess[c]]--;
            }
        }
        for(let c = 0; c < cols; c++) {

            //skip already green
            if(guess[c] === secretWord[c]) {
                continue;
            }
        
            const letter = guess[c];
        
            if(letterCount[letter] > 0) {
        
                setTimeout(() => {

                    tiles[rowToEvaluate][c].classList.add("flip");
                
                    tiles[rowToEvaluate][c].classList.add("present");
                    colorKey(letter, "present");
                
                }, c * 450);
        
                letterCount[letter]--;
        
            } else {
        
                setTimeout(() => {

                    tiles[rowToEvaluate][c].classList.add("flip");
                
                    tiles[rowToEvaluate][c].classList.add("absent");
                    colorKey(letter, "absent");
                
                }, c * 450);
            }
        }
        if(guess === secretWord){

            gameEnd = true;
        
            showMessage("You guessed it!");
            return;
        }
            currentRow++;
            currentCol=0;
            setTimeout(() => {

                isAnimating = false;
            
            }, cols * 450);
            if(currentRow === rows){

                gameEnd = true;
            
                showMessage(`Game Over! The word was ${secretWord}`);
                return;
            }
        }
    }
}
document.addEventListener("keydown", (event) => {

    handleKeyPress(event.key);
});
const keys = document.querySelectorAll(".key");

keys.forEach((button) => {

    button.addEventListener("click", () => {

        let key = button.textContent.trim();

        if(key === "⌫"){
            key = "Backspace";
        }
        else if(key === "ENTER"){
            key = "Enter";
        }
        else{
            key = key.toUpperCase();
        }
        
        handleKeyPress(key);
        });
    });
document.getElementById("restart-btn")
    .addEventListener("click", () => {

        location.reload();
});