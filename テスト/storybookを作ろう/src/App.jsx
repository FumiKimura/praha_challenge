import { useState } from 'react';
import { Game } from './components/Game';

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  return (
    <>
      <Game
        history={history}
        currentMove={currentMove}
        setCurrentMove={setCurrentMove}
        setHistory={setHistory}
      />
    </>
  );
}
