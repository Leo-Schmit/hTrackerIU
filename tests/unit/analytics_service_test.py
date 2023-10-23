from datetime import datetime
from typing import List

import pytest
from fixtures import HABITS

from src.hTrackerIU.application.service.analytics_service import \
    AnalyticsService
from src.hTrackerIU.domain.model.completion_log import CompletionLog
from src.hTrackerIU.domain.model.periodicity import Periodicity


class MockHabitRepository:
    def find_by_id(self, habit_id):
        return next((habit for habit in HABITS if habit.id == habit_id), None)


@pytest.fixture
def service():
    return AnalyticsService(MockHabitRepository())


def convert_streaks_to_datetime_format(consecutive_streaks):
    return {datetime.strptime(date, "%Y-%m-%d %H:%M:%S"):
            streak for date, streak in consecutive_streaks.items()}


def convert_logs_to_datetime_format(logs: List[str]) -> List[CompletionLog]:
    return [
        CompletionLog(
            datetime.strptime(
                log,
                "%Y-%m-%d %H:%M:%S")) for log in logs]


@pytest.mark.parametrize("habit", HABITS,
                         ids=[f"({habit['periodicity']}) " for habit in HABITS])
def test_habits(service, habit):
    periodicity = Periodicity[habit['periodicity'].upper()]
    current_streak = service.current_streak(
        convert_logs_to_datetime_format(habit['completion_logs']),
        periodicity,
        datetime.strptime(
            habit['creation_date'], "%Y-%m-%d %H:%M:%S"),
        datetime.strptime(habit['today'], "%Y-%m-%d %H:%M:%S")
    )
    assert current_streak == habit['current_streak']

    longest_streak = service.longest_streak(
        convert_logs_to_datetime_format(habit['completion_logs']),
        periodicity,
        datetime.strptime(
            habit['creation_date'], "%Y-%m-%d %H:%M:%S"),
        datetime.strptime(habit['today'], "%Y-%m-%d %H:%M:%S")
    )
    assert longest_streak == habit['longest_streak']

    broken_streaks_count = service.broken_streaks_count(
        convert_logs_to_datetime_format(habit['completion_logs']),
        periodicity,
        datetime.strptime(
            habit['creation_date'], "%Y-%m-%d %H:%M:%S"),
        datetime.strptime(habit['today'], "%Y-%m-%d %H:%M:%S")
    )
    assert broken_streaks_count == habit['broken_streaks_count']

    consecutive_streaks = service.consecutive_streaks(
        convert_logs_to_datetime_format(habit['completion_logs']),
        periodicity,
        datetime.strptime(
            habit['creation_date'], "%Y-%m-%d %H:%M:%S"),
        datetime.strptime(habit['today'], "%Y-%m-%d %H:%M:%S")
    )
    assert consecutive_streaks == convert_streaks_to_datetime_format(
        habit['consecutive_streaks'])
