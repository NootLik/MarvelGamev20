from dataclasses import dataclass


@dataclass
class Message:
    type: str
    payload: dict
