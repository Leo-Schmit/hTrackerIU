from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from src.hTrackerIU.domain.model.periodicity import Periodicity
from src.hTrackerIU.infrastructure.orm.models import HabitModel


def test_get_habit_details(test_client: TestClient, db_session: Session):
    test_habit = HabitModel(
        description="Read a book",
        periodicity=Periodicity.DAILY)
    db_session.add(test_habit)
    db_session.commit()
    db_session.refresh(test_habit)

    response = test_client.get(f"/api/habits/{test_habit.id}")

    assert response.status_code == 200
    response_data = response.json()
    habit_data = response_data['habit']

    assert habit_data['id'] == test_habit.id
    assert habit_data['description'] == test_habit.description
    assert habit_data['periodicity'] == test_habit.periodicity.value

    assert 'current_streak' in response_data
    assert 'longest_streak' in response_data


def test_get_non_existent_habit(test_client):
    non_existent_habit_id = 99999
    response = test_client.get(f"/api/habits/{non_existent_habit_id}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Habit not found"
