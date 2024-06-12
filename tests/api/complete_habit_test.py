from src.hTrackerIU.infrastructure.orm.models import HabitModel


def test_complete_habit(test_client, test_habits, db_session):
    habit_id = test_habits[0].id
    response = test_client.put(f"/api/habits/{habit_id}/complete")

    assert response.status_code == 200
    assert response.json() == {"status": "completed"}

    completed_habit = db_session.get(HabitModel, habit_id)
    assert completed_habit is not None
    assert completed_habit.completion_logs is not None


def test_complete_non_existent_habit(test_client):
    non_existent_habit_id = 99999
    response = test_client.put(f"/api/habits/{non_existent_habit_id}/complete")

    assert response.status_code == 404
    assert response.json()["detail"] == "Habit not found"
