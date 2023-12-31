import { Board } from '../components/Board';

export default {
    component: Board,
    title: 'Board',
    tags: [],
};

export const Default = {
    args: {
        xIsNext: true,
        squares: Array(9).fill(null),
        onPlay: () => {},
    },
};