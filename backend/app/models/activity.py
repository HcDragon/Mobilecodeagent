import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship

from backend.app.core.database import Base


class Activity(Base):
    __tablename__ = "activities"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    project_id = Column(String, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    owner_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    activity_type = Column(String, default="workspace")  # git, workspace, agent, build
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)

    owner = relationship("User", back_populates="activities")
    project = relationship("Project", back_populates="activities")
