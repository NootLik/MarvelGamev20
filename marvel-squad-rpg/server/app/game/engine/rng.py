import random


class MatchRng:
    def __init__(self, seed: int) -> None:
        self.random = random.Random(seed)
