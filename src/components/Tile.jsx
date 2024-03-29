function Tile({ className, value, onClick, playerTurn }) {
  return (
    <div
      onClick={onClick}
      className={`tile ${className} ${
        value == null && playerTurn != null
          ? playerTurn.toLowerCase() + "-hover"
          : ""
      }`}
    >
      {value}
    </div>
  );
}

export default Tile;
