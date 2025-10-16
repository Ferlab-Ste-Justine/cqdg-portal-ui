/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un fichier - Valider les redirections', () => {
  const setupTest = () => {
    cy.login();
    cy.visitFileEntity('FI0009813');
  };

  it('Studies', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Studies_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });
  
  it('Participant', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Participants_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('FI0009813').should('exist');
  });
  
  it('Sample', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Samples_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('FI0009813').should('exist');
  });
});
