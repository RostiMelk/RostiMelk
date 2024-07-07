"use client";

import { useState, useEffect, useCallback } from "react";
import { Board, X1, X2, X3, X4, O1, O2, O3, O4 } from "./svgs";

type Player = "you" | "com";
type Board = Array<Player | null>;

type WinRes = {
  winner: Player | null;
  lineIndex: number | null;
};

const xIcons = [X1, X2, X3, X4];
const oIcons = [O1, O2, O3, O4];

const winPaths = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal LTR
  [2, 4, 6], // Diagonal RTL
];

const winLineStyles: Record<number, React.CSSProperties> = [
  { transform: "translateY(15%) rotate(0deg)" }, // Row 1
  { transform: "translateY(48%) rotate(0deg)" }, // Row 2
  { transform: "translateY(80%) rotate(0deg)" }, // Row 3
  { transform: "translateX(20%) rotate(90deg)" }, // Column 1
  { transform: "translateX(50%) rotate(90deg)" }, // Column 2
  { transform: "translateX(85%) rotate(90deg)" }, // Column 3
  { transform: "translate(10%, 5%) rotate(45deg) scaleX(1.25)" }, // Diagonal LTR
  { transform: "translate(5%, 90%) rotate(-45deg) scaleX(1.25)" }, // Diagonal RTL
];

export const TicTacToeSection = () => {
  const [turn, setTurn] = useState<Player>("you");
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [winningLineIndex, setWinningLineIndex] = useState<number | null>(null);

  const checkWin = useCallback((currentBoard: Board): WinRes => {
    for (let i = 0; i < winPaths.length; i++) {
      const [a, b, c] = winPaths[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a] as Player, lineIndex: i };
      }
    }
    return { winner: null, lineIndex: null };
  }, []);

  const resetBoard = useCallback(() => {
    setTurn("you");
    setBoard(Array(9).fill(null));
    setWinningLineIndex(null);
  }, []);

  const handleMove = useCallback(
    (index: number) => {
      if (board[index] || checkWin(board).winner) return;

      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);
      setTurn((prev) => (prev === "you" ? "com" : "you"));
    },
    [board, checkWin, turn],
  );

  const comMove = useCallback(() => {
    const availableIndices = board
      .map((val, index) => (val === null ? index : null))
      .filter((val) => val !== null);

    if (availableIndices.length === 0) return;

    /* Check if the player or computer can win in the next move and block or win accordingly */
    const peekMove = (player: Player): boolean => {
      for (let index of availableIndices) {
        const newBoard = [...board];
        newBoard[index] = player;
        if (checkWin(newBoard).winner === player) {
          handleMove(index);
          return true;
        }
      }
      return false;
    };

    if (peekMove("com")) return;
    if (peekMove("you")) return;

    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    handleMove(availableIndices[randomIndex]);
  }, [board, handleMove]);

  useEffect(() => {
    const { winner, lineIndex } = checkWin(board);
    if (winner) {
      setTimeout(() => setWinningLineIndex(lineIndex), 500);
      setTimeout(resetBoard, 2500);
    } else if (!board.includes(null)) {
      setTimeout(resetBoard, 1000);
    }
  }, [board, checkWin, resetBoard]);

  useEffect(() => {
    if (turn === "com") {
      setTimeout(comMove, 500);
    }
  }, [turn, comMove]);

  return (
    <section className="relative grid aspect-square w-full max-w-[200px] rotate-6 place-items-center">
      <div className="grid w-full grid-cols-3">
        {board.map((cell, index) => (
          <button
            key={index}
            className="grid aspect-square place-items-center p-[20%]"
            onClick={() => handleMove(index)}
          >
            {cell === "you" && xIcons[index % xIcons.length]()}
            {cell === "com" && oIcons[index % oIcons.length]()}
          </button>
        ))}
      </div>

      {winningLineIndex !== null && (
        <svg
          className="pointer-events-none absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 193 193"
          fill="none"
        >
          <path
            className="animate-draw-long absolute"
            style={winLineStyles[winningLineIndex]}
            d="M2 2C2.02358 2.1672 7.86947 2 7.86947 2C22.6845 4.51457 37.1533 6.09562 52.178 6.9985C73.172 8.2601 94.534 8.11832 115.591 7.71257C123.16 7.56673 130.821 6.02201 138.378 5.87639C146.457 5.72071 154.622 6.79448 162.777 6.79448C162.777 6.79448 173.491 6.0416 179.828 5.87639C181.267 5.83888 193.613 6.79448 190.498 6.79448"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}

      <div className="pointer-events-none absolute inset-0 flex *:w-full">
        <Board />
      </div>
    </section>
  );
};
