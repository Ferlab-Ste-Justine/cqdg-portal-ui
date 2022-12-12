import { gql } from '@apollo/client';

export const GET_BIOSPECIMENS = gql`
  query getBiospecimens($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    Biospecimen {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            biospecimen_id
            age_biospecimen_collection
            biospecimen_tissue_source
            release_id
            study_id
            participant {
              participant_id
            }

            sample_type
            sample_id
            submitter_biospecimen_id
            submitter_sample_id

            files {
              hits {
                total
                edges {
                  node {
                    file_size
                    file_name
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

export const MATCH_BIOSPECIMENS = gql`
  query matchBiospecimens($sqon: JSON, $first: Int, $offset: Int) {
    Biospecimen {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            study_id
            biospecimen_id
            sample_id
          }
        }
      }
    }
  }
`;

export const BIOSPECIMEN_SEARCH_BY_ID_QUERY = gql`
  query getBiospecimenById($sqon: JSON) {
    Biospecimen {
      hits(filters: $sqon) {
        edges {
          node {
            biospecimen_id
            sample_id
          }
        }
      }
    }
  }
`;
