import type { ClientMessage } from "./protocol";

export const validateClientMessage = (message: ClientMessage) => {
  if (!message.type) {
    throw new Error("Message type is required");
  }
};
