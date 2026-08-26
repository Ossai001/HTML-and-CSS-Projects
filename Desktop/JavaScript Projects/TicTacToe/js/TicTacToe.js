// Stores the customised image paths.
const xImage = "./images/x.jpg";
const oImage = "./images/o.png";

// Stores the customised sound paths.
const placementSound = "./media/bell.mp3";
const tieSound = "./media/rain.mp3";
const winningSound = "./media/van.mp3";

// Keeps track of the current player.
let activePlayer = "X";

// Stores every selected square and its player.
let selectedSquares = [];

// Prevents moves after the game has ended.
let gameFinished = false;

// Places an X or O in the selected square.
function placeXOrO(squareNumber) {
    // Stops the function after the game has ended.
    if (gameFinished) {
        return false;
    }

    // Checks whether the selected square is occupied.
    let squareAlreadySelected = selectedSquares.some(
        element => element.includes(squareNumber)
    );

    if (squareAlreadySelected) {
        return false;
    }

    // Retrieves the selected HTML square.
    let selectedSquare =
        document.getElementById(squareNumber);

    // Displays the correct customised image.
    if (activePlayer === "X") {
        selectedSquare.style.backgroundImage =
            `url("${xImage}")`;
    } else {
        selectedSquare.style.backgroundImage =
            `url("${oImage}")`;
    }

    // Stores the square number and current player.
    selectedSquares.push(squareNumber + activePlayer);

    // Plays the customised placement sound.
    audio(placementSound);

    // Checks whether the move produced a win or tie.
    let gameEnded = checkWinConditions();

    if (gameEnded) {
        return true;
    }

    // Changes the active player.
    if (activePlayer === "X") {
        activePlayer = "O";

        document.getElementById("game-message").innerHTML =
            "The computer is thinking...";

        // Temporarily prevents the user from clicking.
        disableClick();

        // Gives the computer its turn after one second.
        setTimeout(function () {
            computersTurn();
        }, 1000);
    } else {
        activePlayer = "X";

        document.getElementById("game-message").innerHTML =
            "Your turn!";
    }

    return true;
}

// Randomly selects an available square for the computer.
function computersTurn() {
    // Stops the computer after the game has ended.
    if (gameFinished) {
        return;
    }

    let availableSquares = [];

    // Finds every unoccupied square.
    for (let i = 0; i < 9; i++) {
        let squareNumber = String(i);

        let squareUsed = selectedSquares.some(
            element => element.includes(squareNumber)
        );

        if (!squareUsed) {
            availableSquares.push(squareNumber);
        }
    }

    // Randomly selects one available square.
    if (availableSquares.length > 0) {
        let randomPosition = Math.floor(
            Math.random() * availableSquares.length
        );

        let computerChoice =
            availableSquares[randomPosition];

        placeXOrO(computerChoice);
    }
}

// Checks every possible winning combination.
function checkWinConditions() {
    // X horizontal wins.
    if (arrayIncludes("0X", "1X", "2X")) {
        winGame("You won!", 50, 100, 558, 100);
        return true;
    } else if (arrayIncludes("3X", "4X", "5X")) {
        winGame("You won!", 50, 304, 558, 304);
        return true;
    } else if (arrayIncludes("6X", "7X", "8X")) {
        winGame("You won!", 50, 508, 558, 508);
        return true;

    // X vertical wins.
    } else if (arrayIncludes("0X", "3X", "6X")) {
        winGame("You won!", 100, 50, 100, 558);
        return true;
    } else if (arrayIncludes("1X", "4X", "7X")) {
        winGame("You won!", 304, 50, 304, 558);
        return true;
    } else if (arrayIncludes("2X", "5X", "8X")) {
        winGame("You won!", 508, 50, 508, 558);
        return true;

    // X diagonal wins.
    } else if (arrayIncludes("6X", "4X", "2X")) {
        winGame("You won!", 100, 508, 510, 90);
        return true;
    } else if (arrayIncludes("0X", "4X", "8X")) {
        winGame("You won!", 100, 100, 520, 520);
        return true;

    // O horizontal wins.
    } else if (arrayIncludes("0O", "1O", "2O")) {
        winGame(
            "The computer won!",
            50,
            100,
            558,
            100
        );

        return true;
    } else if (arrayIncludes("3O", "4O", "5O")) {
        winGame(
            "The computer won!",
            50,
            304,
            558,
            304
        );

        return true;
    } else if (arrayIncludes("6O", "7O", "8O")) {
        winGame(
            "The computer won!",
            50,
            508,
            558,
            508
        );

        return true;

    // O vertical wins.
    } else if (arrayIncludes("0O", "3O", "6O")) {
        winGame(
            "The computer won!",
            100,
            50,
            100,
            558
        );

        return true;
    } else if (arrayIncludes("1O", "4O", "7O")) {
        winGame(
            "The computer won!",
            304,
            50,
            304,
            558
        );

        return true;
    } else if (arrayIncludes("2O", "5O", "8O")) {
        winGame(
            "The computer won!",
            508,
            50,
            508,
            558
        );

        return true;

    // O diagonal wins.
    } else if (arrayIncludes("6O", "4O", "2O")) {
        winGame(
            "The computer won!",
            100,
            508,
            510,
            90
        );

        return true;
    } else if (arrayIncludes("0O", "4O", "8O")) {
        winGame(
            "The computer won!",
            100,
            100,
            520,
            520
        );

        return true;

    // Checks whether the game ended in a tie.
    } else if (selectedSquares.length >= 9) {
        gameFinished = true;

        document.getElementById("game-message").innerHTML =
            "The game ended in a tie!";

        // Plays rain.mp3 for a tied game.
        audio(tieSound);

        // Resets the game after the sound begins.
        setTimeout(function () {
            resetGame();
        }, 1500);

        return true;
    }

    return false;
}

// Checks whether three moves exist in selectedSquares.
function arrayIncludes(squareA, squareB, squareC) {
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);

    return a === true && b === true && c === true;
}

// Completes a winning game.
function winGame(
    message,
    coordX1,
    coordY1,
    coordX2,
    coordY2
) {
    gameFinished = true;

    // Displays the result.
    document.getElementById("game-message").innerHTML =
        message;

    // Draws the winning line.
    drawWinLine(
        coordX1,
        coordY1,
        coordX2,
        coordY2
    );
}

// Temporarily makes the page unclickable.
function disableClick() {
    let body = document.getElementById("body");

    body.style.pointerEvents = "none";

    // Restores clicking after one second.
    setTimeout(function () {
        body.style.pointerEvents = "auto";
    }, 1000);
}

// Plays the supplied customised sound.
function audio(audioURL) {
    let gameSound = new Audio(audioURL);

    gameSound.play().catch(function () {
        console.log(
            "The browser prevented audio playback."
        );
    });
}

// Draws an animated line through the winning squares.
function drawWinLine(
    coordX1,
    coordY1,
    coordX2,
    coordY2
) {
    // Retrieves the canvas and its drawing context.
    const canvas =
        document.getElementById("win-lines");

    const context = canvas.getContext("2d");

    // Stores the temporary animated coordinates.
    let currentX = coordX1;
    let currentY = coordY1;

    // Prevents clicking while the win is displayed.
    disableClick();

    // Plays van.mp3 when somebody wins.
    audio(winningSound);

    // Animates the winning line.
    function animateLineDrawing() {
        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        context.beginPath();
        context.moveTo(coordX1, coordY1);
        context.lineTo(currentX, currentY);

        context.lineWidth = 10;
        context.strokeStyle =
            "rgba(70, 255, 33, 0.8)";
        context.lineCap = "round";
        context.stroke();

        let differenceX = coordX2 - currentX;
        let differenceY = coordY2 - currentY;

        // Stops after reaching the final coordinates.
        if (
            Math.abs(differenceX) <= 10 &&
            Math.abs(differenceY) <= 10
        ) {
            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            context.beginPath();
            context.moveTo(coordX1, coordY1);
            context.lineTo(coordX2, coordY2);

            context.lineWidth = 10;
            context.strokeStyle =
                "rgba(70, 255, 33, 0.8)";
            context.lineCap = "round";
            context.stroke();

            return;
        }

        // Moves horizontally toward the endpoint.
        if (currentX < coordX2) {
            currentX += Math.min(
                10,
                coordX2 - currentX
            );
        } else if (currentX > coordX2) {
            currentX -= Math.min(
                10,
                currentX - coordX2
            );
        }

        // Moves vertically toward the endpoint.
        if (currentY < coordY2) {
            currentY += Math.min(
                10,
                coordY2 - currentY
            );
        } else if (currentY > coordY2) {
            currentY -= Math.min(
                10,
                currentY - coordY2
            );
        }

        requestAnimationFrame(animateLineDrawing);
    }

    // Starts the animation.
    animateLineDrawing();

    // Resets the game after displaying the win.
    setTimeout(function () {
        clearCanvas();
        resetGame();
    }, 1500);
}

// Clears the canvas.
function clearCanvas() {
    const canvas =
        document.getElementById("win-lines");

    const context = canvas.getContext("2d");

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

// Resets the game after a win or tie.
function resetGame() {
    // Removes all background images.
    for (let i = 0; i < 9; i++) {
        let square =
            document.getElementById(String(i));

        square.style.backgroundImage = "";
    }

    // Clears the stored moves.
    selectedSquares = [];

    // Returns the first turn to X.
    activePlayer = "X";

    // Allows a new game to begin.
    gameFinished = false;

    // Clears the canvas.
    clearCanvas();

    // Makes the page clickable.
    document.getElementById("body")
        .style.pointerEvents = "auto";

    // Restores the opening message.
    document.getElementById("game-message").innerHTML =
        "Your turn!";
}