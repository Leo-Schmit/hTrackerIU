FROM python:3.12-alpine as base

ENV PYTHONPYCACHEPREFIX ./.pycache
ENV PYTHONPATH "${PYTHONPATH}:/app/src"

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM base as tester

COPY requirements-test.txt .
RUN pip install --no-cache-dir -r requirements-test.txt

CMD ["pytest", "--color=yes", "-v"]

FROM base as production

CMD ["python3", "run.py"]
