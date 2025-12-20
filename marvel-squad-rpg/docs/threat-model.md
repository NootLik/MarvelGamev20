# Threat Model

## Assumptions
- Two players per match.
- Internet-facing server behind TLS termination.

## Primary threats
- Unauthorized WebSocket access.
- Message replay or tampering.
- Abuse of session creation or lobby endpoints.
- Denial-of-service through oversized messages.

## Mitigations
- Token-based session auth for WS upgrades.
- Nonce-based turn validation.
- Message size guards and rate limiting.
- Strict CORS and CSP configuration.
