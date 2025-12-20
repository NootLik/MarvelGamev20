export type WsClientOptions = {
  url: string;
  heartbeatMs?: number;
};

export class WsClient {
  private socket?: WebSocket;

  constructor(private readonly options: WsClientOptions) {}

  connect() {
    this.socket = new WebSocket(this.options.url);
  }

  disconnect() {
    this.socket?.close();
  }
}
