from datetime import datetime, timedelta, timezone

from src.hTrackerIU.domain.model.periodicity import Periodicity
from src.hTrackerIU.infrastructure.orm.models import (CompletionLogModel,
                                                      HabitModel)


def create_completion_logs_for_struggled_habit(
        start_date, end_date, periodicity):
    logs = []
    current_date = start_date
    while current_date <= end_date:
        if current_date.weekday() not in [
                2, 5]:
            logs.append(current_date)
        current_date += timedelta(days=1)
    return logs


def test_get_struggled_habits_last_month(test_client, db_session):
    habit_start_date = datetime.now(timezone.utc) - timedelta(days=40)
    habit1 = HabitModel(
        description="Read",
        periodicity=Periodicity.DAILY,
        creation_date=habit_start_date)
    habit2 = HabitModel(
        description="Meditate",
        periodicity=Periodicity.DAILY,
        creation_date=habit_start_date)

    db_session.add_all([habit1, habit2])
    db_session.commit()

    end_date_last_month = datetime.now(
        timezone.utc) - timedelta(days=datetime.now(timezone.utc).day)
    habit1_completion_logs = create_completion_logs_for_struggled_habit(
        habit_start_date, end_date_last_month, Periodicity.DAILY)

    for log_date in habit1_completion_logs:
        completion_log = CompletionLogModel(habit_id=habit1.id, date=log_date)
        db_session.add(completion_log)

    db_session.commit()

    response = test_client.get("/api/habits/analytics/struggled-last-month")

    assert response.status_code == 200
    data = response.json()

    struggled_habit_ids = [habit['habit']['id'] for habit in data]
    assert habit1.id in struggled_habit_ids
