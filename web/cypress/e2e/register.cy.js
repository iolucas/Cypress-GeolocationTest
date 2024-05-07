import data from '../fixtures/orphanages.json'
import createPage from '../support/pages/create'

describe('Orphanage registration spec', () => {
    it('Should fill the form to register a new orphanage', () => {
        const orphanage = data.create

        cy.deleteMany({name: orphanage.name}, {collection: 'orphanages'})

        createPage.visitPage()

        cy.setMapPosition(orphanage.position)

        createPage.form(orphanage)

        createPage.submit()

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Orfanato cadastrado com sucesso.')
    })

    it('Should not register duplicated orphanages', () => {
        const orphanage = data.duplicated

        cy.deleteMany({name: orphanage.name}, {collection: 'orphanages'})

        // Register the first orphanage
        
        cy.postOrphanage(orphanage)

        // Register the second orphanage with the same name

        cy.goTo('http://localhost:3000/orphanages/create')

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')

        cy.setMapPosition(orphanage.position)  

        cy.get('input[name=name]').type(orphanage.name)

        cy.get('#description').type(orphanage.description)

        cy.get('input[type=file]')
            .selectFile('../web/cypress/fixtures/images/kids-playground-1.png', { force: true })

        cy.get('#opening_hours').type(orphanage.opening_hours)

        cy.contains('button', orphanage.open_on_weekends).click()

        cy.get('.save-button').click()

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', `Já existe um cadastro com o nome: ${orphanage.name}`) 
    })
})




Cypress.Commands.add('goTo', (url, latitude = -28.679634, longitude = -49.370124) => {
    const mockGeolocation = (win, latitude, longitude) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition', cb => {
            return cb({ coords: { latitude, longitude } })
        })
    }
    cy.visit(url, {
        onBeforeLoad(win) {
            mockGeolocation(win, latitude, longitude)
        }
    })
})

Cypress.Commands.add('setMapPosition', (position) => {
    window.localStorage.setItem('hope-qa:latitude', position.latitude)
    window.localStorage.setItem('hope-qa:longitude', position.longitude)
})

Cypress.Commands.add('postOrphanage', (orphanage) => {
    const formData = new FormData()
    formData.append('name', orphanage.name)
    formData.append('description', orphanage.description)
    formData.append('latitude', orphanage.position.latitude)
    formData.append('longitude', orphanage.position.longitude)
    formData.append('opening_hours', orphanage.opening_hours)
    formData.append('open_on_weekends', true)

    cy.request({
        url: 'http://localhost:3333/orphanages',
        method: 'POST',
        headers: {
            'content-type': 'multipart/form-data'
        },
        body: formData
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})
