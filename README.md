<p align="center">
  <img src="public/ferlab.png" alt="ferlab repository img" width="180px" />
</p>
<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge"></a>
</p>

# cqdg-portal-ui

The Quebec Genomic Data Center is a data harmonization and sharing platform for genomic datasets produced by Quebec's clinical and research studies

## Pre-requisites

- node 18+
- npm 10+

## Get Started

### Environment variables:

- Create a `.env` with the scheme found here: https://github.com/Ferlab-Ste-Justine/cqdg-portal-ui/blob/main/.env.schema
- Make sure to fill all the variables

#### Starting the project

- Install dependencies: `npm install`
- Install theme: `npm run theme`
- Start the project: `npm run start`

## Tests

### Unit tests (Jest)

- `npm test`: watch mode, reruns the tests related to your changes on save (press `a` to run all)
- `npm run test:github`: single run, as in CI
- `npm run test:github -- --verbose`: lists every test case

Test files sit next to the code they test (`foo.ts` → `foo.test.ts`). They use fictitious data and need
no backend, Keycloak or QA environment: GraphQL responses are mocked with Apollo `MockedProvider`.

Tested use cases:

| Use case                                                                           | What is verified                                                                                                                         | Test file                                              |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Browse research programs                                                           | One card per program; sorted by number of studies, then participants, then name; ties keep the API order; logo, link and French names    | `src/views/Programs/index.test.tsx`                    |
| Filter data across entities (participants, files, biospecimens, studies, variants) | A filter set on one entity is translated to the fields of the entity being queried; nested and/or/not; unexpected filters handled safely | `src/utils/fieldMapper.test.ts`                        |
| Combine saved queries in the query builder (e.g. Q1 AND Q2)                        | References are replaced by the queries they point to; an empty query is returned while queries load or when a reference is invalid       | `src/utils/query.test.ts`                              |
| Show study contacts                                                                | Names, emails and institutions are paired into one contact each; emails rendered as mailto links; unequal or missing values handled      | `src/views/StudyEntity/utils/combineContacts.test.tsx` |
| Display multi-valued fields (dictionary 6.0)                                       | Values linked by position are paired as "A (B)"; older single-value documents still render                                               | `src/utils/indexLinkedArrays.test.ts`                  |
| Export table data                                                                  | Columns holding lists of objects get the right JSON path in exports                                                                      | `src/store/report/exportColumns.test.ts`               |
| Display file sizes                                                                 | Bytes, KB and MB inputs formatted in base 10; missing or invalid sizes shown as 0 B                                                      | `src/utils/formatFileSize.test.ts`                     |
| Display variant frequencies                                                        | Scientific notation and "n / total" quotients; default value when a value is missing or the total is 0                                   | `src/utils/helper.test.ts`                             |
| Sort data tables                                                                   | antd sort (single or multi-column) converted to the API sort                                                                             | `src/utils/helper.test.ts`                             |
| Order dashboard cards                                                              | Cards follow the order saved in the user config                                                                                          | `src/utils/helper.test.ts`                             |
| Show data access contacts as email links                                           | Valid email addresses are recognized                                                                                                     | `src/utils/helper.test.ts`                             |
| Save user preferences                                                              | The stored config is deeply merged with the updated part; arrays are replaced                                                            | `src/utils/object.test.ts`                             |

When adding a test file, add its use case to this table.

### End-to-end tests (Cypress)

Specs are in `cypress/e2e/`, grouped by feature (Consultation, Facettes, Telechargement…). They run nightly
against the QA portal (see `cypress.config.ts` and `ci/pipeline.yml`).
