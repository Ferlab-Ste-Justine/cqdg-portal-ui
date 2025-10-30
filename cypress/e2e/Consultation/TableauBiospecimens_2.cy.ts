/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Biospecimens) - Valider les liens disponibles', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('biospecimens', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
    cy.showColumn('Cancer Tissue Type');
    cy.showColumn('Tumor Type (NCIt)');
    cy.showColumn('Tumor Type (Source Text)');
    cy.showColumn('Tumor Location (NCIt)');
    cy.showColumn('Tumor Location (Source Text)');
  };

  it('Lien Participant du tableau', () => {
    setupTest();
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(3).find('[href]').clickAndWait({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT0000010');
  });

  it('Lien Study du tableau', () => {
    setupTest();
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(4).find('[href]').clickAndWait({force: true});
    cy.get('[id="study-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('Developmental and epileptic encephalopathies');
  });

  it('Lien NCIT de Sample Type du tableau', () => {
    setupTest();
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C449');
  });

  it('Lien NCIT de Tissue du tableau', () => {
    setupTest();
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/NCIT_C12434');
  });

  it('Lien Files du tableau', () => {
    setupTest();
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(9).find('[href]').clickAndWait({force: true});
    cy.get('[data-cy="ProTable_DataFiles"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Sample ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('SR0000214').should('exist');
    cy.validateTableResultsCount(/^6$/);
  });
});
