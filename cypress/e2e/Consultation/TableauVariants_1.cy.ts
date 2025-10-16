/// <reference types="cypress"/>
import '../../support/commands';
import { data } from '../../pom/shared/Data';
import { SharedFilters } from '../../pom/shared/Filters';
import { VariantsTable } from '../../pom/pages/VariantsTable';

describe('Page des variants - Consultation du tableau', () => {
  const setupTest = () => {
    cy.login();
    cy.visitVariantsPage(SharedFilters.variant.chr1_11846011);
    VariantsTable.actions.showAllColumns();
  };

  it('Vérifier les informations affichées', () => {
    setupTest();
    VariantsTable.validations.shouldShowTableContent(data.variantGermline);
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    setupTest();
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    setupTest();
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'variant');
    cy.get('[class*="EntityTitle"]').contains(data.variantGermline.variant);
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'dbsnp');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien Gene Plus', () => {
    setupTest();
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'gene', true/*onPlusIcon*/);
    VariantsTable.validations.shouldHaveSelectedQueryPill(data.variantGermline, 'gene');
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'omim');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'clinvar');
  });
 
  it('Valider les liens disponibles Lien Part.', () => {
    setupTest();
    VariantsTable.validations.shouldHaveTableCellLink(data.variantGermline, 'participants');
  });
 
  it('Valider les liens disponibles Lien Studies', () => {
    setupTest();
    VariantsTable.actions.clickTableCellLink(data.variantGermline, 'studies');
    cy.get('[data-cy="ProTable_Participants"]').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('STUDY1').should('exist');
  });
});
