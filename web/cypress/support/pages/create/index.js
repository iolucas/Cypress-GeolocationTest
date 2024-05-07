class CreatePage {
    visitPage() {
        cy.goTo('http://localhost:3000/orphanages/create')
        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')
    }
    form(orphanage) { 
        cy.get('input[name=name]').type(orphanage.name)
        cy.get('#description').type(orphanage.description)
        cy.get('input[type=file]')
            .selectFile('../web/cypress/fixtures/images/kids-playground-1.png', { force: true })
        cy.get('#opening_hours').type(orphanage.opening_hours)
        cy.contains('button', orphanage.open_on_weekends).click()
    }
    submit() {
        cy.get('.save-button').click()
    }
}

export default new CreatePage()