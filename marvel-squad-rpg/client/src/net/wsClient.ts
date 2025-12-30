export type WsClientOptions = {
  url: string;
  heartbeatMs?: number;
};

type MessageHandler = (payload: any) => void;

export class WsClient {
  private socket?: WebSocket;
  private messageHandler?: MessageHandler;

  constructor(private readonly options: WsClientOptions) {}

  connect() {
    this.socket = new WebSocket(this.options.url);
    this.socket.addEventListener("message", (event) => {
      if (!this.messageHandler) {
        return;
      }
      try {
        const payload = JSON.parse(event.data);
        this.messageHandler(payload);
      } catch (error) {
        console.error("Failed to parse websocket message", error);
      }
    });
  }

  disconnect() {
    this.socket?.close();
  }

  onMessage(handler: MessageHandler) {
    this.messageHandler = handler;
  }

  send(payload: unknown) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(payload));
    }
  }
}
