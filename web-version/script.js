const board = document.querySelector(".board");

for(let i = 0; i < 30; i++) {
    const tile = document.createElement("div");

    tile.classList.add("tile");

    board.appendChild(tile);
}