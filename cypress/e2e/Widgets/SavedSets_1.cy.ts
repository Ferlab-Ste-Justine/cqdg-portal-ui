/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Dashboard - Widget Saved Sets', () => {
  const setupTest = () => {
    cy.login();
    cy.visitDashboard();
  };

  it('Vérifier les informations affichées - Tooltip', () => {
    setupTest();
    cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('My Sets')) {
        cy.wrap($el).find('[class*="CardHeader_infoIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
      }
    });
    cy.get('[class="ant-popover-title"]').contains('Managing Saved Sets').should('exist');
    cy.get('[class="ant-popover-inner-content"]').contains('A set is a fixed collection of entities (participants, biospecimens, files, or variants) which does not change even if CQDG data is updated.').should('exist');
  });

  it('Valider les liens disponibles - Learn more du Tooltip', () => {
    setupTest();
    cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('My Sets')) {
        cy.wrap($el).find('[class*="CardHeader_infoIcon"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
      }
    });
    cy.get('[href*="https://docs.cqdg.ca/docs/filtres?ljs="]').should('exist');
  });
});
