from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user, get_db
from backend.app.models.activity import Activity
from backend.app.models.project import Project
from backend.app.models.user import User
from backend.app.models.workspace import Workspace
from backend.app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate

router = APIRouter()


@router.get("/", response_model=List[ProjectResponse])
def read_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    projects = db.query(Project).filter(Project.owner_id == current_user.id).all()
    return projects


@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = Project(
        owner_id=current_user.id,
        name=project_in.name,
        description=project_in.description,
        repository_full_name=project_in.repository_full_name,
        primary_language=project_in.primary_language,
        technologies=project_in.technologies,
        branch=project_in.branch,
        workspace_status=project_in.workspace_status,
        server_port=project_in.server_port,
        preview_url=project_in.preview_url,
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    # Automatically create workspace metadata
    workspace = Workspace(
        project_id=project.id,
        owner_id=current_user.id,
        status="stopped",
        host_node="aws-fargate-us-east-1",
    )
    db.add(workspace)

    # Log activity
    activity = Activity(
        project_id=project.id,
        owner_id=current_user.id,
        title="Project created",
        description=f"Initialized {project.name} on branch {project.branch}",
        activity_type="workspace",
    )
    db.add(activity)
    db.commit()

    return project


@router.get("/{project_id}", response_model=ProjectResponse)
def read_project(
    project_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.owner_id == current_user.id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: str,
    project_in: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.owner_id == current_user.id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_data = project_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)

    project.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(project)
    return project


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.owner_id == current_user.id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()
    return None
