Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('input[id="firstName"]').type('Sabrynna')
    cy.get('input[id="lastName"]').type('Lourenço')
    cy.get('input[type="email"]').type('limasabrynna@gmail.com')
    cy.get('textarea[id="open-text-area"]').type('Cadastro de usuário exatamente digitado rápido')
    cy.contains('button', 'Enviar').click()
})