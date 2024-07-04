'use client';

import { useState, useEffect } from 'react';
import { Board, X1, X2, X3, X4, O1, O2, O3, O4 } from './svgs';

const xIcons = [X1, X2, X3, X4];
const oIcons = [O1, O2, O3, O4];

export const TicTacToeSection = () => {
	const [board, setBoard] = useState(Array(9).fill(''));
	const [turn, setTurn] = useState('X');

	const checkWin = (board: string[]) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8], // Rows
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8], // Columns
			[0, 4, 8],
			[2, 4, 6], // Diagonals
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}
		return null;
	};

	const resetBoard = () => {
		setBoard(Array(9).fill(''));
		setTurn('X');
	};

	const handleMove = (index: number) => {
		if (!board[index] && !checkWin(board)) {
			const newBoard = [...board];
			newBoard[index] = turn;
			setBoard(newBoard);
			setTurn(turn === 'X' ? 'O' : 'X');
		}
	};

	const computerMove = () => {
		const availableIndices = board.map((val, idx) => (val === '' ? idx : null)).filter((val) => val !== null);
		if (availableIndices.length > 0) {
			const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)] as number;
			handleMove(randomIndex);
		}
	};

	useEffect(() => {
		if (turn === 'O') {
			setTimeout(computerMove, 500);
		}
	}, [turn]);

	useEffect(() => {
		if (checkWin(board) || !board.includes('')) {
			setTimeout(resetBoard, 2000);
		}
	}, [board]);

	return (
		<section className="w-full relative max-w-[200px] rotate-6 grid place-items-center">
			<div className="grid grid-cols-3 gap-2 w-full">
				{board.map((cell, index) => (
					<button
						key={index}
						className="aspect-square p-[20%] grid place-items-center"
						onClick={() => handleMove(index)}
					>
						{cell === 'X'
							? xIcons[index % xIcons.length]()
							: cell === 'O'
							? oIcons[index % oIcons.length]()
							: null}
					</button>
				))}
			</div>
			<div className="absolute inset-0 flex pointer-events-none &>svg:w-full">
				<Board />
			</div>
		</section>
	);
};
