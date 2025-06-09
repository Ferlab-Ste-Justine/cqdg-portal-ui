/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { SharedFilters } from '../../pom/shared/Filters';
import { VariantsTable } from '../../pom/pages/VariantsTable';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage(SharedFilters.variant.chr1_11846011);
  VariantsTable.actions.showAllColumns();
});

describe('Page des variants - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    VariantsTable.validations.shouldShowTableContent(data.variantGermline);
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'variant');
    cy.get('[class*="EntityTitle"]').contains(data.variantGermline.variant);
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'dbsnp');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien Gene Plus', () => {
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'gene', true/*onPlusIcon*/);
    VariantsTable.validations.shouldHaveSelectedQueryPill(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'omim');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'clinvar');
  });
 
  it('Valider les liens disponibles Lien Part.', () => {
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'participants');
  });
 
  it('Valider les liens disponibles Lien Studies', () => {
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'studies');
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('STUDY1').should('exist');
  });
});
