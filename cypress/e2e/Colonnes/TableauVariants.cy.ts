/// <reference types="cypress"/>
import '../../support/commands';
import { VariantsTable } from '../../pom/pages/VariantsTable';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
});

describe('Page des variants - Colonnes du tableau', () => {
  it('Valider l\'affichage par défaut', () => {
    VariantsTable.validations.shouldMatchDefaultColumnVisibility();
  });

  it('Valider l\'ordre', () => {
    VariantsTable.validations.shouldShowAllColumns();
  });

  it('Valider la propriété de tri', () => {
    VariantsTable.validations.shouldShowSortableColumns();
  });

  it('Valider le tooltip', () => {
    VariantsTable.validations.shouldShowColumnTooltips();
  });

  it('Masquer une colonne affichée', () => {
    VariantsTable.validations.shouldDisplayColumn('type');
    VariantsTable.actions.hideColumn('type');
    VariantsTable.validations.shouldNotDisplayColumn('type');
  });

  it('Afficher une colonne masquée', () => {
    VariantsTable.validations.shouldNotDisplayColumn('cadd');
    VariantsTable.actions.showColumn('cadd');
    VariantsTable.validations.shouldDisplayColumn('cadd');
  });
});