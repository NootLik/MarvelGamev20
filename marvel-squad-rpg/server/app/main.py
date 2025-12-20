from fastapi import FastAPI

from .config.logging import configure_logging
from .config.settings import Settings
from .api.routes.health import router as health_router


def create_app() -> FastAPI:
    settings = Settings()
    configure_logging(settings)

    app = FastAPI(title="Marvel Squad RPG")
    app.include_router(health_router)
    return app


app = create_app()
