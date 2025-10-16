/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un fichier - Bouton Manifest', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitFileEntity('FI0011224');
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
