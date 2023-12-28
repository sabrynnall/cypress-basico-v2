// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// it('visits local file', () => {
//     cy.visit('https://google.com')
//   })

/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[id="firstName"]').should('be.visible').type('Sabrynna').should('have.value', 'Sabrynna')
        cy.get('input[id="lastName"]').should('be.visible').type('Lourenço').should('have.value', 'Lourenço')
        cy.get('input[type="email"]').should('be.visible').type('limasabrynna@gmail.com').should('have.value', 'limasabrynna@gmail.com')
        cy.get('textarea[id="open-text-area"]').should('be.visible').type('Cadastro de usuário exatamente digitado rápido', { delay: 0 }).should('have.value', 'Cadastro de usuário exatamente digitado rápido')
        cy.contains('button', 'Enviar').should('be.visible').click()

        cy.get('span[class="success"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[type="email"]').should('be.visible').type('limasabrynnagmail.com')
        cy.contains('button', 'Enviar').should('be.visible').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone').type('abcdefghij').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('input[id="firstName"]').type('Sabrynna')
        cy.get('input[id="lastName"]').type('Lourenço')
        cy.get('input[type="email"]').type('limasabrynna@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('textarea[id="open-text-area"]').type('Cadastro de usuário exatamente digitado rápido')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Sabrynna').should('have.value', 'Sabrynna').clear().should('have.value', '')
        cy.get('#lastName').type('Lourenço').should('have.value', 'Lourenço').clear().should('have.value', '')
        cy.get('#email').type('limasabrynna@gmail.com').should('have.value', 'limasabrynna@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('83988895874').should('have.value', '83988895874').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('span[class="success"]').should('be.visible')
    })
})

