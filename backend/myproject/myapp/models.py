from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.is_staff = True
        user.is_active = True


class CustomUser(AbstractUser):
    USERNAME_FIELD = "email"  # e.g: "username", "email"
    EMAIL_FIELD = "email"  # e.g: "email", "primary_email"
    REQUIRED_FIELDS = []
    objects = UserManager()
    email = models.EmailField(unique=True)
    username = models.CharField(unique=False, blank=True, max_length=10)


class Company(models.Model):
    name = models.CharField(max_length=100)
    is_enabled = models.BooleanField(default=True)
