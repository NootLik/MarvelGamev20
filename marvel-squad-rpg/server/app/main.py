import uuid

from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from .config.logging import configure_logging
from .config.settings import Settings
from .api.routes.health import router as health_router
from .ws.handlers.lobby import (
    assign_player,
    broadcast_room_state,
    get_room,
    handle_lobby_message,
    remove_player,
)
from .ws.manager import ConnectionManager


def create_app() -> FastAPI:
    settings = Settings()
    configure_logging(settings)

    app = FastAPI(title="Marvel Squad RPG")
    app.include_router(health_router)
    manager = ConnectionManager()

    @app.websocket("/ws/lobby")
    async def lobby_socket(websocket: WebSocket) -> None:
        room_id = websocket.query_params.get("room", "local")
        connection_id = uuid.uuid4().hex
        room = get_room(room_id)
        player_id = assign_player(room, connection_id)
        if not player_id:
            await websocket.close(code=1008)
            return
        await websocket.accept()
        manager.add(room_id, connection_id, websocket)
        await broadcast_room_state(room, manager)
        try:
            while True:
                payload = await websocket.receive_json()
                await handle_lobby_message(payload, room, player_id, manager)
        except WebSocketDisconnect:
            remove_player(room, connection_id)
            manager.remove(room_id, connection_id)
            await broadcast_room_state(room, manager)
    return app


app = create_app()
