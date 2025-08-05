import intl from 'react-intl-universal';
import { CloseOutlined } from '@ant-design/icons';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Modal, Space } from 'antd';

import { REDIRECT_URI_KEY } from 'common/constants';
import CQDGLogoFull from 'components/Icons/CQDGLogoFull';
import useQueryParams from 'hooks/useQueryParams';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  redirectUri?: string;
};

const LoginModal = ({ isOpen, onClose, redirectUri }: LoginModalProps) => {
  const { keycloak } = useKeycloak();
  const query = useQueryParams();

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${
        redirectUri || query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.DASHBOARD
      }`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };

  return (
    <Modal
      closable
      closeIcon={
        <div className={styles.closeBtn}>
          <CloseOutlined className={styles.closeIcon} />
          {intl.get('global.close')}
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className={styles.modal}
    >
      <div className={styles.contentWrapper}>
        <CQDGLogoFull className={styles.logo} />
        <div className={styles.title}>{intl.get('screen.loginPage.title')}</div>
        <div className={styles.description}>{intl.get('screen.loginPage.resume')}</div>
        <Space size={8}>
          <Button ghost type="primary" size="large" onClick={handleSignin}>
            {intl.get('screen.loginPage.login')}
          </Button>
          <Button ghost type="default" size="large" onClick={handleSignin}>
            {intl.get('screen.loginPage.signup')}
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default LoginModal;
