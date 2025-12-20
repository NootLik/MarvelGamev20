import hmac


def timing_safe_equals(a: str, b: str) -> bool:
    return hmac.compare_digest(a, b)
