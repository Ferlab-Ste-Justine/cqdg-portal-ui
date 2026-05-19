/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Biospecimens) - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('biospecimens', '?sharedFilterId=27aa6ea1-1ace-4661-b716-db987b0f78fb');
    cy.showColumn('Cancer Tissue Type');
    cy.showColumn('Tumor Type (NCIt)');
    cy.showColumn('Tumor Type (Source Text)');
    cy.showColumn('Tumor Location (NCIt)');
    cy.showColumn('Tumor Location (Source Text)');
  };

  it('Titre', () => {
    setupTest();
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Explorer');
  });

  it('Tableau', () => {
    setupTest();
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(1).contains('SR0000084').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(2).contains('SP0000932').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(3).contains('PT0000964').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(4).contains('T-DEE').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('DNA').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('NCIT:').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('C449').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('Blood').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('NCIT:').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('C12434').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(7).contains('-').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(8).contains('-').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(9).contains(/^5$/).should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(10).contains('Not applicable').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(10).find('[class*="ColorTag_default"]').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(11).contains('-').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(12).contains('-').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(13).contains('-').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(14).contains('-').should('exist');
  });
});
