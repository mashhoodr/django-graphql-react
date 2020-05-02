FROM python:3.8.2-alpine

RUN mkdir /app

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN apk add --no-cache --virtual .build-deps \
    ca-certificates gcc postgresql-dev linux-headers musl-dev \
    libffi-dev jpeg-dev zlib-dev gcc

RUN pip install -r /app/requirements.txt

EXPOSE 8000

CMD python manage.py runserver 0.0.0.0:8000