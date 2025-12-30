from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from ..manager import ConnectionManager


@dataclass
class LobbySettings:
    team_point_cap: int = 20
    see_opponent_selection: bool = False
    allow_duplicate_selection: bool = True


@dataclass
class RoomState:
    room_id: str
    players: dict[str, str] = field(default_factory=dict)
    selections: dict[str, list[str]] = field(default_factory=lambda: {"one": [], "two": []})
    ready: dict[str, bool] = field(default_factory=lambda: {"one": False, "two": False})
    settings: LobbySettings = field(default_factory=LobbySettings)


ROOMS: dict[str, RoomState] = {}


def get_room(room_id: str) -> RoomState:
    if room_id not in ROOMS:
        ROOMS[room_id] = RoomState(room_id=room_id)
    return ROOMS[room_id]


def assign_player(room: RoomState, connection_id: str) -> str | None:
    if "one" not in room.players:
        room.players["one"] = connection_id
        return "one"
    if "two" not in room.players:
        room.players["two"] = connection_id
        return "two"
    return None


def remove_player(room: RoomState, connection_id: str) -> str | None:
    for player_id, stored_id in list(room.players.items()):
        if stored_id == connection_id:
            room.players.pop(player_id, None)
            room.selections[player_id] = []
            room.ready[player_id] = False
            return player_id
    return None


def find_player_id(room: RoomState, connection_id: str) -> str | None:
    for player_id, stored_id in room.players.items():
        if stored_id == connection_id:
            return player_id
    return None


def build_state_payload(room: RoomState, player_id: str) -> dict[str, Any]:
    opponent_id = "two" if player_id == "one" else "one"
    show_opponent = room.settings.see_opponent_selection
    selections = {
        "self": room.selections[player_id],
        "opponent": room.selections[opponent_id] if show_opponent else [],
        "opponentHidden": not show_opponent,
    }
    ready = {
        "self": room.ready[player_id],
        "opponent": room.ready[opponent_id],
    }
    return {
        "type": "state",
        "payload": {
            "roomId": room.room_id,
            "playerId": player_id,
            "settings": {
                "teamPointCap": room.settings.team_point_cap,
                "seeOpponentSelection": room.settings.see_opponent_selection,
                "allowDuplicateSelection": room.settings.allow_duplicate_selection,
            },
            "selections": selections,
            "ready": ready,
            "players": {
                "count": len(room.players),
                "assigned": sorted(room.players.keys()),
            },
        },
    }


async def broadcast_room_state(room: RoomState, manager: ConnectionManager) -> None:
    for connection_id in manager.rooms.get(room.room_id, set()):
        player_id = find_player_id(room, connection_id)
        if not player_id:
            continue
        await manager.send_json(connection_id, build_state_payload(room, player_id))


async def handle_lobby_message(
    payload: dict[str, Any],
    room: RoomState,
    player_id: str,
    manager: ConnectionManager,
) -> None:
    message_type = payload.get("type")
    data = payload.get("payload", {})

    if message_type == "settings:update":
        team_point_cap = data.get("teamPointCap")
        if isinstance(team_point_cap, int):
            room.settings.team_point_cap = team_point_cap
        see_opponent = data.get("seeOpponentSelection")
        if isinstance(see_opponent, bool):
            room.settings.see_opponent_selection = see_opponent
        allow_duplicate = data.get("allowDuplicateSelection")
        if isinstance(allow_duplicate, bool):
            room.settings.allow_duplicate_selection = allow_duplicate
    elif message_type == "selection:update":
        selections = data.get("selections")
        if isinstance(selections, list):
            room.selections[player_id] = [str(item) for item in selections]
    elif message_type == "ready:update":
        ready = data.get("ready")
        if isinstance(ready, bool):
            room.ready[player_id] = ready
    elif message_type == "draft:reset":
        room.selections = {"one": [], "two": []}
        room.ready = {"one": False, "two": False}

    await broadcast_room_state(room, manager)
