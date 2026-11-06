from fastapi import APIRouter

from backend.app.api.v1.endpoints import (
    activity,
    auth,
    github,
    projects,
    users,
    workspaces,
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(workspaces.router, prefix="/workspaces", tags=["Workspaces"])
api_router.include_router(activity.router, prefix="/activity", tags=["Activity"])
api_router.include_router(github.router, prefix="/github", tags=["GitHub"])
