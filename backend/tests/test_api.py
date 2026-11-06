import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.app.api.deps import get_db
from backend.app.core.database import Base
from backend.app.main import app

# Test database
TEST_DATABASE_URL = "sqlite:///./test_codenomad.db"
test_engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True, scope="function")
def setup_test_db():
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


def test_auth_and_user_flow():
    # 1. Register User 1
    reg_resp = client.post(
        "/api/v1/auth/register",
        json={
            "email": "dev1@codenomad.io",
            "password": "Password123!",
            "full_name": "Dev One",
        },
    )
    assert reg_resp.status_code == 201
    user1_data = reg_resp.json()
    assert user1_data["email"] == "dev1@codenomad.io"

    # 2. Duplicate registration fails
    dup_resp = client.post(
        "/api/v1/auth/register",
        json={
            "email": "dev1@codenomad.io",
            "password": "Password123!",
        },
    )
    assert dup_resp.status_code == 400

    # 3. Login for JWT Token
    token_resp = client.post(
        "/api/v1/auth/token",
        data={"username": "dev1@codenomad.io", "password": "Password123!"},
    )
    assert token_resp.status_code == 200
    token1 = token_resp.json()["access_token"]
    assert token1 is not None

    # 4. Get Current User Profile
    me_resp = client.get(
        "/api/v1/users/me",
        headers={"Authorization": f"Bearer {token1}"},
    )
    assert me_resp.status_code == 200
    assert me_resp.json()["email"] == "dev1@codenomad.io"


def test_project_crud_and_workspace_actions():
    # Register and Login User 1
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "dev1@codenomad.io",
            "password": "Password123!",
            "full_name": "Dev One",
        },
    )
    token_resp = client.post(
        "/api/v1/auth/token",
        data={"username": "dev1@codenomad.io", "password": "Password123!"},
    )
    token1 = token_resp.json()["access_token"]
    headers1 = {"Authorization": f"Bearer {token1}"}

    # Create project
    create_resp = client.post(
        "/api/v1/projects/",
        headers=headers1,
        json={
            "name": "portfolio-web",
            "description": "Portfolio test project",
            "repository_full_name": "dev1/portfolio-web",
            "primary_language": "TypeScript",
            "technologies": ["React", "Vite", "Tailwind"],
            "branch": "main",
            "server_port": 5173,
        },
    )
    assert create_resp.status_code == 201
    project_data = create_resp.json()
    proj_id = project_data["id"]
    assert project_data["name"] == "portfolio-web"
    assert project_data["server_port"] == 5173

    # Trigger workspace action: start
    ws_start = client.post(
        f"/api/v1/workspaces/{proj_id}/action",
        headers=headers1,
        json={"action": "start"},
    )
    assert ws_start.status_code == 200
    assert ws_start.json()["status"] == "running"

    # Trigger workspace action: stop
    ws_stop = client.post(
        f"/api/v1/workspaces/{proj_id}/action",
        headers=headers1,
        json={"action": "stop"},
    )
    assert ws_stop.status_code == 200
    assert ws_stop.json()["status"] == "stopped"

    # Read activities
    act_resp = client.get(
        f"/api/v1/activity/?project_id={proj_id}",
        headers=headers1,
    )
    assert act_resp.status_code == 200
    activities = act_resp.json()
    assert len(activities) >= 3  # created, started, stopped


def test_user_isolation_authorization():
    # Register User 2
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "dev2@codenomad.io",
            "password": "Password123!",
            "full_name": "Dev Two",
        },
    )
    token2_resp = client.post(
        "/api/v1/auth/token",
        data={"username": "dev2@codenomad.io", "password": "Password123!"},
    )
    token2 = token2_resp.json()["access_token"]
    headers2 = {"Authorization": f"Bearer {token2}"}

    # User 2 list projects should NOT see User 1's projects
    list2 = client.get("/api/v1/projects/", headers=headers2)
    assert list2.status_code == 200
    assert len(list2.json()) == 0

    # User 1 creates a project
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "dev1@codenomad.io",
            "password": "Password123!",
            "full_name": "Dev One",
        },
    )
    token1_resp = client.post(
        "/api/v1/auth/token",
        data={"username": "dev1@codenomad.io", "password": "Password123!"},
    )
    token1 = token1_resp.json()["access_token"]
    headers1 = {"Authorization": f"Bearer {token1}"}

    create1 = client.post(
        "/api/v1/projects/",
        headers=headers1,
        json={"name": "private-repo", "branch": "main"},
    )
    user1_proj_id = create1.json()["id"]

    # User 2 tries to GET User 1's project -> MUST return 404
    forbidden_get = client.get(
        f"/api/v1/projects/{user1_proj_id}",
        headers=headers2,
    )
    assert forbidden_get.status_code == 404

    # User 2 tries to trigger action on User 1's workspace -> MUST return 404
    forbidden_action = client.post(
        f"/api/v1/workspaces/{user1_proj_id}/action",
        headers=headers2,
        json={"action": "start"},
    )
    assert forbidden_action.status_code == 404
