/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'une étude - Bouton Request Access', () => {
  const setupTest = () => {
    cy.login();
    cy.visitStudyEntity('T-DEE', 1);
    cy.get('[class*="EntityTitle"] [data-cy="RequestAccess_Button"]').click({force: true});
  };

  it('Vérifier les informations affichées - Modal', () => {
    setupTest();
    cy.get('[class="ant-modal-title"]').contains('Request access').should('exist');
    cy.get('[class="ant-modal-body"]').contains('To obtain access to the data from this study, please submit your request to the study’s Access Authority:').should('exist');
    cy.get('[class="ant-modal-body"]').contains('toto@gov.org').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Before submitting your request, please ensure you are able to comply with the study’s Access Limitations and Access Requirements listed in the “Data Access” section.').should('exist');
    cy.get('[class="ant-modal-body"]').contains('To find out more, please read the page').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Data Access Request').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] thead th').eq(0).contains('Study').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] thead th').eq(1).contains('Study Code').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] thead th').eq(2).contains('Files').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] [data-row-key="T-DEE"] td').eq(0).contains('Developmental and epileptic encephalopathies').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] [data-row-key="T-DEE"] td').eq(1).contains('T-DEE').should('exist');
    cy.get('[class*="DownloadRequestAccessModal_table"] [data-row-key="T-DEE"] td').eq(2).contains('3136').should('exist');

    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').contains('Cancel').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').contains('Download').should('exist');
  });
});
