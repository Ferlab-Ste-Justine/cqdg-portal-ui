/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un participant - Colonnes du tableau Biospecimens', () => {
  const setupTest = () => {
    cy.login();
    cy.visitParticipantEntity('PT0000879');
    cy.resetColumns('biospecimen');
  };

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    setupTest();
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample').should('exist');

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Biospecimen').should('exist');
    
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample Type').should('exist');
  
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Tissue').should('exist');
    
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Cancer Tissue Type').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(5)
      .contains('Cancer Tissue Type').should('exist');

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Age').should('exist');

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Tumor Status').should('exist');
    
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Tumor Type (NCIt)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(8)
      .contains('Tumor Type (NCIt)').should('exist');
    
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Tumor Type (Source Text)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(9)
      .contains('Tumor Type (Source Text)').should('exist');
    
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Tumor Location (NCIt)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(10)
      .contains('Tumor Location (NCIt)').should('exist');
    
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Tumor Location (Source Text)').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(11)
      .contains('Tumor Location (Source Text)').should('exist');
  });

  it('Masquer/Afficher une colonne affichée', () => {
    setupTest();
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Sample Type').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Sample Type')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Sample Type').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Sample Type')
      .find('[type="checkbox"]').check({force: true});

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Sample Type').should('exist');
  });
});
