from dataclasses import dataclass, field
from typing import Any

from fastapi import WebSocket


@dataclass
class ConnectionManager:
    rooms: dict[str, set[str]] = field(default_factory=dict)
    connections: dict[str, WebSocket] = field(default_factory=dict)

    def add(self, room_id: str, connection_id: str, websocket: WebSocket) -> None:
        self.rooms.setdefault(room_id, set()).add(connection_id)
        self.connections[connection_id] = websocket

    def remove(self, room_id: str, connection_id: str) -> None:
        room = self.rooms.get(room_id)
        if room:
            room.discard(connection_id)
            if not room:
                self.rooms.pop(room_id, None)
        self.connections.pop(connection_id, None)

    async def send_json(self, connection_id: str, payload: dict[str, Any]) -> None:
        websocket = self.connections.get(connection_id)
        if websocket:
            await websocket.send_json(payload)
