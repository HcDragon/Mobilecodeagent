from fastapi import APIRouter, Depends
from pydantic import BaseModel
from backend.app.api.deps import get_current_user
from backend.app.models.user import User

router = APIRouter()


class GitHubStatusResponse(BaseModel):
    connected: bool
    app_installed: bool
    installation_id: str | None = None
    account_login: str | None = None
    message: str


@router.get("/status", response_model=GitHubStatusResponse)
def get_github_status(current_user: User = Depends(get_current_user)):
    return {
        "connected": False,
        "app_installed": False,
        "installation_id": None,
        "account_login": None,
        "message": "GitHub App authorization arrives in Phase 3.",
    }
