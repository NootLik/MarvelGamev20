import logging

from .settings import Settings


def configure_logging(settings: Settings) -> None:
    logging.basicConfig(level=logging.INFO)
    logging.getLogger("uvicorn").setLevel(logging.INFO)
