const newGame = document.querySelector("#new-game");
const result = document.querySelector("#result");

function gameboard() {
	let board = [];
	for (i = 0; i < 9; i++) {
		board.push("");
	}

	const getBoard = board;
	const addToken = (index, player) => {
		board[index] = player.playerToken;
	};

	return { getBoard, addToken };
}

function displayBoard(boardArray) {
	const container = document.querySelector("#container");

	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}

	let length = boardArray.length;

	for (i = 0; i < length; i++) {
		let div = document.createElement("div");
		div.classList.add("cell");
		container.append(div);
	}
}

function createPlayer(name, token) {
	const playerName = name;
	const playerToken = token;

	return { playerName, playerToken };
}

newGame.addEventListener("click", () => {
	playGame();
	result.textContent = "";
});

function playGame() {
	const player1 = createPlayer("Player 1", "O");
	const player2 = createPlayer("Player 2", "X");
	const board = gameboard();

	const currentPlayerDiv = document.querySelector("#current-player");



	const tie = (item) => item !== "";

	let activePlayer = player1;

	const switchTurn = () => {
		activePlayer = activePlayer === player1 ? player2 : player1;
	};

	const newBoard = () => {
		console.log(board.getBoard);
		console.log(`Tour de ${activePlayer.playerName}`);
		currentPlayerDiv.textContent = `Tour de ${activePlayer.playerName}, ${activePlayer.playerToken}`;
	};

	const WinOrTie = () => {
        const cells = document.querySelectorAll(".cell");

		if (
			board.getBoard[0] + board.getBoard[1] + board.getBoard[2] === "OOO" ||
			board.getBoard[0] + board.getBoard[1] + board.getBoard[2] === "XXX" ||
			board.getBoard[3] + board.getBoard[4] + board.getBoard[5] === "OOO" ||
			board.getBoard[3] + board.getBoard[4] + board.getBoard[5] === "XXX" ||
			board.getBoard[6] + board.getBoard[7] + board.getBoard[8] === "OOO" ||
			board.getBoard[6] + board.getBoard[7] + board.getBoard[8] === "XXX" ||
			board.getBoard[0] + board.getBoard[3] + board.getBoard[6] === "OOO" ||
			board.getBoard[0] + board.getBoard[3] + board.getBoard[6] === "XXX" ||
			board.getBoard[1] + board.getBoard[4] + board.getBoard[7] === "OOO" ||
			board.getBoard[1] + board.getBoard[4] + board.getBoard[7] === "XXX" ||
			board.getBoard[2] + board.getBoard[5] + board.getBoard[8] === "OOO" ||
			board.getBoard[2] + board.getBoard[5] + board.getBoard[8] === "XXX" ||
			board.getBoard[0] + board.getBoard[4] + board.getBoard[8] === "OOO" ||
			board.getBoard[0] + board.getBoard[4] + board.getBoard[8] === "XXX" ||
			board.getBoard[2] + board.getBoard[4] + board.getBoard[6] === "OOO" ||
			board.getBoard[2] + board.getBoard[4] + board.getBoard[6] === "XXX"
		) {
			console.log(`End of game, the winner is ${activePlayer.playerName}`);
			result.textContent = `End of game, the winner is ${activePlayer.playerName}`;
            cells.forEach(cell => {
                cell.style.pointerEvents = "none";
            })
		} else if (board.getBoard.every(tie)) {
			console.log("The game is a tie");
			result.textContent = "The game is a tie";
            cells.forEach(cell => {
                cell.style.pointerEvents = "none";
            })
		}
	};

	const playRound = (index) => {
		board.addToken(index, activePlayer);
		WinOrTie();
		switchTurn();
		newBoard();
	};

	function updateBoard(board) {
        const cells = document.querySelectorAll(".cell");

		cells.forEach((cell, index) => {
			cell.addEventListener("click", () => {
				playRound(index);
				cell.textContent = board[index];
				cell.style.pointerEvents = "none";
				currentPlayerDiv.textContent = `Tour de ${activePlayer.playerName}, ${activePlayer.playerToken}`;
			});
		});
	}

	newBoard();
	displayBoard(board.getBoard);
	updateBoard(board.getBoard);

	return { player1, player2, board, switchTurn, playRound, activePlayer };
}

playGame();
