from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ActivityCreate(BaseModel):
    project_id: str
    title: str
    description: Optional[str] = None
    activity_type: Optional[str] = "workspace"


class ActivityResponse(BaseModel):
    id: str
    project_id: str
    owner_id: str
    title: str
    description: Optional[str] = None
    activity_type: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
