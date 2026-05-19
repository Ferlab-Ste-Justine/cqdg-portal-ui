/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Data Exploration (Data Files) - Bouton Manifest', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitDataExploration('datafiles', '?sharedFilterId=27aa6ea1-1ace-4661-b716-db987b0f78fb');
    cy.get('[data-row-key*="FI0013377"]').find('[type="checkbox"]').check({force: true});
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
