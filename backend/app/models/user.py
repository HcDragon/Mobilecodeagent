import uuid
from datetime import datetime, timezone
from sqlalchemy import Boolean, Column, DateTime, String
from sqlalchemy.orm import relationship

from backend.app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    projects = relationship("Project", back_populates="owner", cascade="all, delete-orphan")
    workspaces = relationship("Workspace", back_populates="owner", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="owner", cascade="all, delete-orphan")
