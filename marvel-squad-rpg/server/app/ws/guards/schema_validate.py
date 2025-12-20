from pydantic import BaseModel


class MessageEnvelope(BaseModel):
    type: str
    payload: dict
