

describe('Visitando a página', () => {
    it('Dado que eu acesse a página correta, então devo verificar se consta a frase Cadastro de Usuário', () => {
        cy.visit('/');
        cy.get('h2').should('have.text', 'Cadastro de Usuário');
    });
});