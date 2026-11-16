import intl from 'react-intl-universal';
import ColorTag, { ColorTagType } from '@ferlab/ui/core/components/ColorTag/index';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { ageCategories, IParticipantEntity } from 'graphql/participants/models';
import startCase from 'lodash/startCase';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import { normalizeSexGender } from '../../DataExploration/utils/helper';

import styles from 'views/FileEntity/index.module.css';

// A living participant can't have death data: any value received is ignored
// so the profile never shows a stray age or cause of death.
export const isAlive = (vitalStatus?: string): boolean =>
  vitalStatus?.trim().toLowerCase() === 'alive';

const getProfileDescriptions = (participant?: IParticipantEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.participant.sex'),
    value: (
      <ColorTag type={ColorTagType.Gender} value={normalizeSexGender(participant?.sex || '')}>
        {startCase(participant?.sex)}
      </ColorTag>
    ),
  },
  {
    label: intl.get('entities.participant.gender'),
    value: participant?.gender?.display || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.participant.race'),
    value: participant?.race?.display || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.participant.raceOther'),
    value: participant?.race?.another_category || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.participant.age_at_recruitment'),
    value: (() => {
      const category = ageCategories.find((cat) => cat.key === participant?.age_at_recruitment);
      if (!category) return TABLE_EMPTY_PLACE_HOLDER;
      return `${category.label} (${category.tooltip})`;
    })(),
  },
  {
    label: intl.get('entities.participant.vital_status'),
    value: (
      <Tag color="red" className={styles.tag}>
        {participant?.vital_status || TABLE_EMPTY_PLACE_HOLDER}
      </Tag>
    ),
  },
  {
    label: intl.get('entities.participant.age_of_death'),
    value: (() => {
      if (isAlive(participant?.vital_status)) return TABLE_EMPTY_PLACE_HOLDER;
      const category = ageCategories.find((cat) => cat.key === participant?.age_of_death);
      if (!category) return TABLE_EMPTY_PLACE_HOLDER;
      return `${category.label} (${category.tooltip})`;
    })(),
  },
  {
    label: intl.get('entities.participant.cause_of_death'),
    value: isAlive(participant?.vital_status)
      ? TABLE_EMPTY_PLACE_HOLDER
      : participant?.cause_of_death || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getProfileDescriptions;
