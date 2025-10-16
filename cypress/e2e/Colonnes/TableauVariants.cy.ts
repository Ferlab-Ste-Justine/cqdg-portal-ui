/// <reference types="cypress"/>
import '../../support/commands';
import { VariantsTable } from '../../pom/pages/VariantsTable';

describe('Page des variants - Colonnes du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariantsPage();
  };

  it('Valider l\'affichage par défaut', () => {
    setupTest();
    VariantsTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    setupTest();
    VariantsTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    setupTest();
    VariantsTable.validations.shouldShowSortableColumns();
  });

  it('Valider le tooltip', () => {
    setupTest();
    VariantsTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    setupTest();
    VariantsTable.validations.shouldDisplayColumn('type');
    VariantsTable.actions.hideColumn('type');
    VariantsTable.validations.shouldNotDisplayColumn('type');
  });

  it('Afficher une colonne masquée', () => {
    setupTest();
    VariantsTable.validations.shouldNotDisplayColumn('cadd');
    VariantsTable.actions.showColumn('cadd');
    VariantsTable.validations.shouldDisplayColumn('cadd');
  });
});