import { Game } from '../components/Game';

export default {
  component: Game,
  title: 'Game',
  tags: [],
};

export const Win = {
  args: {
    history: [
      Array(9).fill(null),
      ['X', null, null, null, null, null, null, null, null],
      ['X', 'O', null, null, null, null, null, null, null],
      ['X', 'O', null, null, 'X', null, null, null, null],
      ['X', 'O', 'O', null, 'X', null, null, null, null],
      ['X', 'O', 'O', null, 'X', null, null, null, 'X'],
    ],
    currentMove: 5,
    setCurrentMove: () => {},
    setHistory: () => {},
  },
};

export const Draw = {
  args: {
    history: [
      Array(9).fill(null),
      ['X', null, null, null, null, null, null, null, null],
      ['X', 'O', null, null, null, null, null, null, null],
      ['X', 'O', 'X', null, null, null, null, null, null],
      ['X', 'O', 'X', null, 'O', null, null, null, null],
      ['X', 'O', 'X', 'X', 'O', null, null, null, null],
      ['X', 'O', 'X', 'X', 'O', 'O', null, null, null],
      ['X', 'O', 'X', 'X', 'O', 'O', null, 'X', null],
      ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', null],
      ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'],
    ],
    currentMove: 9,
    setCurrentMove: () => {},
    setHistory: () => {},
  },
};

export const Default = {
  args: {
    history: [Array(9).fill(null)],
    currentMove: 0,
    setCurrentMove: () => {},
    setHistory: () => {},
  },
};
