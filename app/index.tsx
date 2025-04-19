import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import Board from "@/components/board";
import { useState } from "react";
import { Player } from "@/enum";
export default function Index() {
  const [winner, setWinner] = useState<Player>(Player.None);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.YELLOW);
  const [reset, setReset] = useState(false);

  function restartGame() {
    setWinner(Player.None);
    setCurrentPlayer(Player.YELLOW);
    setReset(true);
  }

  function onResetComplete() {
    setReset(false);
  }

  return (
    <ScrollView className="bg-light-primary dark:bg-dark-primary">
      <View className="flex-1 justify-center items-center">
        <Board
          setWinner={setWinner}
          setCurrentPlayer={setCurrentPlayer}
          currentPlayer={currentPlayer}
          reset={reset}
          onResetComplete={onResetComplete}
        />

        {winner !== Player.None ? (
          <View className="bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg shadow-lg mt-8">
            <Text className="text-2xl font-bold text-light-text dark:text-dark-text">
              Game Over!
            </Text>
            <Text className="text-xl text-light-text dark:text-dark-text mt-2">
              The winner is: {winner === Player.YELLOW ? "Yellow" : "Red"}
            </Text>
            <TouchableOpacity
              className="bg-light-primary dark:bg-dark-primary p-2 rounded-lg mt-4"
              onPress={() => {
                restartGame();
              }}
            >
              <Text className="text-lg text-light-text dark:text-dark-text">
                Play Again
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-3xl font-bold text-light-text dark:text-dark-text mb-8">
            Current Player Turn :{" "}
            {currentPlayer === Player.YELLOW ? "Yellow" : "Red"}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
