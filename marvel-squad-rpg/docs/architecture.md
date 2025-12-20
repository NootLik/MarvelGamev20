# Architecture

## Overview
- Client (Vite + TypeScript) renders the UI and sends player actions.
- Server (FastAPI) manages sessions, validation, and game state.
- Shared protocol modules define message formats and types.

## Security highlights
- Strict schema validation on both client and server.
- WebSocket guards enforce size limits and auth checks.
- Rate limiting middleware for HTTP endpoints.
