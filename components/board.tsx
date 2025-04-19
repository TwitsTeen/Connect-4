import { Player } from "@/enum";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";

function Board({
  setWinner,
  winner,
  setCurrentPlayer,
  currentPlayer,
  reset,
  onResetComplete,
}: {
  setWinner: React.Dispatch<React.SetStateAction<Player>>;
  winner: Player;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>;
  currentPlayer: Player;
  reset: boolean;
  onResetComplete: () => void;
}) {
  const [board, setBoard] = useState<Player[][]>([]);
  const screenWidth = Dimensions.get("window").width;
  const numCols = 7;
  const padding = 20; // extra padding/margin around the board
  const [cellSize, setCellSize] = useState(0);

  function resetGame() {
    const initialBoard: Player[][] = [];
    for (let i = 0; i < 6; i++) {
      initialBoard[i] = [];
      for (let j = 0; j < 7; j++) {
        initialBoard[i][j] = Player.None;
      }
    }
    setBoard(initialBoard);
  }
  useEffect(() => {
    resetGame();
    onResetComplete();
  }, [reset]);

  useEffect(() => {
    resetGame();

    if (Platform.OS === "android" || Platform.OS === "ios") {
      setCellSize((screenWidth - padding) / numCols);
    } else setCellSize((screenWidth - padding) / (numCols * 2));
  }, []);

  function handleCellClick(row: number, col: number) {
    if (winner !== Player.None) {
      return;
    }
    let placed = false;
    const newBoard = [...board];
    for (let i = 5; i >= 0; i--) {
      if (newBoard[i][col] === Player.None) {
        newBoard[i][col] = currentPlayer;
        placed = true;
        break;
      }
    }
    if (!placed) {
      return;
    }
    setCurrentPlayer((prev) =>
      prev === Player.YELLOW ? Player.RED : Player.YELLOW
    );
    setBoard(newBoard);
    checkWin();
  }

  function checkWin() {
    // Check horizontal, vertical, and diagonal wins
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col] !== Player.None) {
          // Check horizontal
          if (
            col + 3 < 7 &&
            board[row][col] === board[row][col + 1] &&
            board[row][col] === board[row][col + 2] &&
            board[row][col] === board[row][col + 3]
          ) {
            setWinner(board[row][col]);
            return true;
          }
          // Check vertical
          if (
            row + 3 < 6 &&
            board[row][col] === board[row + 1][col] &&
            board[row][col] === board[row + 2][col] &&
            board[row][col] === board[row + 3][col]
          ) {
            setWinner(board[row][col]);
            return true;
          }
          // Check diagonal (bottom-left to top-right)
          if (
            row - 3 >= 0 &&
            col + 3 < 7 &&
            board[row][col] === board[row - 1][col + 1] &&
            board[row][col] === board[row - 2][col + 2] &&
            board[row][col] === board[row - 3][col + 3]
          ) {
            setWinner(board[row][col]);
            return true;
          }
          // Check diagonal (top-left to bottom-right)
          if (
            row + 3 < 6 &&
            col + 3 < 7 &&
            board[row][col] === board[row + 1][col + 1] &&
            board[row][col] === board[row + 2][col + 2] &&
            board[row][col] === board[row + 3][col + 3]
          ) {
            setWinner(board[row][col]);
            return true;
          }
        }
      }
    }
    return false;
  }

  return (
    <View className="w-fit h-fit bg-light-primary dark:bg-dark-secondary rounded-lg shadow-lg">
      <View className="flex flex-column justify-center items-center h-full">
        {board.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row">
            {row.map((cell, cellIndex) => (
              <TouchableOpacity
                key={cellIndex}
                onPress={() => handleCellClick(rowIndex, cellIndex)}
              >
                <View
                  style={{
                    width: cellSize,
                    height: cellSize,
                  }}
                  className={`border-2 border-light-tertiary dark:border-dark-tertiary   ${
                    cell === Player.YELLOW ? "bg-yellow-500" : ""
                  } ${cell === Player.RED ? "bg-red-500" : ""}`}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

export default Board;
