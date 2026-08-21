/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Data Files) - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('datafiles', '?sharedFilterId=27aa6ea1-1ace-4661-b716-db987b0f78fb');
    cy.showColumn('Dataset');
    cy.showColumn('Profiling Resolution');
    cy.showColumn('Participants');
    cy.showColumn('Biospecimens');
    cy.showColumn('File Name');
    cy.showColumn('Platform');
    cy.showColumn('Instrument Model');
    cy.showColumn('Pore Type');
    cy.showColumn('Imputed');
  };

  it('Titre', () => {
    setupTest();
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Explorer');
  });

  it('Tableau', () => {
    setupTest();
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(1).find('svg[data-icon="lock"]').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(2).contains('C').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(2).find('[class*="ant-tag-geekblue"]').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(3).contains('FH0004562').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(4).contains('T-DEE').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(5).contains('-').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(6).contains('Genomics').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(7).contains('Germline Variant Analysis with Family Joint Genotyping').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(8).contains('Quality Control Metrics').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(9).contains('Whole Genome Sequencing').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(10).contains('Bulk').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(11).contains('TGZ').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(12).contains('17.9 GB').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(13).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(14).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(15).contains('S15906.extra.tgz').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(16).contains('Illumina').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(19).scrollIntoView();
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(17).contains('Illumina HiSeq 2500').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(18).contains('-').should('exist');
    cy.get('tr[data-row-key*="FI0013377"] [class*="ant-table-cell"]').eq(19).contains('No').should('exist');
  });
});
