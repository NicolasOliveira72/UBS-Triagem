from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Paciente
import requests
from django.http import JsonResponse

@login_required
def index(request):
    if request.method == "POST":
        nome = request.POST['nome']
        cep = request.POST['cep']
        endereco = request.POST['endereco']
        Paciente.objects.create(nome=nome, cep=cep, endereco=endereco, criado_por=request.user)
        return redirect('index')
    return render(request, 'index.html')

def buscar_cep(request, cep):
    url = f'https://viacep.com.br/ws/{cep}/json/'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if 'erro' in data:
            return JsonResponse({'error': 'CEP não encontrado'}, status=404)
        return JsonResponse(data)
    return JsonResponse({'error': 'Erro na consulta'}, status=500)
