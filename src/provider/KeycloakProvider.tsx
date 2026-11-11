import React, { ReactElement } from 'react';
import { AuthClientError, AuthClientEvent } from '@react-keycloak/core/';
import { ReactKeycloakProvider as KeycloakProvider } from '@react-keycloak/web';
import keycloak from 'auth/keycloak-api/keycloak';
import EnvVariables from 'helpers/EnvVariables';
import { KeycloakInitOptions } from 'keycloak-js';

export interface IProvider {
  children: React.ReactNode;
}

const initOptions: KeycloakInitOptions = {
  pkceMethod: 'S256',
};

const eventLogger = (eventType: AuthClientEvent, error?: AuthClientError) => {
  if (EnvVariables.configFor('ENV') === 'development' && error) {
    console.error('eventLogger ', 'eventType ', eventType);
    console.error('eventLogger ', error);
  }
};

const Keycloak = ({ children }: IProvider): ReactElement => (
  <KeycloakProvider authClient={keycloak} initOptions={initOptions} onEvent={eventLogger}>
    {children}
  </KeycloakProvider>
);

export default Keycloak;
