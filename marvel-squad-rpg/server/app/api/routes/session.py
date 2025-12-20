from fastapi import APIRouter

router = APIRouter(prefix="/session", tags=["session"])


@router.post("")
async def create_session() -> dict[str, str]:
    return {"status": "placeholder"}
