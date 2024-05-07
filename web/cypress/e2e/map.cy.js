import data from '../fixtures/orphanages.json'

describe('map', () => {
  it('Should choose a orphanage on the map', () => {
    const orphanage = data.map
    cy.deleteMany({name: orphanage.name }, { collection: 'orphanages' })
    cy.postOrphanage(orphanage)
    cy.goTo('http://localhost:3000/map')
    cy.get('.leaflet-marker-icon').as('mapList')
    cy.get('@mapList').each((ele, index, list) => {
        cy.get('@mapList').eq(index).click()
        cy.wait(1000)
        cy.get('.leaflet-popup-content').as('divName')
        //now we use 'invoke' to get the property of an element we want
        cy.get('@divName').invoke('text').then((txt) => {
            cy.log(txt)
            if(txt === orphanage.name){
                cy.get('@mapList').eq(index).as('foundItem')
            }
        })
    })
    cy.get('@foundItem').click()
    cy.contains('.leaflet-popup-content', orphanage.name).find('a').click()
    cy.contains('h1', orphanage.name).should('be.visible')
  })
})
