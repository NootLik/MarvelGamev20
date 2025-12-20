from pydantic import BaseModel


class WsAuthContext(BaseModel):
    session_id: str
    player_id: str
