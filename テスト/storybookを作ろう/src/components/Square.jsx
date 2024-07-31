export function Square({ value, onSquareClick }) {
  return (
    <button className="square" style={{ color: 'ed' }} onClick={onSquareClick}>
      {value}
    </button>
  );
}
