import os

from celery import Celery
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")

app = Celery("rafiq")
app.config_from_object("django.conf:settings", namespace="CELERY")


app.conf.beat_schedule = {
  "check-daily-free-member-renew-subscription": {
        "task": "rafiq.subscriptions.tasks.renewMonthlyFreeSubscriptions",
        "schedule": crontab(hour=0, minute=30),
    },  
}
app.autodiscover_tasks()
