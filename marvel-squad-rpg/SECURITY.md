# Security Policy

## Reporting a vulnerability
Please open a private disclosure channel with the maintainer. If this is not possible, file a GitHub issue marked **security** with minimal details.

## Security goals
- Minimal attack surface (only required ports exposed).
- Strong session validation for all WebSocket messages.
- Rate limiting and message size enforcement.
- Defense-in-depth schema validation on both client and server.

## Deployment notes
- Run behind TLS termination (e.g., Caddy, Nginx, or a trusted reverse proxy).
- Restrict CORS origins to known domains.
- Rotate secrets and session keys.
