# Generated by Django 3.2.16 on 2023-04-14 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriptionfeatures',
            name='add_files_or_link',
            field=models.BooleanField(default=True),
        ),
    ]
