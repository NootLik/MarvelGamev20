class MatchmakingService:
    def __init__(self) -> None:
        self.lobbies: dict[str, list[str]] = {}
