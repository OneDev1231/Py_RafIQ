# Generated by Django 3.2.16 on 2023-04-24 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatbots', '0008_alter_messages_source'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatbots',
            name='chat_bubble_color',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='chatbots',
            name='initial_message',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='chatbots',
            name='user_message_color',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='chatbots',
            name='visibility',
            field=models.CharField(choices=[('PUBLIC', 'PUBLIC'), ('PRIVATE', 'PRIVATE')], default='PRIVATE', max_length=100),
        ),
    ]
