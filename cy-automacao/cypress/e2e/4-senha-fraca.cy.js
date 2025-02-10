describe('Validando os requisitos de senha', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const preencherFormulario = (user, senha) => {
        cy.get('#firstName').type(user.primeiro_nome);
        cy.get('#lastName').type(user.ultimo_nome);
        cy.get('#cpf').type(user.cpf);
        cy.get('#phone').type(user.telefone);
        cy.get('#email').type(user.email);
        cy.get('#confirmEmail').type(user.email);
        cy.get('#password').type(senha);
        cy.get('#confirmPassword').type(senha);
        cy.get('#birthDate').type("2000-01-01");
        cy.get('#gender').select([4]);
        cy.get('#address').type("Rua dos Bobos, 0, São Paulo, SP, 00000-000");
        cy.get('[for="star5"]').click();
        cy.get('#cypress').check();
    };

    it('Dado que eu tenha preenchido todos os campos e posto uma senha fraca, então não deve ser possível realizar o cadastro', () => {
        const user = {
            primeiro_nome: "Robson",
            ultimo_nome: "de Tal",
            cpf: "270.883.750-87",
            telefone: "11999999999",
            email: "robson@gmail.com"
        };
        preencherFormulario(user, "senhafraca");
        cy.get('#submitButton').click();
        cy.get('#passwordError').should('be.visible');
    });

    it('senha deve conter ao menos 8 caracteres', () => {
        const user = {
            primeiro_nome: "Robson",
            ultimo_nome: "de Tal",
            cpf: "270.883.750-87",
            telefone: "11999999999",
            email: "email@EMAIL.COM"
        };
        preencherFormulario(user, "senhaf@");
        cy.get('#submitButton').click();
        cy.get('#passwordError').should('be.visible');
        cy.get('#lengthReq').should('be.visible');
    });
});