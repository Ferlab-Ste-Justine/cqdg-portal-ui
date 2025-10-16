/// <reference types="cypress"/>
import '../../support/commands';

describe('Page des variants (Participant) - Filtrer avec les facettes', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariantsPage();
    cy.get('[data-cy="SidebarMenuItem_Participant"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Collapse all').should('exist');
  };

  it('Expand all/Collapse all', () => {
    setupTest();
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('not.exist');

    cy.get('[data-cy="ExpandAll"]').clickAndWait({force: true});
    cy.get('[data-cy="ExpandAll"]').contains('Expand all').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="false"]').should('exist');
    cy.get('section[class*="Filters"] [aria-expanded="true"]').should('not.exist');
  });

  it('Study Code - STUDY1', () => {
    setupTest();
    cy.validateFacetFilter('Study Code', 'STUDY1', 'STUDY1', /^554K$/);
    cy.validateFacetRank(0, 'Study Code');
  });
});
