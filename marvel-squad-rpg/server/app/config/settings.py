from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    server_host: str = Field("0.0.0.0", alias="SERVER_HOST")
    server_port: int = Field(8000, alias="SERVER_PORT")
    client_origin: str = Field("http://localhost:5173", alias="CLIENT_ORIGIN")
    session_secret: str = Field("change-me", alias="SESSION_SECRET")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
