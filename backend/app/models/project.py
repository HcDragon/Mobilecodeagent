import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship

from backend.app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    owner_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True)
    repository_full_name = Column(String, nullable=True)
    primary_language = Column(String, nullable=True)
    technologies = Column(JSON, default=list)  # list of strings
    branch = Column(String, default="main", nullable=False)
    workspace_status = Column(String, default="stopped", nullable=False)
    server_port = Column(Integer, nullable=True)
    preview_url = Column(String, nullable=True)
    last_activity_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    owner = relationship("User", back_populates="projects")
    workspaces = relationship("Workspace", back_populates="project", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="project", cascade="all, delete-orphan")
