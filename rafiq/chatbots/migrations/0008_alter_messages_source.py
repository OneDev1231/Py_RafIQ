# Generated by Django 3.2.16 on 2023-04-20 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatbots', '0007_auto_20230420_2303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messages',
            name='source',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
