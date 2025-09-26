/// <reference types="cypress"/>
import { CommonSelectors } from '../shared/Selectors';
import { CommonTexts } from '../shared/Texts';
import { formatToK, getDateTime, getUrlLink, isFerlease, scientificToDecimal, stringToRegExp } from '../shared/Utils';
import { getColumnName, getColumnPosition } from '../shared/Utils';
import { Replacement } from '../shared/Types';

const selectorHead = CommonSelectors.tableHead;
const selectors = {
  pageTitle: '[data-cy="Title_Variants"]',
  proTableHeader: 'div[class*="ProTableHeader"]',
  tableCell: 'tr[data-row-key]',
  tableHeadCell: `${selectorHead} ${CommonSelectors.tableCell}`,
};

const tableColumns = [
  {
    id: 'variant',
    name: 'Variant',
    isVisibleByDefault: true,
    isSortable: true,
    position: 1,
    tooltip: null,
  },
  {
    id: 'type',
    name: 'Type',
    isVisibleByDefault: true,
    isSortable: true,
    position: 2,
    tooltip: null,
  },
  {
    id: 'sources',
    name: 'Sources',
    isVisibleByDefault: true,
    isSortable: false,
    position: 3,
    tooltip: null,
  },
  {
    id: 'dbsnp',
    name: 'dbSNP',
    isVisibleByDefault: true,
    isSortable: false,
    position: 4,
    tooltip: null,
  },
  {
    id: 'gene',
    name: 'Gene',
    isVisibleByDefault: true,
    isSortable: false,
    position: 5,
    tooltip: null,
  },
  {
    id: 'consequence',
    name: 'Most Deleterious Consequence',
    isVisibleByDefault: true,
    isSortable: false,
    position: 6,
    tooltip: 'Functional consequences of genetic variations annotated using VEP',
  },
  {
    id: 'mane',
    name: 'MANE',
    isVisibleByDefault: true,
    isSortable: false,
    position: 7,
    tooltip: null,
  },
  {
    id: 'omim',
    name: 'OMIM',
    isVisibleByDefault: true,
    isSortable: false,
    position: 8,
    tooltip: 'MIM inheritance modes',
  },
  {
    id: 'clinvar',
    name: 'ClinVar',
    isVisibleByDefault: true,
    isSortable: false,
    position: 9,
    tooltip: null,
  },
  {
    id: 'gnomad',
    name: 'gnomAD',
    isVisibleByDefault: true,
    isSortable: true,
    position: 10,
    tooltip: 'gnomAD Genome 3.1.2 (allele frequency)',
  },
  {
    id: 'gnomad_alt',
    name: 'gnomAD ALT',
    isVisibleByDefault: true,
    isSortable: true,
    position: 11,
    tooltip: 'gnomAD Genome 3.1.2 (# of alternative alleles)',
  },
  {
    id: 'participants',
    name: 'Part.',
    isVisibleByDefault: true,
    isSortable: true,
    position: 12,
    tooltip: 'Number and frequency of participant carriers in the CQDG cohorts (whole genomes only)',
  },
  {
    id: 'studies',
    name: 'Studies',
    isVisibleByDefault: true,
    isSortable: false,
    position: 13,
    tooltip: '# of studies with affected participants',
  },
  {
    id: 'frequency',
    name: 'Freq.',
    isVisibleByDefault: false,
    isSortable: true,
    position: 14,
    tooltip: 'Allelic frequency of the variant across CQDG cohorts (whole genomes only)',
  },
  {
    id: 'cadd',
    name: 'CADD',
    isVisibleByDefault: false,
    isSortable: false,
    position: 15,
    tooltip: 'CADD (Phred score)',
  },
  {
    id: 'revel',
    name: 'REVEL',
    isVisibleByDefault: false,
    isSortable: false,
    position: 16,
    tooltip: null,
  },
  {
    id: 'alt',
    name: 'ALT',
    isVisibleByDefault: false,
    isSortable: true,
    position: 17,
    tooltip: '# of alternative alleles',
  },
  {
    id: 'homozygotes',
    name: 'Homo.',
    isVisibleByDefault: false,
    isSortable: true,
    position: 18,
    tooltip: '# of homozygotes for alternative alleles',
  }
];

export const VariantsTable = {
    actions: {
      /**
       * Clicks the link in a specific table cell for a given variant and column.
       * @param dataVariant The variant object.
       * @param columnID The ID of the column.
       * @param onPlusIcon Click on the plus icon (default: false).
       */
      clickTableCellLink(dataVariant: any, columnID: string, onPlusIcon: boolean = false) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            switch (columnID) {
              case 'variant':
                cy.get(selectors.tableCell).find(CommonSelectors.tableCell).contains(dataVariant.variant).invoke('removeAttr', 'target').clickAndWait({force: true});
              break;
              case 'gene':
                const selectorToClick = onPlusIcon ? CommonSelectors.plusIcon : CommonSelectors.link;
                cy.get(selectors.tableCell).find(CommonSelectors.tableCell).eq(position).find(selectorToClick).clickAndWait({force: true});
              break;
              default:
                cy.get(selectors.tableCell).find(CommonSelectors.tableCell).eq(position).find(CommonSelectors.link).clickAndWait({force: true});
              break;
            };
          };
        }));
      },
      /**
       * Hides a specific column in the table.
       * @param columnID The ID of the column to hide.
       */
      hideColumn(columnID: string) {
        cy.hideColumn(getColumnName(tableColumns, columnID));
      },
      /**
       * Shows all columns in the table.
       */
      showAllColumns() {
        tableColumns.forEach((column) => {
          if (!column.isVisibleByDefault) {
            cy.showColumn(stringToRegExp(column.name, true/*exact*/));
          };
        });
      },
      /**
       * Shows a specific column in the table.
       * @param columnID The ID of the column to show.
       */
      showColumn(columnID: string) {
        cy.showColumn(stringToRegExp(getColumnName(tableColumns, columnID), true/*exact*/));
      },
      /**
       * Sorts a column, optionally using an intercept.
       * @param columnID The ID of the column to sort.
       * @param needIntercept Whether to use an intercept (default: true).
       */
      sortColumn(columnID: string, needIntercept: boolean = true) {
        const columnName = getColumnName(tableColumns, columnID);
        if (needIntercept) {
          cy.sortTableAndIntercept(stringToRegExp(columnName, true/*exact*/), 1);
        }
        else {
          cy.sortTableAndWait(stringToRegExp(columnName, true/*exact*/));
        };
      },
    },
  
    validations: {
      /**
       * Checks that a specific column is displayed.
       * @param columnID The ID of the column to check.
       */
      shouldDisplayColumn(columnID: string) {
        cy.get(selectorHead).contains(getColumnName(tableColumns, columnID)).should('exist');
      },
      /**
       * Validates the content of the exported file.
       * @param dataVariant The variant object containing the expected values.
       */
      shouldHaveExportedFileContent(dataVariant: any) {
        const replacements: Replacement[] = [
          { placeholder: '{{variant}}', value: dataVariant.variant },
          { placeholder: '{{type}}', value: dataVariant.type },
          { placeholder: '{{dbsnp}}', value: dataVariant.dbsnp },
          { placeholder: '{{gene}}', value: dataVariant.gene },
          { placeholder: '{{consequence}}', value: dataVariant.consequence.replace('Missense', 'Missense ') },
          { placeholder: '{{maneC}}', value: dataVariant.maneC ? 'Ensembl Canonical' : '' },
          { placeholder: '{{maneM}}', value: dataVariant.maneM ? 'MANE Select' : '' },
          { placeholder: '{{maneP}}', value: dataVariant.maneP ? 'MANE Plus' : '' },
          { placeholder: '{{omim}}', value: dataVariant.omim },
          { placeholder: '{{clinvar}}', value: dataVariant.clinvar.join(',') },
          { placeholder: '{{gnomad}}', value: dataVariant.gnomad },
          { placeholder: '{{gnomad_alt}}', value: dataVariant.gnomad_alt },
          { placeholder: '{{rqdmP}}', value: dataVariant.rqdmP },
          { placeholder: '{{rqdmF}}', value: dataVariant.rqdmF },
          { placeholder: '{{cmcP}}', value: dataVariant.cmcP },
          { placeholder: '{{cmcF}}', value: scientificToDecimal(dataVariant.cmcF) },
          { placeholder: '{{hotspot}}', value: dataVariant.hotspot },
          { placeholder: '{{exomiser}}', value: dataVariant.exomiser },
          { placeholder: '{{tier}}', value: dataVariant.tier },
          { placeholder: '{{max_franklin}}', value: dataVariant.max_franklin },
          { placeholder: '{{max_exomiser}}', value: dataVariant.max_exomiser },
          { placeholder: '{{acmg_franklin}}', value: dataVariant.acmg_franklin === 'ND' ? '-' : dataVariant.acmg_franklin },
          { placeholder: '{{acmg_exomiser}}', value: dataVariant.acmg_exomiser },
          { placeholder: '{{criteria_franklin}}', value: dataVariant.criteria_franklin },
          { placeholder: '{{cadd}}', value: dataVariant.cadd },
          { placeholder: '{{revel}}', value: dataVariant.revel },
        ];
        cy.validateFileContent('ExportTableauVariants.json', replacements);
      },
      /**
       * Validates the headers of the exported file.
       */
      shouldHaveExportedFileHeaders() {
        cy.validateFileHeaders('ExportTableauVariants.json');
      },
      /**
       * Validates the name of the exported file.
       */
      shouldHaveExportedFileName() {
        const {strDate} = getDateTime();
        cy.validateFileName(`SNV_${strDate}T*.tsv`);
      },
      /**
       * Validates the value of the first row for a given column.
       * @param value The expected value (string or RegExp).
       * @param columnID The ID of the column to check.
       */
      shouldHaveFirstRowValue(value: string | RegExp, columnID: string) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            cy.validateTableFirstRow(value, position, true/*hasCheckbox*/);
          };
        }));
      },
      /**
       * Validates the pill in the selected query.
       * @param dataVariant The variant object.
       * @param columnID The ID of the column to check.
       */
      shouldHaveSelectedQueryPill(dataVariant: any, columnID: string) {
        cy.validatePillSelectedQuery(getColumnName(tableColumns, columnID), [dataVariant[columnID]]);
      },
      /**
       * Validates the link in a specific table cell for a given variant and column.
       * @param dataVariant The variant object.
       * @param url The expected url (string or RegExp).
       * @param columnID The ID of the column.
       */
      shouldHaveTableCellLink(dataVariant: any, columnID: string) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            switch (columnID) {
              case 'participants':
                if (dataVariant.partN < 10)
                {
                  cy.get(selectors.tableCell).find(CommonSelectors.tableCell).eq(position).find(CommonSelectors.link).should('not.exist');
                } else
                {
                  cy.get(selectors.tableCell).find(CommonSelectors.tableCell).eq(position).find(CommonSelectors.link).should('have.attr', 'href', getUrlLink(columnID, dataVariant));
                };
                break;
              default:
                cy.get(selectors.tableCell).find(CommonSelectors.tableCell).eq(position).find(CommonSelectors.link).should('have.attr', 'href', getUrlLink(columnID, dataVariant));
                break;
            };
          };
        }));
      },
      /**
       * Validates the default visibility of each column.
       */
      shouldMatchDefaultColumnVisibility() {
        tableColumns.forEach((column) => {
          const expectedExist = column.isVisibleByDefault ? 'exist' : 'not.exist';
          cy.get(selectorHead).contains(stringToRegExp(column.name, true/*exact*/)).should(expectedExist);
        });
      },
      /**
       * Checks that a specific column is not displayed.
       * @param columnID The ID of the column to check.
       */
      shouldNotDisplayColumn(columnID: string) {
        cy.get(selectorHead).contains(getColumnName(tableColumns, columnID)).should('not.exist');
      },
      /**
       * Validates that all columns are displayed in the correct order in the table.
       */
      shouldShowAllColumns() {
        VariantsTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
        cy.get(selectors.tableHeadCell).eq(column.position).contains(stringToRegExp(column.name, true/*exact*/)).should('exist');
        });
      },
      /**
       * Validates the presence of tooltips on columns.
       */
      shouldShowColumnTooltips() {
        VariantsTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          if (column.tooltip) {
            cy.getColumnHeadCell(column.name).shouldHaveTooltip(column.tooltip);
          }
        });
      },
      /**
       * Checks that the "No Results" message is displayed.
       */
      shouldShowNoResultsMessage() {
        cy.get(selectors.proTableHeader).contains(/^No Results$/).should('exist');
      },
      /**
       * Checks the page title.
       */
      shouldShowPageTitle() {
        cy.get(selectors.pageTitle).contains(CommonTexts.variantsPageTitle).should('exist');
      },
      /**
       * Validates the pagination functionality.
       */
      shouldShowPaging() {
        cy.validatePaging();
      },
      /**
       * Checks the displayed results count.
       * @param count The expected count (string, number, or RegExp).
       * @param shouldExist Whether the count should exist (default: true).
       */
      shouldShowResultsCount(count: string | number | RegExp, shouldExist: boolean = true) {
        const strPlural = count === '1' ? '' : 's';
        cy.validateTableResultsCount(`${count} Résultat${strPlural}`, shouldExist);
      },
      /**
       * Validates that sortable columns are correctly marked as sortable.
       */
      shouldShowSortableColumns() {
        VariantsTable.actions.showAllColumns();
        tableColumns.forEach((column) => {
          cy.getColumnHeadCell(column.name).shouldBeSortable(column.isSortable);
        });
      },
      /**
       * Validates the content of all columns in the table for a given variant.
       * @param dataVariant The variant object containing the expected values.
       */
      shouldShowTableContent(dataVariant: any) {
        tableColumns.forEach((column) => {
          switch (column.id) {
            case 'dbsnp':
              cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, 'anticon');
              break;
            case 'sources':
              cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, dataVariant[column.id]);
              cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, 'ant-tag-purple');
              break;
            case 'gene':
              cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, dataVariant[column.id]);
              cy.validateTableDataRowKeyAttr(dataVariant.dataRowKey, column.position, 'data-icon', 'plus');
              break;
            case 'consequence':
              cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, dataVariant.consequenceImpact);
              cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, dataVariant[column.id]);
              cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, dataVariant.aa_change);
              break;
            case 'mane':
              const rowSelector = dataVariant.dataRowKey !== "*" ? `tr[data-row-key="${dataVariant.dataRowKey}"] td` : 'tr[class*="ant-table-row"]:first td';
              cy.get(rowSelector).eq(column.position).find('path[d*="M12.1872"]').should(dataVariant.maneC ? 'exist' : 'not.exist');
              cy.get(rowSelector).eq(column.position).find('path[d*="0C5.37258"]').should(dataVariant.maneM ? 'exist' : 'not.exist');
              break;
            case 'omim':
              dataVariant[column.id].forEach((value: string | RegExp) => {
                cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, value);
              });
              cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, 'ant-tag-blue');
              break;
            case 'clinvar':
              dataVariant[column.id].forEach((value: string | RegExp) => {
                cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, value);
              });
              cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, 'ant-tag-green');
              break;
            case 'gnomad':
              cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, dataVariant[column.id]);
              cy.validateTableDataRowKeyClass(dataVariant.dataRowKey, column.position, 'gnomadIndicatorDefault');
              break;
            case 'gnomad_alt':
              cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, formatToK(dataVariant[column.id]));
              break;
            case 'participants':
              cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, dataVariant.partN);
              cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, dataVariant.partF);
              break;
            default:
              cy.validateTableDataRowKeyContent(dataVariant.dataRowKey, column.position, dataVariant[column.id]);
              break;
          };
        });
      },
      /**
       * Validates the sorting functionality of a column.
       * @param columnID The ID of the column to sort.
       * @param needIntercept Whether to use an intercept for the sorting action (default: true).
       * @param dataMinMax The object containing the expected min max values.
       */
      shouldSortColumn(columnID: string, dataMinMax: any, needIntercept: boolean = true) {
        cy.then(() => getColumnPosition(selectorHead, tableColumns, columnID).then((position) => {
          if (position !== -1 || !isFerlease()) { // -1 position can only occur in a Ferlease
            VariantsTable.actions.sortColumn(columnID, needIntercept);
            cy.validateTableFirstRow(dataMinMax[columnID].min, position, true);

            VariantsTable.actions.sortColumn(columnID);
            cy.validateTableFirstRow(dataMinMax[columnID].max, position, true);
          };
        }));
      },
    },
  };
