# Generated by Django 3.2.16 on 2023-04-26 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatbots', '0015_alter_documents_document'),
    ]

    operations = [
        migrations.AddField(
            model_name='savedchatbots',
            name='name',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
