import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { AppConfig, AppConfigForm, useAppConfig } from '../app-config'
import Layout from '../layout/Layout';
import Main from '../../main';
import { User } from 'oidc-client-ts';
import { useCallback } from 'react';

const App = () => {
  // Retrieve application config
  const [appConfig, setAppConfig] = useAppConfig();

  // Handle application config setup
  const handleConfigSubmit = useCallback((formData: AppConfig) => setAppConfig(formData), [setAppConfig])

  const onSigninCallback = useCallback((_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
  [])
  
  const forceShowConfigParameter = -1 !== window.location.search.indexOf('showConfig')

  // If the application config exists
  if (appConfig && !forceShowConfigParameter) {
    
    // Configure application authentication
    const authProviderProps: AuthProviderProps = {
      authority: appConfig.authority,
      metadataUrl: appConfig.metadataUrl,
      client_id: appConfig.clientId,
      redirect_uri: global.window.location.toString(),
      onSigninCallback,
      scope: "openid profile email alpha/read"
    }

    // Provide main layout
    return <AuthProvider {...authProviderProps}><Main>
      <Layout/></Main></AuthProvider>
  } else {
    // Display configuration form
    return <AppConfigForm appConfig={appConfig} onAppConfigChange={handleConfigSubmit}/>
  }
};

export default App;