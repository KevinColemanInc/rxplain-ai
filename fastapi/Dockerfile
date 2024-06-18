FROM python:alpine
RUN apk update \
    && apk add build-base
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY . /app
CMD ["gunicorn", "-b", "0.0.0.0:8080", "--workers", "2", "app:app"]