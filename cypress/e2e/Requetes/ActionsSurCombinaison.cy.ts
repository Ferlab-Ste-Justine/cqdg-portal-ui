/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage('?sharedFilterId=f61a3a36-d3de-4ac5-852b-fab8f79c1834');

  cy.get('[data-cy="SidebarMenuItem_Variant"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
  cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
});

describe('Page Data Exploration - Requêtes', () => {
  it('Supprimer une requête utilisée dans une combinaison', () => {
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql1');
    cy.get('.simplebar-wrapper').invoke('css', 'overflow', 'visible');
    cy.get('[class*="QueryBar_selected"] button[class*="QueryPill_close"]').clickAndWait();
    cy.wait('@getPOSTgraphql1');
    cy.wait('@getPOSTgraphql1');
    cy.wait('@getPOSTgraphql1');

    cy.get('[class*="QueryBar_queryBarWrapper"]').its('length').should('eq', 2);
    cy.validatePillSelectedQuery('Position', ['10000000']);
    cy.validateTotalSelectedQuery('26.4K');
    cy.validateTableResultsCount('26.4K');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('[class*="QueryValues_queryValuesContainer"]').contains('Q1').should('exist');
    cy.get('[class*="QueryBar_queryBarWrapper"]').eq(1).find('[class*="QueryValues_queryValuesContainer"]').contains('Q2').should('not.exist');
    cy.validateClearAllButton(true);
  });
});
