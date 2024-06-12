from src.hTrackerIU.domain.model.periodicity import Periodicity


def test_list_habits_no_periodicity(test_client, test_habits):
    response = test_client.get("/api/habits/")
    assert response.status_code == 200
    data = response.json()

    for test_habit in test_habits:
        assert any(
            habit_data['habit']['description'] == test_habit.description and
            habit_data['habit']['periodicity'] == test_habit.periodicity.value
            for habit_data in data
        )


def test_list_habits_with_periodicity(test_client, test_habits):
    response = test_client.get("/api/habits/", params={"periodicity": "DAILY"})
    assert response.status_code == 200
    data = response.json()
    daily_habits = [
        habit for habit in test_habits
        if habit.periodicity == Periodicity.DAILY
    ]
    assert len(data) == len(daily_habits)
    for test_habit in daily_habits:
        assert any(
            habit['description'] == test_habit.description and
            habit['periodicity'] == test_habit.periodicity.value for habit in data)
