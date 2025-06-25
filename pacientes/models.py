from django.db import models
from django.contrib.auth.models import User

class Paciente(models.Model):
    nome = models.CharField(max_length=100)
    cep = models.CharField(max_length=8)
    endereco = models.CharField(max_length=200)
    criado_por = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome
