from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user, get_db
from backend.app.models.activity import Activity
from backend.app.models.project import Project
from backend.app.models.user import User
from backend.app.models.workspace import Workspace
from backend.app.schemas.workspace import WorkspaceAction, WorkspaceResponse

router = APIRouter()


@router.get("/{project_id}", response_model=WorkspaceResponse)
def get_workspace(
    project_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    workspace = (
        db.query(Workspace)
        .filter(Workspace.project_id == project_id, Workspace.owner_id == current_user.id)
        .first()
    )
    if not workspace:
        # Check if user owns project
        project = (
            db.query(Project)
            .filter(Project.id == project_id, Project.owner_id == current_user.id)
            .first()
        )
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        workspace = Workspace(
            project_id=project_id,
            owner_id=current_user.id,
            status="stopped",
        )
        db.add(workspace)
        db.commit()
        db.refresh(workspace)

    return workspace


@router.post("/{project_id}/action", response_model=WorkspaceResponse)
def trigger_workspace_action(
    project_id: str,
    action_in: WorkspaceAction,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    workspace = (
        db.query(Workspace)
        .filter(Workspace.project_id == project_id, Workspace.owner_id == current_user.id)
        .first()
    )
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.owner_id == current_user.id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if not workspace:
        workspace = Workspace(
            project_id=project_id,
            owner_id=current_user.id,
            status="stopped",
        )
        db.add(workspace)

    action = action_in.action.lower()
    now = datetime.now(timezone.utc)

    if action in ["start", "resume"]:
        workspace.status = "running"
        workspace.started_at = now
        project.workspace_status = "running"
        act_title = "Workspace started"
        act_desc = "Cloud container resumed on AWS Fargate node us-east-1"
    elif action == "stop":
        workspace.status = "stopped"
        workspace.stopped_at = now
        project.workspace_status = "stopped"
        act_title = "Workspace stopped"
        act_desc = "Workspace compute paused. Volume state persisted."
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported action: {action}")

    workspace.updated_at = now
    project.last_activity_at = now

    activity = Activity(
        project_id=project.id,
        owner_id=current_user.id,
        title=act_title,
        description=act_desc,
        activity_type="workspace",
    )
    db.add(activity)

    db.commit()
    db.refresh(workspace)
    return workspace
