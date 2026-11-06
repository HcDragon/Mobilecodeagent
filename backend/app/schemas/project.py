from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    repository_full_name: Optional[str] = None
    primary_language: Optional[str] = None
    technologies: List[str] = []
    branch: str = "main"
    workspace_status: str = "stopped"
    server_port: Optional[int] = None
    preview_url: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    description: Optional[str] = None
    branch: Optional[str] = None
    workspace_status: Optional[str] = None
    server_port: Optional[int] = None
    preview_url: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: str
    owner_id: str
    last_activity_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
