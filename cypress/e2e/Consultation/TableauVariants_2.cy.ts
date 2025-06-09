/// <reference types="cypress"/>
import '../../support/commands';
import { VariantsTable } from '../../pom/pages/VariantsTable';
import { variantMinMax } from '../../pom/shared/Data';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage();
  VariantsTable.actions.showAllColumns();
});

describe('Page des variants - Consultation du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Variant', () => {
    VariantsTable.validations.shouldSortColumn('variant', variantMinMax, false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri Type', () => {
    VariantsTable.validations.shouldSortColumn('type', variantMinMax, false/*needIntercept*/);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD', () => {
    VariantsTable.validations.shouldSortColumn('gnomad', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri gnomAD ALT', () => {
    VariantsTable.validations.shouldSortColumn('gnomad_alt', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri Part.', () => {
    VariantsTable.validations.shouldSortColumn('participants', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri Freq.', () => {
    cy.showColumn('Freq.');
    VariantsTable.validations.shouldSortColumn('frequency', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri ALT', () => {
    cy.showColumn(/^ALT$/);
    VariantsTable.validations.shouldSortColumn('alt', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri Homo.', () => {
    cy.showColumn('Homo.');
    VariantsTable.validations.shouldSortColumn('homozygotes', variantMinMax);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    VariantsTable.actions.sortColumn('type');
    VariantsTable.actions.sortColumn('type');
    VariantsTable.actions.sortColumn('variant');
    VariantsTable.validations.shouldHaveFirstRowValue('chr1:g.100002795dup', 'variant');
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    VariantsTable.validations.shouldShowPaging();
  });
});
