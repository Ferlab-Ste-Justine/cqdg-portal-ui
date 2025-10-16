/// <reference types="cypress"/>
import '../../support/commands';

describe('Page d\'un participant - Colonnes du tableau Family', () => {
  const setupTest = () => {
    cy.login();
    cy.visitParticipantEntity('PT0000010');
    cy.resetColumns('family');
  };

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    setupTest();
    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Participant').should('exist');
    
    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Family Position').should('exist');
  
    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Disease Status').should('exist');
  });

  it('Masquer/Afficher une colonne affichée', () => {
    setupTest();
    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Participant')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Participant')
      .find('[type="checkbox"]').check({force: true});

    cy.get('[id="family"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant').should('exist');
  });
});
