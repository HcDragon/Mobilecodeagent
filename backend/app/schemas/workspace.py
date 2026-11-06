from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class WorkspaceAction(BaseModel):
    action: str  # start, stop, resume


class WorkspaceResponse(BaseModel):
    id: str
    project_id: str
    owner_id: str
    status: str
    host_node: Optional[str] = None
    container_id: Optional[str] = None
    preview_url: Optional[str] = None
    started_at: Optional[datetime] = None
    stopped_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
