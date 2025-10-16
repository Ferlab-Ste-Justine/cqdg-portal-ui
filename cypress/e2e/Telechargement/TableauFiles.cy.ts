/// <reference types="cypress"/>
import { getDateTime } from '../../pom/shared/Utils';
import { oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();

describe('Page Data Exploration (Data Files) - Exporter les fichiers en TSV', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitDataExploration('datafiles', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
    cy.showColumn('Dataset');
    cy.showColumn('File Name');
    cy.showColumn('Platform');

    cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 2);
    cy.waitUntilFile(oneMinute);
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('cqdg-file-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    cy.validateFileHeaders('ExportTableauFiles.json');
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateFileContent('ExportTableauFiles.json');
  });
});
