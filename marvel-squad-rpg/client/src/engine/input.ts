export type InputAction = {
  type: string;
  payload?: Record<string, unknown>;
};

export const mapInputToAction = (event: Event): InputAction => {
  return { type: "noop", payload: { eventType: event.type } };
};
