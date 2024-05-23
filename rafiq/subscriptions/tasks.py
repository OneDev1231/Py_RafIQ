from config.celery_app import app
from ..users.models import UserProfile
from datetime import date
from .helpers import renewSubscription

@app.task(bind=True)
def renewMonthlyFreeSubscriptions(self):
    today = date.today()
    profiles = UserProfile.objects.filter(subscription_plan__title="FREE",subscription_renew_date__date=today)
    for profile in profiles:
        renewSubscription(profile.user,profile.subscription_plan)