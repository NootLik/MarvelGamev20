export type ClientMessage = {
  type: string;
  payload: Record<string, unknown>;
};

export type ServerMessage = {
  type: string;
  payload: Record<string, unknown>;
};
