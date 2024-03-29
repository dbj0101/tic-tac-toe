import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import GameOverSoundAsset from "../sounds/gameOver.wav";
import ClickSoundAsset from "../sounds/click.wav";

const gameOverSound = new Audio(GameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(ClickSoundAsset);
clickSound.volume = 0.5;

const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
  //Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  //columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileVal1 = tiles[combo[0]];
    const tileVal2 = tiles[combo[1]];
    const tileVal3 = tiles[combo[2]];

    if (tileVal1 !== null && tileVal1 === tileVal2 && tileVal1 === tileVal3) {
      setStrikeClass(strikeClass);
      if (tileVal1 === PLAYER_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      gameOverSound.play();
    }
  }, [gameState]);

  const handleTileClick = (index) => {
    if (tiles[index] !== null || gameState !== GameState.inProgress) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    playerTurn === PLAYER_X ? setPlayerTurn(PLAYER_O) : setPlayerTurn(PLAYER_X);
  };

  const handleReset = () => {
    console.log("reset clicked");
    if (gameState === GameState.playerOWins) {
      setPlayerTurn(PLAYER_X);
    } else if (gameState === GameState.playerXWins) {
      setPlayerTurn(PLAYER_O);
      //} else if (playerTurn === PLAYER_X) {
      //  setPlayerTurn(PLAYER_O);
    } else {
      //setPlayerTurn(PLAYER_X);
      setPlayerTurn(playerTurn);
    }
    setTiles(Array(9).fill(null));
    setStrikeClass();
    setGameState(GameState.inProgress);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
        tiles={tiles}
        onTileClick={handleTileClick}
        playerTurn={playerTurn}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}

export default TicTacToe;
