import pytest

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.hTrackerIU.api.dependencies import get_db
from src.hTrackerIU.api.main import app
from src.hTrackerIU.domain.model.periodicity import Periodicity
from src.hTrackerIU.infrastructure.orm.models import Base, HabitModel

TEST_DATABASE_URL = "sqlite:///:memory:"
test_engine = create_engine(TEST_DATABASE_URL, connect_args={
                            "check_same_thread": False})
TestSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="session")
def create_test_database():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture(scope="function")
def db_session(create_test_database):
    with test_engine.connect() as connection:
        with connection.begin() as transaction:
            session = TestSessionLocal(bind=connection)
            yield session
            transaction.rollback()


@pytest.fixture(scope="function")
def override_get_db(db_session):
    def _override_get_db():
        try:
            yield db_session
        finally:
            db_session.close()
    app.dependency_overrides[get_db] = _override_get_db
    yield
    app.dependency_overrides.pop(get_db)


@pytest.fixture(scope="function")
def test_client(override_get_db):
    with TestClient(app) as client:
        yield client


@pytest.fixture(scope="function")
def test_habits(db_session):
    habits = [
        HabitModel(
            description="Read a book",
            periodicity=Periodicity.DAILY),
        HabitModel(
            description="Work out",
            periodicity=Periodicity.WEEKLY)]
    db_session.add_all(habits)
    db_session.commit()
    for habit in habits:
        db_session.refresh(habit)
    return habits
