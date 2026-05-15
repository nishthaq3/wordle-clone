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
            currentRow++;
            currentCol=0;
        }
    }
});