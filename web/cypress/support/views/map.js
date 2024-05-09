Cypress.Commands.add('locateOrphanage', (name) => {
  const popup = '.leaflet-popup-content'
  cy.goTo('/map')
  cy.get('.leaflet-marker-icon').as('mapList')
  cy.get('@mapList').each((ele, index, list) => {
    cy.get('@mapList').eq(index).click()
    cy.wait(1000)
    cy.get(popup).as('divName')
    //now we use 'invoke' to get the property of an element we want
    cy.get('@divName').invoke('text').then((txt) => {
      cy.log(txt)
      if(txt === name){
        cy.get('@mapList').eq(index).as('foundItem')
        cy.log(`Orfanato ${name} encontrado!`)
      }
    })
  })
  cy.get('@foundItem').click()
  cy.contains(popup, name).find('a').click()
})