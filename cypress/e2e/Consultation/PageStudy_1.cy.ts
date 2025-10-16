/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'une étude - Valider les redirections', () => {
  const setupTest = () => {
    cy.login();
    cy.visitStudyEntity('T-DEE', 1);
  };

  it('Participants', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Participants_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });

  it('Families', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Families_Button"] [href]').should('not.exist');
  });
  
  it('Biospecimens', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Biospecimens_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_Biospecimens"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });
  
  it('Files', () => {
    setupTest();
    cy.get('[data-cy="SummaryHeader_Files_Button"] [href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('T-DEE').should('exist');
  });
});
