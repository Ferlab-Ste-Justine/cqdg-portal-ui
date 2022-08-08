import { gql } from '@apollo/client';
import {
  clinvarFragment,
  consequencesFragment,
  frequenciesFragment,
  genesFragment,
  studiesVariantFragment,
} from 'graphql/variants/fragments';

export const SEARCH_VARIANT_QUERY = gql`
  query searchVariant($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    variants: Variant {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            variant_id: id
            score
            alternate
            chromosome
            genome_build
            hash
            hgvsg
            locus
            max_impact_score
            participant_frequency
            participant_number
            participant_number_visible
            participant_total_number
            reference
            release_id
            rsnumber
            start
            variant_class
            acls

            clinvar {
              ...clinvarFragment
            }
            studies {
              ...studiesVariantFragment
            }
            genes {
              ...genesFragment
            }
            frequencies {
              ...frequenciesFragment
            }
            consequences {
              ...consequencesFragment
            }

            #todo: mapping or types to fix:
            #gene_external_reference
            #external_study_ids
            #variant_external_reference
            #vep_impacts
            #zygosity
            #transmissions
          }
        }
      }
    }
  }
  ${frequenciesFragment}
  ${genesFragment}
  ${consequencesFragment}
  ${studiesVariantFragment}
  ${clinvarFragment}
`;

export const SEARCH_VARIANT_BY_ID_QUERY = gql`
  query searchVariantById($sqon: JSON) {
    Variant {
      hits(filters: $sqon) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
