# Teste de Performance com k6

## Instalação do k6

Para instalar o k6, siga os passos abaixo:

```bash
# Instalar k6 usando Chocolatey
choco install k6

# Criar um arquivo `package.json`
npm init --yes

# Instalar os tipos do k6 como dependência de desenvolvimento
npm install --save-dev @types/k6
```

## API Utilizada
- Endpoint: https://jsonplaceholder.typicode.com/users

Estratégia de Teste
- Teste Gradual
- Simulamos 10 requisições do tipo GET para a API, aumentando gradualmente para validar a capacidade operacional.

- Nota: Iniciar com 100 requisições pode ser arriscado, especialmente em ambientes novos. Em uma experiência anterior com JMeter começamos com 100 requisições e a plataforma caiu devido a um erro de processamento. Um teste gradual teria identificado o gargalo mais eficientemente.

### Execução do Teste
- Para rodar o teste, use o seguinte comando:

- k6 run ./Test/arquivoTeste.js

### Geração de Relatório em HTML
- Para gerar um relatório em HTML do teste executado, use:

```javascript
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
        'relatorio.html': htmlReport(data),
    };
}
```

Tipos de Testes Realizados
Realizamos diversos tipos de testes para avaliar o desempenho da API:

Carga (Load Test)
Pico (Spike Test)
Fumaça (Smoke Test)
Os scripts estão organizados na pasta tests e os resultados na pasta reports.

Estrutura do Projeto

```markdown
project/
├── tests/
│   ├── load_test.js
│   ├── spike_test.js
│   ├── smoke_test.js
│   └── stress_test.js
├── reports/
│   ├── load_test_report.html
│   ├── spike_test_report.html
│   └── ...
└── README.md
```
```javascript
Resumo dos Relatórios
Relatório de Performance - K6
Total de Requisições: 1.780
Taxa de Erro: 0,00%
Tempo de Resposta: Média de 32,46ms (mediana de 30,58ms)
Throughput: 44,04 requisições/s
Dados: 10,68 MB recebidos, 0,19 MB enviados
Conclusão: Boa performance, sem erros e tempo de resposta baixo.
Relatório Básico - K6 Load Test
Total de Requisições: 2.900
Falhas: 0
Tempo de Resposta: Média de 39,24ms (p95 de 84,28ms)
Usuários Virtuais: 100
Throughput: 95,05 requisições/s
Dados: 18,02 MB recebidos, 0,30 MB enviados
Conclusão: Alta taxa de requisições com estabilidade e sem falhas.
Informações Básicas sobre o k6
Estrutura de um Teste k6
Função Padrão: Define a lógica do teste e deve ser exportada como a função padrão.
Importações: Módulos k6 ou bibliotecas JavaScript para estender a funcionalidade.
Opções: Configurações de execução, como número de usuários virtuais e duração do teste.
Operações de Ciclo de Vida: Código executado antes e/ou depois da execução do teste.
´´´