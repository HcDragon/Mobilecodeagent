from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.api.deps import get_current_user, get_db
from backend.app.models.activity import Activity
from backend.app.models.user import User
from backend.app.schemas.activity import ActivityResponse

router = APIRouter()


@router.get("/", response_model=List[ActivityResponse])
def read_activities(
    project_id: Optional[str] = None,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Activity).filter(Activity.owner_id == current_user.id)
    if project_id:
        query = query.filter(Activity.project_id == project_id)

    activities = query.order_by(Activity.created_at.desc()).limit(limit).all()
    return activities
