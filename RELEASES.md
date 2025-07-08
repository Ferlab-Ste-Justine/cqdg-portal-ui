## VERSION 0.20.2 (2025-07-08)

### Features:
- [CQDG-842](https://ferlab-crsj.atlassian.net/browse/CQDG-842) Feature: [Data Exploration] Extracted the ontology NCIt term directly from the obo file
- [CQDG-895](https://ferlab-crsj.atlassian.net/browse/CQDG-895) Feature: [Studies] Added new fields to the Studies page
- [CQDG-1031](https://ferlab-crsj.atlassian.net/browse/CQDG-1031) Feature: [Program] Implemented a new program list with an entity page, and enhanced the existing Data Exploration and Studies pages with program-specific search criteria and columns.
- [CQDG-1035](https://ferlab-crsj.atlassian.net/browse/CQDG-1035) Feature: [Study] Added a total row at the bottom of the table
- [CQDG-1070](https://ferlab-crsj.atlassian.net/browse/CQDG-1070) Feature: [Data Exploration] Added Platform and Library Selection search facets
- [CQDG-1073](https://ferlab-crsj.atlassian.net/browse/CQDG-1073) Feature: [Data Exploration] Added the Family column in the patient table of the cohort builder

### Technical/ Other changes:
- [CQDG-446](https://ferlab-crsj.atlassian.net/browse/CQDG-446) Refactor:[Sitewide] Updated dependencies
- [CQDG-656](https://ferlab-crsj.atlassian.net/browse/CQDG-656) Refactor:[Theme] Updated tooltip colors
- [CQDG-667](https://ferlab-crsj.atlassian.net/browse/CQDG-667) Fix: [Data Exploration] Adjusted capitalization and word order for the "manifest" tooltip
- [CQDG-701](https://ferlab-crsj.atlassian.net/browse/CQDG-701) Fix: [Dashboard] Fixed a widget error out after a specific user interaction
- [CQDG-706](https://ferlab-crsj.atlassian.net/browse/CQDG-706) Fix: [Data Exploration] Fixed the legend of the "Participants by Ethnicity" graph in the Summary View where it overlaps with the chart
- [CQDG-772](https://ferlab-crsj.atlassian.net/browse/CQDG-772) Fix: [Saved Sets] Fixed mismatch between the message and the available features
- [CQDG-818](https://ferlab-crsj.atlassian.net/browse/CQDG-818) Fix: [Data Exploration] Fixed table deselection of rows in the files tab
- [CQDG-852](https://ferlab-crsj.atlassian.net/browse/CQDG-852) Fix: [File Entity] Fixed an incorrect value for Run Date
- [CQDG-949](https://ferlab-crsj.atlassian.net/browse/CQDG-949) Fix: [Data Exploration] Fixed the sort for the Data Access column
- [CQDG-958](https://ferlab-crsj.atlassian.net/browse/CQDG-958) Refactor: [Ferload] Updated the authentication URL to be display in full
- [CQDG-1011](https://ferlab-crsj.atlassian.net/browse/CQDG-1011) Fix: [Community] Fixed the applied filters when past page 1
- [CQDG-1026](https://ferlab-crsj.atlassian.net/browse/CQDG-1026) Refactor: [Landing & Study Entity] Updated logos for CAG study and RareQC program
- [CQDG-1029](https://ferlab-crsj.atlassian.net/browse/CQDG-1029) Fix: [Ferload] Fixed the download of files from a manifest
- [CQDG-1071](https://ferlab-crsj.atlassian.net/browse/CQDG-1071) Refactor: [File Entity] Added and removed fields in the file entity page
- [CQDG-1088](https://ferlab-crsj.atlassian.net/browse/CQDG-1088) Refactor: [Entity Study] Hid rows or sections that did not have values including summary section