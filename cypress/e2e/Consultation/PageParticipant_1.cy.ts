/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un participant - Valider les redirections', () => {
  const setupTest = () => {
    cy.login();
    cy.visitParticipantEntity('PT0000879');
  };

  it('Studies', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Studies_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });
  
  it('Biospecimens', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000879').should('exist');
  });
  
  it('Files', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Files_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT0000879').should('exist');
  });
});
