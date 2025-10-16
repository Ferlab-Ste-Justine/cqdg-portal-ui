/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../pom/shared/Utils';

describe('Page d\'une étude - Télécharger le Request Access', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitStudyEntity('T-DEE', 1);
    cy.get('[class*="EntityTitle"] [data-cy="RequestAccess_Button"]').click({force: true});
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-request-access', 1);
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('CQDG-access-request.tar.gz');
  });
});
