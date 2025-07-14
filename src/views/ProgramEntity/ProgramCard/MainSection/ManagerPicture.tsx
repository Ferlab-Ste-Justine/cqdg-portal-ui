import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import EnvVariables from 'helpers/EnvVariables';

import styles from './index.module.css';

const ManagerPicture = ({ pictureUrl }: { pictureUrl?: string }) => {
  const [hasError, setHasError] = useState(false);

  if (!pictureUrl || hasError) {
    return <UserOutlined className={styles.defaultPicture} />;
  }

  return (
    <img
      src={EnvVariables.configFor('S3_ASSETS_URL') + pictureUrl}
      className={styles.managerPicture}
      onError={() => setHasError(true)}
      alt="ManagerPicture"
    />
  );
};

export default ManagerPicture;
