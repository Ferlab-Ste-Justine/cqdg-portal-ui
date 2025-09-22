/// <reference types="cypress"/>
import { getDateTime } from '../../pom/shared/Utils';
import { oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=f586eafb-ed2d-4cde-8ac0-c0c44fa2a504');
  cy.showColumn('Gender');
  cy.showColumn(/^Family$/);
  cy.showColumn(/^Race$/);
  cy.showColumn('Race (Other)');
  cy.showColumn('Diagnosis (ICD)');
  cy.showColumn('Diagnosis (Source Text)');
  cy.showColumn('External Participant');
  cy.showColumn('Vital Status');
  cy.wait(1000);

  cy.clickAndIntercept('div[id="content"] svg[data-icon="download"]', 'POST', '**/download', 1, 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page Data Exploration (Participants) - Exporter les participants en TSV', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('cqdg-participant-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier [CQDG-1221]', () => {
    cy.validateFileHeaders('ExportTableauParticipants.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('ExportTableauParticipants.json');
  });
});
