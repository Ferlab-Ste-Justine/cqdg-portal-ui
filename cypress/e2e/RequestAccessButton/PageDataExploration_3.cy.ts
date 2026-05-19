/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../pom/shared/Utils';

describe('Page Data Exploration (Data Files) - Télécharger le Request Access (checkbox)', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitDataExploration('datafiles', '?sharedFilterId=27aa6ea1-1ace-4661-b716-db987b0f78fb');
    cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
    cy.get('[data-cy="RequestAccess_Button"]').click({force: true});
    cy.get('[class="ant-modal-body"] input[type="checkbox"]').check({force: true});
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-request-access', 1);
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('CQDG-access-request.tar.gz');
  });
});
