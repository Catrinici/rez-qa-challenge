import { times } from 'lodash'

//create a global variable with the desired properties to be liked
const listingAriaLabel = [
  'Save as favorite 069 Sawyer Two',
  'Save as favorite .Christian Test 11',
  'Save as favorite 087 Makos Make',
  'Save as favorite 097 Sea Oats and Waves',
]
//Write a helper function to get to the body element
const getIframeDocument = () => {
  return cy.get('iframe').its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
  // get the document
  return (
    getIframeDocument()
      // automatically retries until body is loaded
      .its('body')
      .should('not.be.undefined')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  )
}
export class VacationRentalsPage {
  //GETTERS
  get btnFavoriteProperties() {
    return cy
      .get(`[aria-label='Favorites Page toggle']`)
      .find('span.bt-favorites-link__count')
  }
  get listingResult() {
    return cy.get('div').contains('Results')
  }
  get likedListings() {
    return listingAriaLabel.length
  }
  get btnFilter() {
    return cy
      .get('div')
      .find('button')
      .contains('span', 'Filters')
      .click({ force: true })
  }
  //METHODS
  //check if the easy Favorite on/off button indicates that the property has been checked
  likeAListing() {
    for (let i = 0; i < listingAriaLabel.length; i++) {
      cy.get(`[aria-label='${listingAriaLabel[i]}']`)
        .click()
        .should('have.attr', 'aria-checked', 'true')
    }
  }
  //check if the easy Favorite on/off button indicates that the property has been unchecked
  unlikeListing() {
    for (let i = 2; i < listingAriaLabel.length; i++) {
      cy.get(`[aria-label='${listingAriaLabel[i]}']`).click()
    }
  }

  //check if the indicator show the total count of saved properties
  countOfSavedProperties() {
    this.btnFavoriteProperties.should(
      'have.text',
      `(${listingAriaLabel.length})`
    )
  }
  lowerThanZero() {
    getIframeBody()
      .get('.bt-modal-content')
      .within(() => {
        cy.get('.bt-filter-wrapper')
        cy.get('.bt-range-filter')
        cy.get('.bt-range-filter__input-wrapper')
      })
    let btnMinBedDecrease = cy.get(
      "[aria-label='0 Minimum Bedrooms, decrease']"
    )
    times(2, () => {
      btnMinBedDecrease.click()
    })
    cy.get('label[id$=-Bedrooms]').siblings().should('have.text', '0')
  }

  minBedIncreaseFilter() {
    getIframeBody()
      .get('.bt-modal-content')
      .within(() => {
        cy.get('.bt-filter-wrapper')
        cy.get('.bt-range-filter')
        cy.get('.bt-range-filter__input-wrapper')
      })
    let btnMinBedIncrease = cy.get(
      "[aria-label='0 Minimum Bedrooms, increase']"
    )
    times(6, () => {
      btnMinBedIncrease.click()
    })
    cy.get('label[id$=-Bedrooms]').siblings().should('have.text', '6')
  }
  minBedDecreaseFilter() {
    getIframeBody()
      .get('.bt-modal-content')
      .within(() => {
        cy.get('.bt-filter-wrapper')
        cy.get('.bt-range-filter')
        cy.get('.bt-range-filter__input-wrapper')
      })
    let btnMinBedDecrease = cy.get(
      "[aria-label='6 Minimum Bedrooms, decrease']"
    )
    times(2, () => {
      btnMinBedDecrease.click()
    })
    cy.get('label[id$=-Bedrooms]').siblings().should('have.text', '4')
  }
  minBathIncreaseFilter() {
    getIframeBody()
      .get('.bt-modal-content')
      .within(() => {
        cy.get('.bt-filter-wrapper')
        cy.get('.bt-range-filter')
        cy.get('.bt-range-filter__input-wrapper')
      })
    let btnMinBathIncrease = cy.get(
      "[aria-label='0 Minimum Bathrooms, increase']"
    )
    times(4, () => {
      btnMinBathIncrease.click()
    })
    cy.get('label[id$=-Bathrooms]').siblings().should('have.text', '4')
  }
  minBathDecreaseFilter() {
    getIframeBody()
      .get('.bt-modal-content')
      .within(() => {
        cy.get('.bt-filter-wrapper')
        cy.get('.bt-range-filter')
        cy.get('.bt-range-filter__input-wrapper')
      })
    let btnMinBathDecrease = cy.get(
      "[aria-label='4 Minimum Bathrooms, decrease']"
    )
    times(2, () => {
      btnMinBathDecrease.click()
    })
    cy.get('label[id$=-Bathrooms]').siblings().should('have.text', '2')
  }

  clickViewResults() {
    getIframeBody()
      .get('.bt-modal__overlay')
      .within(() => {
        cy.get('.bt-modal-content')
        cy.get('.bt-modal-footer')
          .find('.actionButton__ActionButton-sc-5q8woa-0')
          .click()
      })
  }
  clickClearFilters() {
    getIframeBody()
      .get('.bt-modal__overlay')
      .within(() => {
        cy.get('.bt-modal-content')
        cy.get('.bt-result-count').should('have.text', '17 Results')
        cy.get('.bt-modal-footer')
          .find('.bt-clear-filters')
          .click({ force: true })
      })
    getIframeBody()
      .get('.bt-modal__overlay')
      .within(() => {
        cy.get('.bt-modal-content')
        cy.get('.bt-result-count').should('have.text', '35 Results')
      })
  }
}

export const onVacationRentalsPage = new VacationRentalsPage()
