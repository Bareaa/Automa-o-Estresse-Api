import DataGenerator from "../utils/data_gen";
import userRegistrationSelectors from "../selectores/userRegistrationSelectors";

describe('Todos os campos devem ser obrigatórios', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const preencheComDadosValidos= (user) => {
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
    };

    const clearAndCheckError = (selector, errorSelector) => {
        cy.get(selector).clear().blur();
        cy.get(errorSelector).should('be.visible');
    };

    it('Campo nome e sobrenome devem ser preenchidos', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        clearAndCheckError(userRegistrationSelectors.firstName, '#firstNameError');
        clearAndCheckError(userRegistrationSelectors.lastName, '#lastNameError');
    });

    it('Campo CPF deve ser preenchido', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        clearAndCheckError(userRegistrationSelectors.cpf, '#cpfError');
    });

    it('Campo telefone deve ser preenchido', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        clearAndCheckError(userRegistrationSelectors.phone, '#phoneError');
    });

    it('Campo email deve ser preenchido', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        clearAndCheckError(userRegistrationSelectors.email, '#emailError');
    });

    it('Campo confirmação de email deve ser preenchido', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        clearAndCheckError(userRegistrationSelectors.confirmEmail, '#confirmEmailError');
    });

    it('Campo senha deve ser preenchido', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        clearAndCheckError(userRegistrationSelectors.password, '#passwordError');
    });

    it('Campo confirmação de senha deve ser preenchido', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        clearAndCheckError(userRegistrationSelectors.confirmPassword, '#confirmPasswordError');
    });

    it('Campo data de nascimento deve ser preenchido', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        clearAndCheckError(userRegistrationSelectors.birthDate, '#birthDateError');
    });

    it('Campo gênero deve ser preenchido', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        cy.get(userRegistrationSelectors.gender).select([0]).blur();
        cy.get(userRegistrationSelectors.gender)
            .then(($select) => {
                $select[0].setCustomValidity('Selecione um item na lista');
                return $select;
            })
            .invoke('prop', 'validationMessage')
            .should('contain', 'Selecione um item na lista');
    });

    it('Campo endereço deve ser preenchido', () => {
        const user = DataGenerator.generateUserData();
        preencheComDadosValidos(user);
        cy.get(userRegistrationSelectors.address).clear();
        cy.get(userRegistrationSelectors.submitButton).click();
    
        // Verifica a mensagem de validação nativa do navegador
        cy.get(userRegistrationSelectors.address)
            .invoke('prop', 'validationMessage')
            .should('equal', 'Preencha este campo.');
    });
});