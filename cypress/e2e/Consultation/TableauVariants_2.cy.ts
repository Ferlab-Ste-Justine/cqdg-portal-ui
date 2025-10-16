/// <reference types="cypress"/>
import '../../support/commands';
import { VariantsTable } from '../../pom/pages/VariantsTable';
import { variantMinMax } from '../../pom/shared/Data';

describe('Page des variants - Consultation du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariantsPage();
    VariantsTable.actions.showAllColumns();
  };

  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('variant', variantMinMax, false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('type', variantMinMax, false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('gnomad', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('gnomad_alt', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri Part.', () => {
    setupTest();
    VariantsTable.validations.shouldSortColumn('participants', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri Freq.', () => {
    setupTest();
    cy.showColumn('Freq.');
    VariantsTable.validations.shouldSortColumn('frequency', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri ALT', () => {
    setupTest();
    cy.showColumn(/^ALT$/);
    VariantsTable.validations.shouldSortColumn('alt', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri Homo.', () => {
    setupTest();
    cy.showColumn('Homo.');
    VariantsTable.validations.shouldSortColumn('homozygotes', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    setupTest();
    VariantsTable.actions.sortColumn('type');
    VariantsTable.actions.sortColumn('type');
    VariantsTable.actions.sortColumn('variant');
    VariantsTable.validations.shouldHaveFirstRowValue('chr1:g.100002795dup', 'variant');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    setupTest();
    VariantsTable.validations.shouldShowPaging();
  });
});
