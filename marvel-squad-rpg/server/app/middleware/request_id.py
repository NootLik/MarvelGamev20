import uuid
from fastapi import Request


def attach_request_id(request: Request) -> str:
    return request.headers.get("X-Request-ID", str(uuid.uuid4()))
