/// <reference types="Cypress" />
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));
  cy.login();
});

describe('Page d\'un fichier - Exporter le tableau Participants-Samples en TSV', () => {
  beforeEach(() => {
    cy.visitFileEntity('FI0000981');
    cy.resetColumns('biospecimens');
    cy.get('div[id="content"] svg[data-icon="download"]').eq(1).click({force: true});
    cy.wait(2000);
  });
  
  it('Valider le nom du fichier [CQDG-500]', () => {
    cy.validateFileName('cqdg-participants-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier [CQDG-500]', () => {
    cy.validateFileHeaders('ExportTableauParticipantsPageFile.json');
  });

  it('Valider le contenu du fichier [CQDG-500]', () => {
    cy.validateFileContent('ExportTableauParticipantsPageFile.json');
  });
});

describe('Page d\'un fichier - Exporter le tableau Files Generated by the Analysis en TSV [CQDG-333]', () => {
  beforeEach(() => {
    cy.visitFileEntity('FI0000981');
    cy.resetColumns('analysis_files');
    cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 4);
  });
  
  it('Valider le nom du fichier', () => {
    cy.validateFileName('cqdg-files-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('ExportTableauFilesPageFile.json');
  });

  it('Valider le contenu du fichier [CQDG-500]', () => {
    cy.validateFileContent('ExportTableauFilesPageFile.json');
  });
});