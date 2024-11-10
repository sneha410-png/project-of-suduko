// Create the grid and sudoku solver as usual
const gridElement = document.getElementById('sudoku-grid');
const solveButton = document.getElementById('solve-btn');
const clearButton = document.getElementById('clear-btn');

// Initialize a 9x9 Sudoku board
let board = Array(9).fill().map(() => Array(9).fill(0));

// Function to create the grid of inputs
function createGrid() {
    gridElement.innerHTML = ''; // Clear the grid
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.max = '9';
            input.id = `cell-${row}-${col}`;
            input.value = board[row][col] === 0 ? '' : board[row][col];
            input.addEventListener('input', (e) => handleInput(e, row, col));
            gridElement.appendChild(input);
        }
    }
}

// Handle input and update the board
function handleInput(e, row, col) {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 9) {
        board[row][col] = value;
    } else {
        board[row][col] = 0;
    }
}

// Backtracking algorithm to solve Sudoku
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Check if placing a number at (row, col) is valid
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Display the solution on the grid
function displayBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.getElementById(`cell-${row}-${col}`);
            input.value = board[row][col] === 0 ? '' : board[row][col];
        }
    }
}

// Solve the Sudoku puzzle when the solve button is clicked
solveButton.addEventListener('click', () => {
    if (solveSudoku(board)) {
        displayBoard(board);
    } else {
        alert("No solution exists for this Sudoku puzzle.");
    }
});

// Clear the board when the clear button is clicked
clearButton.addEventListener('click', () => {
    board = Array(9).fill().map(() => Array(9).fill(0));
    createGrid();
});

// Initialize the grid when the page loads
createGrid();

// Particle Effect based on mouse position
document.addEventListener('mousemove', (e) => {
    let particle = document.createElement('div');
    particle.classList.add('particle');
    document.body.appendChild(particle);
    particle.style.left = `${e.pageX}px`;
    particle.style.top = `${e.pageY}px`;
    setTimeout(() => particle.remove(), 1000); // Remove particle after animation
});

// Style for the particles (in CSS)
document.styleSheets[0].insertRule(`
    .particle {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        animation: particle-animation 1s ease-out;
    }
`);

document.styleSheets[0].insertRule(`
    @keyframes particle-animation {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`);
