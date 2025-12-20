from dataclasses import dataclass, field


@dataclass
class ConnectionManager:
    rooms: dict[str, set[str]] = field(default_factory=dict)

    def add(self, room_id: str, connection_id: str) -> None:
        self.rooms.setdefault(room_id, set()).add(connection_id)
