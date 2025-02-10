# Teste Técnico [QA]
## Guia de Motéis

Olá! Antes de mais nada, gostaria de salientar que o site usado para automação com Cypress é de minha autoria, criado especialmente para validar os pontos pedidos na avaliação técnica.

**Site:** [form-automacao.netlify.app](https://form-automacao.netlify.app/)  
*Hospedado em um provedor gratuito.*

Organizei o projeto em três partes principais:

### 1. Automação com Cypress
- **Configuração**: Inclui comandos para instalar o Cypress e configurar o ambiente de automação.
- **Desafios**: Mencionei desafios enfrentados com pop-ups nativos do navegador. No início, o pop-up de sucesso não era exibido no Cypress, então fiz algumas alterações no código para resolver isso.
- **Relatórios**: A pasta `reports` contém relatórios em HTML dos testes executados, conforme solicitado.
- **Mais detalhes**: [Leia mais](cy-automacao\README.MD)

### 2. Pasta do Postman
- **Conteúdo**: Contém arquivos para testes de API, prontos para importação no Postman.
- **Workspace Público**: Meu workspace estava público e trouxe algumas visualizações. Espero que tenha sido mera coincidência e que eu não tenha sido plagiado. No momento do envio dos testes, tornarei ele público novamente para facilitar a visualização.
- **URL**: [Postman Workspace](https://www.postman.com/altimetry-saganist-9696231/guia-de-motis-teste-tcnico/overview?ctx=settings)

### 3. Testes de Performance
- **Ferramentas**: Usei K6 e JMeter para realizar testes de performance.
- **Foco no K6**: Por mais que nunca o tenha usado, achei o K6 mais simples que o JMeter. Criei vários cenários de teste no K6, enquanto no JMeter criei apenas um.
- **Relatórios**: Relatórios estão bem identificados em suas pastas, todos dentro do diretório "relatorios".
- **Mais detalhes**: [Leia mais](./teste%20de%20performance/k6/K6-README.MD)

Com isso, espero que tenham gostado da minha forma de desenvolver testes, validar APIs e realizar testes de performance. Espero que possamos trabalhar em equipe :)