from datetime import datetime, timedelta, timezone

from src.hTrackerIU.domain.model.periodicity import Periodicity
from src.hTrackerIU.infrastructure.orm.models import (CompletionLogModel,
                                                      HabitModel)


def create_completion_logs(start_date, days, buffer_hours=5):
    return [
        start_date +
        timedelta(
            days=i,
            hours=buffer_hours) for i in range(days)]


def test_get_longest_streak(test_client, db_session):
    habit1 = HabitModel(
        description="Read a book",
        periodicity=Periodicity.DAILY,
        creation_date=datetime.now(timezone.utc) -
        timedelta(
            days=5))
    habit2 = HabitModel(
        description="Work out",
        periodicity=Periodicity.DAILY,
        creation_date=datetime.now(timezone.utc) -
        timedelta(
            days=3))
    db_session.add_all([habit1, habit2])
    db_session.commit()

    habit1_completion_logs = create_completion_logs(
        datetime.now(timezone.utc) - timedelta(days=5), 5)
    habit2_completion_logs = create_completion_logs(
        datetime.now(timezone.utc) - timedelta(days=3), 3)

    for log_date in habit1_completion_logs:
        completion_log = CompletionLogModel(habit_id=habit1.id, date=log_date)
        db_session.add(completion_log)

    for log_date in habit2_completion_logs:
        completion_log = CompletionLogModel(habit_id=habit2.id, date=log_date)
        db_session.add(completion_log)

    db_session.commit()

    response = test_client.get("/api/habits/analytics/longest-streak")

    assert response.status_code == 200
    data = response.json()
    assert data['streak'] == 5
