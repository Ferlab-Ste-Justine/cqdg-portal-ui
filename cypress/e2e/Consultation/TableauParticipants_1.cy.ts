/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Participants) - Vérifier les informations affichées', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDataExploration('participants', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
    cy.showColumn('Gender');
    cy.showColumn(/^Race$/);
    cy.showColumn('Race (Other)');
    cy.showColumn('Diagnosis (ICD)');
    cy.showColumn('Diagnosis (Source Text)');
    cy.showColumn('External Participant');
    cy.showColumn('Vital Status');
    cy.showColumn('Program');
  };

  it('Titre', () => {
    setupTest();
    cy.get('[data-cy="Title_DataExploration"]').contains('Data Explorer');
  });

  it('Tableau', () => {
    setupTest();
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(1).contains('PT0000010').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(2).contains('T-DEE').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(3).contains('Male').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(4).contains('-').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(5).contains('epilepsy').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(5).contains('MONDO:').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(5).contains('0005027').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(6).contains('Seizure').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(6).contains('HP:').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(6).contains('0001250').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(7).contains('Proband').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(8).contains('Case-parent trio').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(9).contains('-').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(10).contains(/^6$/).should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(11).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(12).contains('-').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(13).contains('-').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(14).contains('Generalized idiopathic epilepsy and epileptic syndromes, intractable').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(14).contains('G40.31').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(15).contains('Intractable Epilepsy').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(16).contains('HSJ-1005-389').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(17).contains('Unknown').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(18).contains('RARE-QC2').should('exist');
    cy.get('tr[data-row-key="PT0000010"] [class*="ant-table-cell"]').eq(18).contains('RARE-QC3').should('exist');
  });
});
