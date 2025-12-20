export type GameStateView = {
  turn: number;
  players: string[];
};

export const createEmptyStateView = (): GameStateView => ({
  turn: 0,
  players: []
});
