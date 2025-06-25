// Pega o elemento do campo de entrada do CEP
const cepInput = document.getElementById('cep');

// Pega o campo onde o endereço será exibido automaticamente
const enderecoInput = document.getElementById('endereco');

// Adiciona um evento para ser executado toda vez que o usuário digitar algo no campo de CEP
cepInput.addEventListener('input', () => {

    // Remove todos os caracteres que não são números (como traços, espaços, etc.)
    const cep = cepInput.value.replace(/\D/g, '');

    // Verifica se o CEP tem 8 dígitos (formato válido)
    if (cep.length === 8) {
        // Faz uma requisição para a rota Flask passando o CEP
        fetch(`/cep/${cep}`)
        .then(response => {
            // Se a resposta não for OK (por exemplo, 404), lança um erro
            if (!response.ok) throw new Error('CEP inválido');
            // Caso contrário, converte a resposta para JSON
            return response.json();
        })
        .then(data => {
            // Preenche o campo de endereço com os dados retornados da API ViaCEP
            enderecoInput.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        })
        .catch(() => {
            // Em caso de erro (CEP não encontrado), mostra essa mensagem no campo de endereço
            enderecoInput.value = 'CEP não encontrado';
        });
    } else {
        // Se o CEP tiver menos de 8 dígitos, limpa o campo de endereço
        enderecoInput.value = '';
    }
});

// Captura o evento de envio do formulário
document.getElementById('triagem-form').addEventListener('submit', (e) => {
    // Impede o envio padrão do formulário (evita recarregar a página)
    e.preventDefault();

    // Mostra um alerta com os dados preenchidos como simulação de envio
    alert('Dados enviados:\nNome: ' + document.getElementById('nome').value +
          '\nCEP: ' + cepInput.value +
          '\nEndereço: ' + enderecoInput.value);
});
