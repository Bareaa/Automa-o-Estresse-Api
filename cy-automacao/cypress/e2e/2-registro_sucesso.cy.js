// 2-registro_sucesso.cy.js
import DataGenerator from "../utils/data_gen";
import userRegistrationSelectors from "../selectores/userRegistrationSelectors";

describe('Registro de usuário', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dado que eu tenha preenchido todos os campos corretamente, então devo ser avisado que o cadastro foi realizado', () => {
        const user = DataGenerator.generateUserData();

        cy.get(userRegistrationSelectors.firstName).type(user.primeiro_nome);
        cy.get(userRegistrationSelectors.lastName).type(user.ultimo_nome);
        cy.get(userRegistrationSelectors.cpf).type(user.cpf);
        cy.get(userRegistrationSelectors.phone).type(user.telefone);
        cy.get(userRegistrationSelectors.email).type(user.email);
        cy.get(userRegistrationSelectors.confirmEmail).type(user.email);
        cy.get(userRegistrationSelectors.password).type(user.senha);
        cy.get(userRegistrationSelectors.confirmPassword).type(user.senha);
        cy.get(userRegistrationSelectors.birthDate).type(user.data_nascimento);
        cy.get(userRegistrationSelectors.gender).select([4]);
        cy.get(userRegistrationSelectors.address).type(user.endereco_completo);
        cy.get(userRegistrationSelectors.rating).click();
        cy.get(userRegistrationSelectors.terms).check();

        cy.intercept('PUT', '**/v3/b/67a62d91acd3cb34a8da02bf').as('cadastro');
        cy.get(userRegistrationSelectors.submitButton).click();;


        cy.wait('@cadastro').then((interception) => {
            if (interception) {
                cy.log('Interceptação ok:', interception);
                expect(interception.response.statusCode).to.eq(200);
            } else {
                cy.log('A requisição não foi interceptada.');
            }
        });

        cy.get(userRegistrationSelectors.successMessage)
            .should('have.css', 'display', 'flex')
            .and('have.css', 'opacity', '1')
            .and('be.visible');
    });
});