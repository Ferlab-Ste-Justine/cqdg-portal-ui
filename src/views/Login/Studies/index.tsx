import intl from 'react-intl-universal';
import Studies from '@ferlab/ui/core/pages/LandingPage/Studies';

import CartageneLogo from 'components/assets/cartagene.svg';
import { IParticipantsPerStudy } from 'services/api/wrapper/models';
import { useGlobals } from 'store/global';

import styles from './index.module.css';

const studies = [
  { code: 'cartagene', logo: CartageneLogo, className: styles.cartagene, qaCode: 'STUDY1' },
  { code: 'dee', qaCode: 'T-DEE' },
  { code: 'bacq', qaCode: 'STUDY2' },
  { code: 'pragmatiq', qaCode: 'STUDY3' },
  { code: 'neurodev', qaCode: 'STUDY4' },
];

const formatStudies = (participantsPerStudies: IParticipantsPerStudy[]) =>
  studies.map((study) => ({
    code: study.code,
    title: study.logo ? (
      <img src={study.logo} alt={study.code + '-logo'} className={study.className || styles.logo} />
    ) : (
      intl.get(`screen.loginPage.studies.${study.code}.title`)
    ),
    subtitle: intl.get(`screen.loginPage.studies.${study.code}.subtitle`),
    description: intl.getHTML(`screen.loginPage.studies.${study.code}.description`),
    participantCount:
      participantsPerStudies.find((studyPart) => studyPart.study_code === study.code)
        ?.participant_count ||
      participantsPerStudies.find((studyPart) => studyPart.study_code === study.qaCode)
        ?.participant_count,
  }));

const StudiesSection = () => {
  const { stats } = useGlobals();
  const { participantsPerStudies = [], studies: studiesCount = 0 } = stats || {};

  const formattedStudies = formatStudies(participantsPerStudies);

  return (
    <div className={styles.container}>
      <Studies
        studiesCount={studiesCount}
        studies={formattedStudies}
        dictionary={{
          title: intl.get('screen.loginPage.studies.title'),
          summary: intl.get('screen.loginPage.studies.summary'),
        }}
      />
    </div>
  );
};

export default StudiesSection;
