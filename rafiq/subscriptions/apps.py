from django.apps import AppConfig


class SubscriptionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'rafiq.subscriptions'
    
    def ready(self):
        try:
            import rafiq.subscriptions.signals  # noqa F401
        except ImportError:
            pass
