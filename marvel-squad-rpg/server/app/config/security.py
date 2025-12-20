from pydantic import BaseModel


class SecurityConfig(BaseModel):
    allow_origins: list[str]
    allow_methods: list[str]
    allow_headers: list[str]
    allow_credentials: bool = True
    csp: str = "default-src 'self'"
