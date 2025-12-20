from pydantic import BaseModel


class Envelope(BaseModel):
    type: str
    payload: dict
