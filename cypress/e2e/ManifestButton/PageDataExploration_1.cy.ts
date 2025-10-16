/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Data Files) - Bouton Manifest', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitDataExploration('datafiles', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
    cy.get('[data-row-key="FI00112245"]').find('[type="checkbox"]').check({force: true});
    cy.get('[data-cy="FileManifest_Button"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
  };

  it('Vérifier les informations affichées - Tooltip', () => {
    setupTest();
    cy.get('div[class="ant-tooltip-inner"]').contains('File manifest for the ').should('exist');
    cy.get('div[class="ant-tooltip-inner"]').contains('ferload').should('exist');
    cy.get('div[class="ant-tooltip-inner"]').contains(' tool').should('exist');
    cy.get('div[class="ant-tooltip-inner"] [class="anticon"]').should('exist');
  });

  it('Valider les liens disponibles - Tooltip', () => {
    setupTest();
    cy.get('div[class="ant-tooltip-inner"] [class*="DownloadFileManifestModal_externalLinkFerload"]').should('have.attr', 'href', 'https://docs.cqdg.ca/docs/comment-utiliser-le-client-ferload?ljs=en-CA');
  });
});
