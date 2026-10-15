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

### Use cases

Use cases are grouped by section of the portal, in the order of the main menu. Status:
✅ tested, ⚠️ tested with a known bug (see the skipped test and its ticket), ⬜ to do.
The to-do list is not exhaustive.

#### Studies & Programs

Public catalog of the data hosted by the CQDG. The **Studies** page lists the studies (pediatric and adult
populations) with their main characteristics; each study page shows its summary, contacts, datasets and
files. The **Programs** page lists the research programs that group several studies, with their partners.

| Status | Use case                   | What is verified                                                                                                                      | Test file                                              |
| ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| ✅     | Browse research programs   | One card per program; sorted by number of studies, then participants, then name; ties keep the API order; logo, link and French names | `src/views/Programs/index.test.tsx`                    |
| ✅     | Show study contacts        | Names, emails and institutions are paired into one contact each; emails rendered as mailto links; unequal or missing values handled   | `src/views/StudyEntity/utils/combineContacts.test.tsx` |
| ✅     | Filter the study directory | Saved queries combined in the query builder are resolved (also used by Data Explorer, see below)                                      | `src/utils/query.test.ts`                              |
| ⬜     | View a program page        | Program details, managers, partners and its studies                                                                                   |                                                        |
| ⬜     | View a study page          | Summary, datasets and files of a study                                                                                                |                                                        |

#### Data Explorer

Main research tool, for logged-in users. Build a virtual cohort by combining filters (facets) in the query
builder, then browse the matching participants, biospecimens and data files in tables, or as summary
charts. The cohort can be saved as a set, its files downloaded as a manifest and its data exported. Each
participant and file has its own page.

| Status | Use case                                    | What is verified                                                                                                                         | Test file                                |
| ------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| ✅     | Filter data across entities                 | A filter set on one entity is translated to the fields of the entity being queried; nested and/or/not; unexpected filters handled safely | `src/utils/fieldMapper.test.ts`          |
| ✅     | Combine saved queries (e.g. Q1 AND Q2)      | References are replaced by the queries they point to; an empty query is returned while queries load or when a reference is invalid       | `src/utils/query.test.ts`                |
| ⚠️     | Sort data tables                            | antd sort (single or multi-column) converted to the API sort. Known bug: CQDG-1602                                                       | `src/utils/helper.test.ts`               |
| ✅     | Export table data                           | Columns holding lists of objects get the right JSON path in exports                                                                      | `src/store/report/exportColumns.test.ts` |
| ✅     | Display file sizes                          | Bytes, KB and MB inputs formatted in base 10; missing or invalid sizes shown as 0 B                                                      | `src/utils/formatFileSize.test.ts`       |
| ⬜     | Save and manage sets of participants, files | Create, rename, update and delete a set                                                                                                  |                                          |
| ⬜     | Upload a list of IDs                        | Matched and unmatched IDs from a pasted or uploaded list                                                                                 |                                          |
| ⬜     | Download a file manifest                    | Manifest built from the selected files                                                                                                   |                                          |
| ⬜     | View a participant or file page             | Summary, biospecimens, diagnoses, phenotypes, family and files                                                                           |                                          |

#### Variants

Germline variant database: explore and filter the germline variants from the genomes and exomes of the
CQDG participants (gene, consequence, frequency, pathogenicity). Each variant has its own page with its
frequencies per study and its predicted consequences.

| Status | Use case                    | What is verified                                                                                                             | Test file                  |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| ⚠️     | Display variant frequencies | Scientific notation and "n / total" quotients; default value when a value is missing or the total is 0. Known bug: CQDG-1604 | `src/utils/helper.test.ts` |
| ⬜     | Search variants by gene     | Gene search and gene list upload                                                                                             |                            |

#### Dashboard & user preferences

Personal home page after login: links to Data Explorer, and the user's saved filters and saved sets. Cards
can be reordered; the order and other preferences (e.g. table columns) are saved in the user profile.

| Status | Use case              | What is verified                                                                                    | Test file                  |
| ------ | --------------------- | --------------------------------------------------------------------------------------------------- | -------------------------- |
| ⚠️     | Order dashboard cards | Cards follow the order saved in the user config. Known bug: CQDG-1605                               | `src/utils/helper.test.ts` |
| ⚠️     | Save user preferences | The stored config is deeply merged with the updated part; arrays are replaced. Known bug: CQDG-1606 | `src/utils/object.test.ts` |
| ⬜     | Manage saved filters  | Open, rename and delete a saved filter                                                              |                            |

#### Analysis

Analysis tools on saved sets. **Set operations** compares virtual cohorts saved as sets with an
interactive Venn diagram, and saves the intersection or union as a new set.

| Status | Use case            | What is verified                                                | Test file |
| ------ | ------------------- | --------------------------------------------------------------- | --------- |
| ⬜     | Compare sets (Venn) | Loading, success and error states; filters sent for each entity |           |

#### Community

Directory of the CQDG members, searchable by name or affiliation and filterable by role, data use and
research domain.

| Status | Use case               | What is verified                      | Test file |
| ------ | ---------------------- | ------------------------------------- | --------- |
| ⬜     | Find community members | Search and filters on the member list |           |

#### Shared across pages

| Status | Use case                                     | What is verified                                                                                                 | Test file                             |
| ------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| ✅     | Display multi-valued fields (dictionary 6.0) | Values linked by position are paired as "A (B)"; older single-value documents still render                       | `src/utils/indexLinkedArrays.test.ts` |
| ⚠️     | Show contacts as email links                 | Valid email addresses are recognized (data access contacts on study and participant pages). Known bug: CQDG-1603 | `src/utils/helper.test.ts`            |

When adding a test, add or update its use case in the matching section.

Tests marked with `.skip` describe the expected behavior for a known bug. Each one references its Jira
ticket in a comment; remove `.skip` when the bug is fixed.

### End-to-end tests (Cypress)

Specs are in `cypress/e2e/`, grouped by feature (Consultation, Facettes, Telechargement…). They run nightly
against the QA portal (see `cypress.config.ts` and `ci/pipeline.yml`).
