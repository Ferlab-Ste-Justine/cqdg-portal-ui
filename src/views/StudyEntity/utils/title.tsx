import React from 'react';
import StudySpotIcon from '@ferlab/ui/core/components/Icons/FuturoSpot/StudySpotIcon';

import CartageneLogo from 'components/assets/cartagene.svg';

import style from '../index.module.css';

export const getLogoByStudyCode = (studyCode?: string): React.ReactNode => {
  switch (studyCode) {
    case 'CAG':
      return <img src={CartageneLogo} alt={studyCode} className={style.cagLogo} />;
    default:
      return (
        <StudySpotIcon
          className={style.titleIcon}
          height={54}
          spotClassName={style.spotIcon}
          width={54}
        />
      );
  }
};
