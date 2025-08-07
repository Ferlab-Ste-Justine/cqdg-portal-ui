import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  DownOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LoginOutlined,
  MailOutlined,
  ProfileOutlined,
  ReadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Dropdown, MenuProps, PageHeader, Space, Tag } from 'antd';
import EnvVariables, { getFTEnvVarByKey } from 'helpers/EnvVariables';

import { LANG, REDIRECT_URI_KEY } from 'common/constants';
import { AlterTypes } from 'common/types';
import CQDGLogo from 'components/assets/cqdg-logo.svg';
import NotificationBanner from 'components/featureToggle/NotificationBanner';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import useQueryParams from 'hooks/useQueryParams';
import { globalActions, useLang } from 'store/global';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { updateUser } from 'store/user/thunks';
import { getDocLang } from 'utils/doc';
import { STATIC_ROUTES } from 'utils/routes';

import HeaderButton from './HeaderButton';
import LoginModal from './LoginModal';

import styles from './index.module.css';

const iconSize = { width: 14, height: 14 };
const FT_FLAG_KEY = 'SITE_WIDE_BANNER';
const BANNER_TYPE_KEY = FT_FLAG_KEY + '_TYPE';
const BANNER_MSG_KEY = FT_FLAG_KEY + '_MSG';

export const getTargetLang = (lang: LANG) => (lang === LANG.FR ? LANG.EN : LANG.FR);

const PublicHeader = () => {
  const lang = useLang();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const location = useLocation();
  const currentPathName = location.pathname;
  const query = useQueryParams();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [redirectUri, setRedirectUri] = useState<string>();

  const isProgramsEnabled: boolean = EnvVariables.configFor('PROGRAMS_PAGES_ENABLED') === 'true';

  const handleChangeLang = () => {
    const targetLang = getTargetLang(lang);

    dispatch(
      updateUser({
        data: {
          locale: targetLang,
        },
      }),
    );
    dispatch(globalActions.changeLang(targetLang));
  };

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${
        query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.STUDIES
      }`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };

  const resourcesMenu: MenuProps = {
    items: [
      {
        key: 'dictionary',
        label: (
          <ExternalLink
            href={EnvVariables.configFor('CQDG_DICTIONARY')}
            data-cy="HeaderLink_Dictionary"
          >
            <Space>
              <ExternalLinkIcon {...iconSize} />
              {intl.get('layout.main.menu.dictionary')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        key: 'documentation',
        label: (
          <ExternalLink
            href={EnvVariables.configFor('CQDG_DOCUMENTATION') + getDocLang()}
            data-cy="HeaderLink_Documentation"
          >
            <Space>
              <ExternalLinkIcon {...iconSize} />
              {intl.get('layout.main.menu.documentation')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        key: 'downloadTool',
        label: (
          <ExternalLink
            href={EnvVariables.configFor('FERLOAD_GITHUB_URL')}
            data-cy="HeaderLink_DownloadTool"
          >
            <Space>
              <ExternalLinkIcon {...iconSize} />
              {intl.get('layout.main.menu.downloadTool')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        key: 'cqdg-website',
        label: (
          <ExternalLink href={EnvVariables.configFor('CQDG_WEB_SITE')} data-cy="HeaderLink_Website">
            <Space>
              <ExternalLinkIcon {...iconSize} />
              {intl.get('layout.main.menu.website')}
            </Space>
          </ExternalLink>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: 'contact',
        label: (
          <ExternalLink href={`mailto:${SUPPORT_EMAIL}`} data-cy="HeaderLink_Contact">
            <Space>
              <MailOutlined {...iconSize} />
              {intl.get('layout.main.menu.contact')}
            </Space>
          </ExternalLink>
        ),
      },
    ],
  };

  return (
    <>
      <NotificationBanner
        className={styles.siteWideBanner}
        featureToggleKey={FT_FLAG_KEY}
        type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, 'warning')}
        message={getFTEnvVarByKey(BANNER_MSG_KEY)}
        banner
        closable
      />
      <PageHeader
        className={styles.mainHeader}
        title={
          <div className={styles.headerNavList}>
            <img src={CQDGLogo} className={styles.logo} />
            {EnvVariables.configFor('IS_BETA') === 'true' && (
              <Tag color="blue" className={styles.tagBeta}>
                Beta
              </Tag>
            )}
            <nav className={styles.headerNavList}>
              <HeaderButton
                to={STATIC_ROUTES.STUDIES}
                icon={<ReadOutlined />}
                title={intl.get('layout.main.menu.studies')}
                currentPathName={currentPathName}
              />
              {isProgramsEnabled && (
                <HeaderButton
                  to={STATIC_ROUTES.PROGRAMS}
                  icon={<ProfileOutlined />}
                  title={intl.get('layout.main.menu.programs')}
                  currentPathName={currentPathName}
                  onClick={() => {
                    setOpenLoginModal(true);
                    setRedirectUri(STATIC_ROUTES.PROGRAMS);
                  }}
                />
              )}
              <HeaderButton
                to={STATIC_ROUTES.DATA_EXPLORATION}
                icon={<FileSearchOutlined />}
                title={intl.get('layout.main.menu.explore')}
                currentPathName={currentPathName}
                onClick={() => {
                  setOpenLoginModal(true);
                  setRedirectUri(STATIC_ROUTES.DATA_EXPLORATION);
                }}
              />
              <HeaderButton
                to={[STATIC_ROUTES.VARIANTS]}
                icon={<LineStyleIcon height={16} width={16} className={styles.iconSvg} />}
                title={intl.get('layout.main.menu.variants')}
                currentPathName={currentPathName}
                onClick={() => {
                  setOpenLoginModal(true);
                  setRedirectUri(STATIC_ROUTES.VARIANTS);
                }}
              />
              <HeaderButton
                to={STATIC_ROUTES.DASHBOARD}
                icon={<HomeOutlined />}
                title={intl.get('layout.main.menu.dashboard')}
                currentPathName={currentPathName}
                onClick={() => {
                  setOpenLoginModal(true);
                  setRedirectUri(STATIC_ROUTES.DASHBOARD);
                }}
              />
            </nav>
          </div>
        }
        extra={
          <Space size={16}>
            <HeaderButton
              currentPathName={currentPathName}
              to={STATIC_ROUTES.COMMUNITY}
              icon={<TeamOutlined />}
              title={intl.get('layout.main.menu.community')}
              onClick={() => {
                setOpenLoginModal(true);
                setRedirectUri(STATIC_ROUTES.COMMUNITY);
              }}
            />
            <Dropdown trigger={['click']} menu={resourcesMenu}>
              <div className={styles.menuTrigger}>
                <span className={styles.userName} data-cy="Resources">
                  {intl.get('layout.main.menu.resources')}
                </span>
                <DownOutlined />
              </div>
            </Dropdown>
            <div className={styles.separator} />
            <Button icon={<LoginOutlined />} onClick={handleSignin} type="text">
              {intl.get('screen.loginPage.login')}
            </Button>
            <Button onClick={handleSignin} type="primary">
              {intl.get('screen.loginPage.signup')}
            </Button>
            <Button
              shape="circle"
              className={styles.langButton}
              onClick={handleChangeLang}
              data-cy={`LangButton_${getTargetLang(lang).toUpperCase()}`}
            >
              {getTargetLang(lang).toUpperCase()}
            </Button>
          </Space>
        }
      />
      {openLoginModal && (
        <LoginModal
          isOpen={openLoginModal}
          onClose={() => setOpenLoginModal(false)}
          redirectUri={redirectUri}
        />
      )}
    </>
  );
};

export default PublicHeader;
