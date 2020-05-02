from django.db import models

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    USERNAME_FIELD = "email"  # e.g: "username", "email"
    EMAIL_FIELD = "email"  # e.g: "email", "primary_email"
    REQUIRED_FIELDS = []

    email = models.EmailField(unique=True)


class Company(models.Model):
    name = models.CharField(max_length=100)
    is_enabled = models.BooleanField(default=True)
