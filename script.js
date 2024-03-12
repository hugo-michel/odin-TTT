const newGame = document.querySelector("#new-game");
const result = document.querySelector("#result");

const dialogName = document.querySelector(".input-name");
const confirmBtn = document.querySelector("#confirm");
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");

const dialogRestart = document.querySelector(".dialog-restart");
const newPlayersBtn = document.querySelector("#new-players");

const player1Display = document.querySelector(".player1-display");
const player2Display = document.querySelector(".player2-display");

const player1NameDisplay = document.querySelector(".player1-name-display");
const player2NameDisplay = document.querySelector(".player2-name-display");

const player1ScoreDisplay = document.querySelector(".player1-score-display");
const player2ScoreDisplay = document.querySelector(".player2-score-display");

const clr1 = "#E0BC59";
const clr2 = "#4C8EDF";

//confirm names, start game
confirmBtn.addEventListener("click", (event) => {
	event.preventDefault();

	let player1Name = player1Input.value;
	let player2Name = player2Input.value;

	if (player1Name != "" && player2Name != "") {
		player1 = createPlayer(`${player1Name}`, "O");
		player2 = createPlayer(`${player2Name}`, "X");

		player1NameDisplay.textContent = `${player1.playerName} : O`;
		player2NameDisplay.textContent = `${player2.playerName} : X`;

		player1ScoreDisplay.textContent = `Score : ${player1.getScore()}`;
		player2ScoreDisplay.textContent = `Score : ${player2.getScore()}`;

		player1Input.value = "";
		player2Input.value = "";

		dialogName.close();
		playGame(player1, player2);
	}
});

//new players name, reset class for highlight turn
newPlayersBtn.addEventListener("click", () => {
	dialogRestart.close();
	player1Display.classList.add("currentPlayer1");
	player2Display.classList.remove("currentPlayer2");
	dialogName.showModal();
});

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
		div.classList.add("invisible");

		container.append(div);
	}
}

function createPlayer(name, token) {
	const playerName = name;
	const playerToken = token;
	let score = 0;

	const getScore = () => score;
	const addScore = () => score++;

	return { playerName, playerToken, getScore, addScore };
}

newGame.addEventListener("click", () => {
	playGame(player1, player2);
	player1Display.classList.add("currentPlayer1");
	player2Display.classList.remove("currentPlayer2");
	result.textContent = "";
	dialogRestart.close();
});

function playGame(player1, player2) {
	const board = gameboard();
	//conditions if board is full, check with .every
	const tie = (item) => item !== "";

	let activePlayer = player1;

	const switchTurn = () => {
		activePlayer = activePlayer === player1 ? player2 : player1;
		player1Display.classList.toggle("currentPlayer1");
		player2Display.classList.toggle("currentPlayer2");
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
			result.textContent = `${activePlayer.playerName} Win !`;
			dialogRestart.showModal();
			activePlayer.addScore();
			if (activePlayer === player1) {
				player1ScoreDisplay.textContent = `Score : ${player1.getScore()}`;
			} else if (activePlayer === player2) {
				player2ScoreDisplay.textContent = `Score : ${player2.getScore()}`;
			}
			cells.forEach((cell) => {
				cell.style.pointerEvents = "none";
			});
		} else if (board.getBoard.every(tie)) {
			dialogRestart.showModal();
			result.textContent = "The game is a tie";
			cells.forEach((cell) => {
				cell.style.pointerEvents = "none";
			});
		}
	};

	const playRound = (index) => {
		board.addToken(index, activePlayer);
		WinOrTie();
		switchTurn();
	};

	function updateBoard(board) {
		const cells = document.querySelectorAll(".cell");

		cells.forEach((cell, index) => {
			cell.addEventListener("click", () => {
				playRound(index);
				cell.textContent = board[index];
				cell.classList.remove("invisible");
				cell.style.pointerEvents = "none";
				if (activePlayer === player1) {
					cell.style.color = clr1;
				} else if (activePlayer === player2) {
					cell.style.color = clr2;
				}
			});
		});
	}

	displayBoard(board.getBoard);
	updateBoard(board.getBoard);
}

dialogName.showModal();
