import React from 'react';
import { useLocation } from 'react-router-dom';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { useKeycloak } from '@react-keycloak/web';
import { Layout as AntLayout } from 'antd';

import { MAIN_SCROLL_WRAPPER_ID } from 'common/constants';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import PublicHeader from 'components/Layout/PublicHeader';
import { PUBLIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const location = useLocation();
  const isPublicRoute = PUBLIC_ROUTES.some((route) => location.pathname.includes(route));
  const { keycloak } = useKeycloak();
  const isAuthenticated = keycloak.authenticated;
  const usePublicHeader = isPublicRoute && !isAuthenticated;

  return (
    <AntLayout className={styles.mainLayout}>
      {usePublicHeader ? <PublicHeader /> : <Header />}
      <ScrollContent id={MAIN_SCROLL_WRAPPER_ID} className={styles.mainContent}>
        <div id="content">{children}</div>
      </ScrollContent>
      <Footer />
    </AntLayout>
  );
};

export default Layout;
