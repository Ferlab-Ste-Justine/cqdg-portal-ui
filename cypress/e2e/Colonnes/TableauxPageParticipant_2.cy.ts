/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un participant - Colonnes du tableau Diagnoses', () => {
  const setupTest = () => {
    cy.login();
    cy.visitParticipantEntity('PT0000010');
    cy.resetColumns('diagnosis');
  };

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    setupTest();
    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Diagnosis (MONDO)').should('exist');
    
    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Diagnosis (ICD-10)').should('exist');
  
    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Diagnosis (Source Text)').should('exist');

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Age').should('exist');

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Cancer').should('exist');

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('MONDO Term').should('exist');
  });

  it('Masquer/Afficher une colonne affichée', () => {
    setupTest();
    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Diagnosis (MONDO)').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Diagnosis (MONDO)')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Diagnosis (MONDO)').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Diagnosis (MONDO)')
      .find('[type="checkbox"]').check({force: true});

    cy.get('[id="diagnosis"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Diagnosis (MONDO)').should('exist');
  });
});
