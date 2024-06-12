from src.hTrackerIU.infrastructure.orm.models import HabitModel


def test_delete_habit(test_client, db_session, test_habits):
    habit_to_delete = test_habits[0]
    response = test_client.delete(f"/api/habits/{habit_to_delete.id}")
    assert response.status_code == 200
    assert response.json() == {"status": "deleted"}
    db_session.expire_all()
    deleted_habit = db_session.get(HabitModel, habit_to_delete.id)
    assert deleted_habit is None

def test_delete_non_existent_habit(test_client):
    non_existent_habit_id = 99999
    response = test_client.delete(f"/api/habits/{non_existent_habit_id}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Habit not found"
