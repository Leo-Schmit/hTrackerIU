from src.hTrackerIU.infrastructure.orm.models import HabitModel


def test_create_habit(test_client, db_session):
    payload = {
        "description": "Read a book",
        "periodicity": "DAILY"
    }
    response = test_client.post("/api/habits/", json=payload)

    assert response.status_code == 201
    data = response.json()
    assert "description" in data
    assert "periodicity" in data
    assert data["description"] == payload["description"]
    assert data["periodicity"] == payload["periodicity"]

    created_habit = db_session.query(HabitModel).filter_by(
        description=payload['description']).first()

    assert created_habit is not None
    assert created_habit.description == payload['description']
    assert created_habit.periodicity.value == payload['periodicity']

def test_create_habit_with_invalid_data(test_client):
    payload = {"description": "description", "periodicity": "INVALID_PERIODICITY"}
    response = test_client.post("/api/habits/", json=payload)

    assert response.status_code == 422