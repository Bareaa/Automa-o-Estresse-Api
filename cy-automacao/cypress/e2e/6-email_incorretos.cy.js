describe('Validando os requisitos de e-mail', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const preencherFormulario = (user, senha, email) => {
        cy.get('#firstName').type(user.primeiro_nome);
        cy.get('#lastName').type(user.ultimo_nome);
        cy.get('#cpf').type(user.cpf);
        cy.get('#phone').type(user.telefone);
        cy.get('#email').type(email);
        cy.get('#confirmEmail').type(email);
        cy.get('#password').type(senha);
        cy.get('#confirmPassword').type(senha);
        cy.get('#birthDate').type("2000-01-01");
        cy.get('#gender').select([4]);
        cy.get('#address').type("Rua dos Bobos, 0, São Paulo, SP, 00000-000");
        cy.get('[for="star5"]').click();
        cy.get('#cypress').check();
    };

    it('Dado que eu tenha preenchido todos os campos e um e-mail incorreto, então não deve ser possível realizar o cadastro', () => {
        const user = {
            primeiro_nome: "Robson",
            ultimo_nome: "de Tal",
            cpf: "270.883.750-87",
            telefone: "11999999999"
        };
        preencherFormulario(user, "SenhaForte123!", "emailinvalido"); // Exemplo de e-mail inválido
        cy.get('#submitButton').click();
        cy.get('#emailError').should('be.visible');
    });
});