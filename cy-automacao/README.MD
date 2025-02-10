# Guia de Instalação e Configuração do Cypress

## Instalação do Cypress
Para instalar o Cypress, execute o seguinte comando no terminal:

```bash
npm install cypress


Iniciando e Configurando Testes E2E
Para iniciar o Cypress e configurar o ambiente de testes E2E, use o comando:

npx cypress open


1- Isso abrirá a interface gráfica do Cypress.
2- Selecione "E2E Testing" e clique em "Continue".
3- Escolha o navegador de sua preferência. No meu caso, utilizo o Edge.
4- Clique em "Start E2E Testing in {nome do navegador selecionado}".

Instalação de Bibliotecas Adicionais
Para gerar dados fictícios e validar CPF/CNPJ, instale as seguintes bibliotecas:
        npm install faker-br
        npm install cpf-cnpj-validator
Para gerar relatórios instele o seguinte
        npm install --save-dev cypress-mochawesome-reporter
- Você pode ver como configuei pelo cypress.config.js e como o importei em support/e2e.js


Desenvolvimento do Site de Formulários
Criei um site de formulários para auxiliar a comunidade de QA's no aprendizado de automação. Durante o desenvolvimento, enfrentei um desafio onde o pop-up de sucesso não era exibido no Cypress. Fiz algumas alterações no código para resolver isso.

Observação sobre Validação de Status da API
Caso precise validar o status da API, você pode usar a interceptação de requisições:

// Intercepta a requisição PUT e atribui um alias
cy.intercept('PUT', '**/b/67a62d91acd3cb34a8da02bf').as('cadastro');

// Clica no botão de submissão
cy.get('#submitButton').click();

// Aguarda a resposta da API e valida o status 200
cy.wait('@cadastro').its('response.statusCode').should('eq', 200);


Grato a quem visualizou até aqui :D