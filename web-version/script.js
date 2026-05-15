const secretWord="NAIVE";
const board = document.querySelector(".board");

const rows=6;
const cols=5;


let currentRow=0;
let currentCol=0;

const tiles=[];

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

document.addEventListener("keydown", (event) => {

    const key = event.key;

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
        let guess="";
        for(let c=0;c<cols;c++){
            guess += tiles[currentRow][c].textContent;
        }
        console.log(guess);

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
        
                tiles[currentRow][c].classList.add("correct");
        
                letterCount[guess[c]]--;
            }
        }
        for(let c = 0; c < cols; c++) {

            //skip already green
            if(tiles[currentRow][c].classList.contains("correct")) {
                continue;
            }
        
            const letter = guess[c];
        
            if(letterCount[letter] > 0) {
        
                tiles[currentRow][c].classList.add("present");
        
                letterCount[letter]--;
        
            } else {
        
                tiles[currentRow][c].classList.add("absent");
            }
        }
            currentRow++;
            currentCol=0;
        }
    }
});