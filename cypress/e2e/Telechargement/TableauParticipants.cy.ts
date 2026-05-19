/// <reference types="cypress"/>
import { getDateTime } from '../../pom/shared/Utils';
import { oneMinute } from '../../pom/shared/Utils';

const { strDate } = getDateTime();

describe('Page Data Exploration (Participants) - Exporter les participants en TSV', () => {
  const setupTest = () => {
    cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

    cy.login();
    cy.visitDataExploration('participants', '?sharedFilterId=27aa6ea1-1ace-4661-b716-db987b0f78fb');
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
  };

  it('Valider le nom du fichier', () => {
    setupTest();
    cy.validateFileName('cqdg-participant-table-'+`${strDate.slice(0, 4)}-${strDate.slice(4, 6)}-${strDate.slice(6, 8)}`+'.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    setupTest();
    cy.validateFileHeaders('ExportTableauParticipants.json');
  });

  it('Valider le contenu du fichier', () => {
    setupTest();
    cy.validateFileContent('ExportTableauParticipants.json');
  });
});
