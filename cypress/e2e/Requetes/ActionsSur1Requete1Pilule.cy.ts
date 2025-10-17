/// <reference types="cypress"/>
import '../../support/commands';
import { SharedFilters } from '../../pom/shared/Filters';

describe('Page Data Exploration - Requêtes', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariantsPage(SharedFilters.variant.onePill);
    
    cy.get('[data-cy="SidebarMenuItem_Variant"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  };

  it('Éditer une pilule via la facette', () => {
    setupTest();
    cy.checkValueFacetAndApply('Variant Type', 'deletion');

    cy.validatePillSelectedQuery('Variant Type', ['SNV','Deletion']);
    cy.validateTotalSelectedQuery('488K');
    cy.validateTableResultsCount('488K');
    cy.validateClearAllButton(false);
  });

  it('Éditer une pilule via son popup', () => {
    setupTest();
    cy.get('[class*="QueryValues_queryValuesContainer"]').contains('SNV').clickAndWait({force:true});
    cy.get('[class*="filtersDropdown"] input[id="input-deletion"]').check({force: true});
    cy.clickAndIntercept('[class*="filtersDropdown"] [data-cy="Apply_Variant Type"]', 'POST', '**/graphql', 1);

    cy.validatePillSelectedQuery('Variant Type', ['SNV','Deletion']);
    cy.validateTotalSelectedQuery('488K');
    cy.validateTableResultsCount('488K');
    cy.validateClearAllButton(false);
  });

  it('Ajouter une pilule à une requête', () => {
    setupTest();
    cy.checkValueFacetAndApply('Consequence', 'intron');

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validatePillSelectedQuery('Consequence', ['Intron'], 1);
    cy.validateOperatorSelectedQuery('and');
    cy.validateTotalSelectedQuery('249K');
    cy.validateTableResultsCount('249K');
    cy.validateClearAllButton(false);
  });

  it('Construire une deuxième requête', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('button[class*="QueryTools_button"]').contains('New query').clickAndWait({force:true});
    for (let i = 0; i < 7; i++) {
      cy.wait('@getPOSTgraphql');
    };

    cy.get('body').contains('Use the search tools & facets on the left to build a query').should('exist');
    cy.validateTotalSelectedQuery('554K');
    cy.validateTableResultsCount('554K');
    cy.validateClearAllButton(false);

    cy.checkValueFacetAndApply('Consequence', 'intron');

    cy.validatePillSelectedQuery('Consequence', ['Intron']);
    cy.validateTotalSelectedQuery('325K');
    cy.validateTableResultsCount('325K');
    cy.validateClearAllButton(true);
  });

  it('Dupliquer une requête', () => {
    setupTest();
    cy.intercept('POST', '**/graphql').as('getPOSTgraphql');
    cy.get('[class*="QueryBar_selected"] [data-icon="copy"]').clickAndWait({force: true});
    cy.wait('@getPOSTgraphql');

    cy.validatePillSelectedQuery('Variant Type', ['SNV']);
    cy.validateTotalSelectedQuery('425K');
    cy.validateTableResultsCount('425K');
    cy.validateClearAllButton(true);
  });
});
