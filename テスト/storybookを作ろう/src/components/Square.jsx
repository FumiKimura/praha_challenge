export function Square({ value, onSquareClick, index }) {
  return (
    <button
      className="square"
      style={{ color: 'ed' }}
      data-e2e={`square-${index}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
