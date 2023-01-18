import { gql } from '@apollo/client';

export const GET_PARTICIPANTS = gql`
  query getParticipants($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Participant {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            participant_id
            score
            age_at_recruitment
            age_of_death
            cause_of_death
            ethnicity
            gender
            is_a_proband
            is_affected
            vital_status
            submitter_participant_id
            files {
              hits {
                total
                edges {
                  node {
                    file_id
                  }
                }
              }
            }
            biospecimens {
              hits {
                total
                edges {
                  node {
                    sample_id
                    biospecimen_id
                    sample_type
                    biospecimen_tissue_source
                    age_biospecimen_collection
                  }
                }
              }
            }
            study_code
            study {
              study_code
              name
              data_access_codes {
                access_limitations
                access_requirements
              }
              contact {
                type
                value
              }
            }
            icd_tagged {
              hits {
                edges {
                  node {
                    age_at_event
                    is_leaf
                    is_tagged
                    name
                    parents
                    internal_phenotype_id
                  }
                }
              }
            }
            mondo {
              hits {
                edges {
                  node {
                    score
                    age_at_event
                    is_leaf
                    is_tagged
                    name
                    parents
                  }
                }
              }
            }
            mondo_tagged {
              hits {
                edges {
                  node {
                    score
                    age_at_event
                    is_leaf
                    is_tagged
                    name
                    parents
                    internal_phenotype_id
                    source_text
                  }
                }
              }
            }
            observed_phenotypes {
              hits {
                total
                edges {
                  node {
                    id
                    score
                    age_at_event
                    is_leaf
                    is_tagged
                    name
                    parents
                  }
                }
              }
            }
            observed_phenotype_tagged {
              hits {
                total
                edges {
                  node {
                    id
                    score
                    age_at_event
                    internal_phenotype_id
                    is_leaf
                    is_tagged
                    name
                    parents
                    source_text
                  }
                }
              }
            }
            diagnoses {
              hits {
                total
                edges {
                  node {
                    fhir_id
                    diagnosis_ICD_code
                    diagnosis_mondo_code
                    diagnosis_source_text
                    age_at_diagnosis
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const MATCH_PARTICIPANTS = gql`
  query matchParticipants($sqon: JSON) {
    Participant {
      hits(filters: $sqon) {
        total
        edges {
          node {
            id
            participant_id
            study_code
          }
        }
      }
    }
  }
`;

export const GET_PARTICIPANTS_COUNT = gql`
  query getParticipantsCount($sqon: JSON) {
    Participant {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;

export const GET_PARTICIPANT_BY_ID = gql`
  query getParticipantById($sqon: JSON) {
    Participant {
      hits(filters: $sqon) {
        edges {
          node {
            id
            participant_id
          }
        }
      }
    }
  }
`;
