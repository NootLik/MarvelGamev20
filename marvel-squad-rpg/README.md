# Marvel Squad RPG

Pixel-art, turn-based Marvel squad RPG designed for two-player remote play in a web browser.

## Goals
- Two-player remote sessions with low friction hosting.
- Secure-by-default networking and storage.
- Separation between game logic/graphics and networking.

## Repository layout
See `docs/` for architecture, threat model, and protocol details.

## Development
- Client: Vite + TypeScript
- Server: FastAPI + WebSockets

## Security
Review `SECURITY.md` and `docs/threat-model.md` before deploying.
