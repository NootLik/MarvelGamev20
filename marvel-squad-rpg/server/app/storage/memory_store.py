class MemoryStore:
    def __init__(self) -> None:
        self.sessions: dict[str, dict] = {}
