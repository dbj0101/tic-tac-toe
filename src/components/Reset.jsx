import GameState from "./GameState";

function Reset({ gameState, onReset }) {
  if (gameState === GameState.inProgress) {
    return <></>;
  } else {
    return (
      <button onClick={onReset} className="reset-button">
        Reset
      </button>
    );
  }
}

export default Reset;
