describe('Validando os requisitos de data de nascimento', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const preencherFormulario = (user, senha, dataNascimento) => {
        cy.get('#firstName').type(user.primeiro_nome);
        cy.get('#lastName').type(user.ultimo_nome);
        cy.get('#cpf').type(user.cpf);
        cy.get('#phone').type(user.telefone);
        cy.get('#email').type(user.email);
        cy.get('#confirmEmail').type(user.email);
        cy.get('#password').type(senha);
        cy.get('#confirmPassword').type(senha);
        cy.get('#birthDate').type(dataNascimento);
        cy.get('#gender').select([4]);
        cy.get('#address').type("Rua dos Bobos, 0, São Paulo, SP, 00000-000");
        cy.get('[for="star5"]').click();
        cy.get('#cypress').check();
    };

    it('Dado que eu tenha preenchido todos os campos e uma data de nascimento inválida, então não deve ser possível realizar o cadastro', () => {
        const user = {
            primeiro_nome: "Robson",
            ultimo_nome: "de Tal",
            cpf: "270.883.750-87",
            telefone: "11999999999",
            email: "robson@gmail.com"
        };
        preencherFormulario(user, "SenhaForte123!", "2023-01-01"); // Exemplo de data futura
        cy.get('#submitButton').click();
        cy.get('#birthDateError').should('be.visible');
    });
});