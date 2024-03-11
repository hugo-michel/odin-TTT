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

function createPlayer(name, token) {
	const playerName = name;
	const playerToken = token;

	return { playerName, playerToken };
}

function playGame() {
	const player1 = createPlayer("Player1", "O");
	const player2 = createPlayer("Player 2", "X");
	const board = gameboard();

	let activePlayer = player1;

	const switchTurn = () => {
		activePlayer = activePlayer === player1 ? player2 : player1;
	};

	const newBoard = () => {
		console.log(board.getBoard);
		console.log(`Tour de ${activePlayer.playerName}`);
	};

	const WinOrTie = () => {
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
			console.log("fin de partie");
		}
	};

	const playRound = (index) => {
		board.addToken(index, activePlayer);

		WinOrTie();

		switchTurn();
		newBoard();
	};

	newBoard();

	return { player1, player2, board, switchTurn, playRound, activePlayer };
}

let game = playGame();
