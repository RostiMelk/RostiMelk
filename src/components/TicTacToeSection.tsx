"use client";

import { useState, useEffect, useCallback } from "react";
import { Board, X1, X2, X3, X4, O1, O2, O3, O4 } from "./svgs";

type Player = "you" | "com";

const xIcons = [X1, X2, X3, X4];
const oIcons = [O1, O2, O3, O4];

const winLines = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal LTR
  [2, 4, 6], // Diagonal RTL
];

export const TicTacToeSection = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>("you");

  const checkWin = useCallback((currentBoard: string[]) => {
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  }, []);

  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(null));
    setTurn("you");
  }, []);

  const handleMove = useCallback(
    (index: number) => {
      if (!board[index] && !checkWin(board)) {
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);
        setTurn(turn === "you" ? "com" : "you");
      }
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
        if (checkWin(newBoard) === player) {
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
    const win = checkWin(board);
    const boardFull = !board.includes(null);
    if (win || boardFull) {
      setTimeout(resetBoard, 2000);
    }
  }, [board, checkWin, resetBoard]);

  useEffect(() => {
    if (turn === "com") {
      setTimeout(comMove, 500);
    }
  }, [turn, comMove]);

  return (
    <section className="relative grid aspect-square w-full max-w-[200px] rotate-6 place-items-center">
      <div className="grid w-full grid-cols-3 gap-2">
        {board.map((cell: Player, index) => (
          <button
            key={index}
            className="grid aspect-square place-items-center p-[20%]"
            onClick={() => handleMove(index)}
          >
            {cell === "you"
              ? xIcons[index % xIcons.length]()
              : cell === "com"
                ? oIcons[index % oIcons.length]()
                : null}
          </button>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 flex *:w-full">
        <Board />
      </div>
    </section>
  );
};
