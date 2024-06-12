from datetime import datetime, timedelta, timezone

from src.hTrackerIU.domain.model.periodicity import Periodicity
from src.hTrackerIU.infrastructure.orm.models import (CompletionLogModel,
                                                      HabitModel)


def create_completion_logs(start_date, days):
    return [start_date + timedelta(days=i) for i in range(days)]


def test_get_longest_streak(test_client, db_session):
    habit = HabitModel(
        description="Meditate",
        periodicity=Periodicity.DAILY,
        creation_date=datetime.now(timezone.utc) -
        timedelta(
            days=7))
    db_session.add(habit)
    db_session.commit()

    completion_dates = create_completion_logs(
        datetime.now(timezone.utc) - timedelta(days=7), 5)
    for completion_date in completion_dates:
        completion_log = CompletionLogModel(
            habit_id=habit.id, date=completion_date)
        db_session.add(completion_log)
    db_session.commit()

    response = test_client.get(f"/api/habits/{habit.id}/analytics/streak")

    assert response.status_code == 200
    data = response.json()
    assert data['streak'] == 5
