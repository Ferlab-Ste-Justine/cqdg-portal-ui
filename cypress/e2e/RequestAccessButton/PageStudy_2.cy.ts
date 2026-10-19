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

  const extractAccessTsv = () => {
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.exec(`tar -xzf "${downloadsFolder}/CQDG-access-request.tar.gz" -C "${downloadsFolder}" access.tsv`);
    cy.exec(`/bin/rm "${downloadsFolder}/CQDG-access-request.tar.gz"`);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('CQDG-access-request.tar.gz');
  });

  it('Valider les en-têtes du fichier access.tsv', () => {
    setupTest();
    extractAccessTsv();
    cy.validateFileHeaders('DownloadRequestAccessStudy.json');
  });

  it('Valider le contenu du fichier access.tsv', () => {
    setupTest();
    extractAccessTsv();
    cy.validateFileContent('DownloadRequestAccessStudy.json');
  });
});
