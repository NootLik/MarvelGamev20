# Protocol

## Transport
- WebSocket for real-time gameplay events.
- HTTP for health checks and session creation.

## Message handling
- Client validates outgoing messages.
- Server validates incoming messages with Pydantic schemas.
