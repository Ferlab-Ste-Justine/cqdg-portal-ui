import { Navigate, Route, Routes } from 'react-router-dom';
import Empty from '@ferlab/ui/core/components/Empty';
import loadable from '@loadable/component';
import { useKeycloak } from '@react-keycloak/web';
import { ConfigProvider } from 'antd';
import enUSAntd from 'antd/lib/locale/en_US';
import frFRAntd from 'antd/lib/locale/fr_FR';
import { setDefaultOptions } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import AuthMiddleware from 'middleware/AuthMiddleware';
import ProtectedRoute from 'ProtectedRoute';
import ApolloProvider from 'provider/ApolloProvider';
import ContextProvider from 'provider/ContextProvider';
import ErrorPage from 'views/Error';
import Login from 'views/Login';

import { LANG } from 'common/constants';
import ErrorBoundary from 'components/ErrorBoundary';
import PageLayout from 'components/Layout';
import Spinner from 'components/uiKit/Spinner';
import NotificationContextHolder from 'components/utils/NotificationContextHolder';
import { useLang } from 'store/global';
import { DYNAMIC_ROUTES, STATIC_ROUTES } from 'utils/routes';

import EnvVariables from './helpers/EnvVariables';

const loadableProps = { fallback: <Spinner size="large" /> };
const Dashboard = loadable(() => import('views/Dashboard'), loadableProps);
const Studies = loadable(() => import('views/Studies'), loadableProps);
const Settings = loadable(() => import('views/Settings'), loadableProps);
const DataExploration = loadable(() => import('views/DataExploration'), loadableProps);
const Variants = loadable(() => import('views/Variants'), loadableProps);
const VariantEntity = loadable(() => import('views/VariantEntity'), loadableProps);
const FileEntity = loadable(() => import('views/FileEntity'), loadableProps);
const ParticipantEntity = loadable(() => import('views/ParticipantEntity'), loadableProps);
const ProfileSettings = loadable(() => import('views/ProfileSettings'), loadableProps);
const Community = loadable(() => import('views/Community'), loadableProps);
const CommunityMember = loadable(() => import('views/Community/Member'), loadableProps);
const StudyEntity = loadable(() => import('views/StudyEntity'), loadableProps);
const Programs = loadable(() => import('views/Programs'), loadableProps);
const ProgramEntity = loadable(() => import('views/ProgramEntity'), loadableProps);
const Analytics = loadable(() => import('views/Analytics'), loadableProps);
const SetOperations = loadable(() => import('views/Analytics/SetOperations'), loadableProps);

const App = () => {
  const lang = useLang();
  const { keycloak, initialized } = useKeycloak();
  const keycloakIsReady = keycloak && initialized;
  setDefaultOptions({ locale: lang === LANG.FR ? fr : enUS });
  const isProgramsEnabled: boolean = EnvVariables.configFor('PROGRAMS_PAGES_ENABLED') === 'true';
  const isAnalyticsEnabled: boolean = EnvVariables.configFor('ANALYTICS_PAGE_ENABLED') === 'true';

  return (
    <ConfigProvider
      locale={lang === LANG.FR ? frFRAntd : enUSAntd}
      renderEmpty={() => <Empty imageType="grid" />}
    >
      <ApolloProvider>
        <div className="appContainer">
          {keycloakIsReady ? (
            <AuthMiddleware>
              <>
                <Routes>
                  <Route path={STATIC_ROUTES.LOGIN} element={<Login />} />
                  <Route path={DYNAMIC_ROUTES.ERROR} element={<ErrorPage />} />
                  <Route
                    path={STATIC_ROUTES.DASHBOARD}
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={STATIC_ROUTES.COMMUNITY}
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.COMMUNITY_MEMBER}
                    element={
                      <ProtectedRoute>
                        <CommunityMember />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={STATIC_ROUTES.PROFILE_SETTINGS}
                    element={
                      <ProtectedRoute>
                        <ProfileSettings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={STATIC_ROUTES.SETTINGS}
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={STATIC_ROUTES.STUDIES}
                    element={
                      <PageLayout>
                        <Studies />
                      </PageLayout>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.DATA_EXPLORATION}
                    element={
                      <ProtectedRoute>
                        <DataExploration />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.PARTICIPANT_ENTITY}
                    element={
                      <ProtectedRoute>
                        <ParticipantEntity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={STATIC_ROUTES.VARIANTS}
                    element={
                      <ProtectedRoute>
                        <Variants />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.VARIANT_ENTITY}
                    element={
                      <ProtectedRoute>
                        <VariantEntity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.FILE_ENTITY}
                    element={
                      <ProtectedRoute>
                        <FileEntity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={DYNAMIC_ROUTES.STUDY_ENTITY}
                    element={
                      <PageLayout>
                        <StudyEntity />
                      </PageLayout>
                    }
                  />
                  {isProgramsEnabled && (
                    <Route
                      path={STATIC_ROUTES.PROGRAMS}
                      element={
                        <PageLayout>
                          <Programs />
                        </PageLayout>
                      }
                    />
                  )}
                  {isProgramsEnabled && (
                    <Route
                      path={DYNAMIC_ROUTES.PROGRAM_ENTITY}
                      element={
                        <PageLayout>
                          <ProgramEntity />
                        </PageLayout>
                      }
                    />
                  )}
                  {isAnalyticsEnabled && (
                    <>
                      <Route
                        path={STATIC_ROUTES.ANALYTICS}
                        element={
                          <ProtectedRoute>
                            <Analytics />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path={STATIC_ROUTES.ANALYTICS_SET_OPERATIONS}
                        element={
                          <ProtectedRoute>
                            <SetOperations />
                          </ProtectedRoute>
                        }
                      />
                    </>
                  )}
                  <Route path="*" element={<Navigate to={STATIC_ROUTES.LOGIN} />} />
                </Routes>
                <NotificationContextHolder />
              </>
            </AuthMiddleware>
          ) : (
            <Spinner size={'large'} />
          )}
        </div>
      </ApolloProvider>
    </ConfigProvider>
  );
};

const EnhanceApp = () => (
  <ErrorBoundary>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ErrorBoundary>
);

export default EnhanceApp;
