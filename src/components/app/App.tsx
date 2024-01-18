import Layout from '../layout/Layout';
import { useCallback } from 'react';
import { AppConfig, useAppConfig } from '../../lib';
import AppConfigForm from '../app-config/AppConfigForm';
import AuthenticatedSession from './AuthenticatedSession'

const App = () => {
  // Retrieve application config
  const [appConfig, setAppConfig] = useAppConfig();

  // Handle application config setup
  const handleConfigSubmit = useCallback((formData: AppConfig) => setAppConfig(formData), [setAppConfig])
  
  const showConfigParameterNotPresent = -1 === window.location.search.indexOf('showConfig')

  // If the application config exists
  if (appConfig && showConfigParameterNotPresent) {
    // Provide main layout
    return <AuthenticatedSession appConfig={appConfig}>
      <Layout/>
    </AuthenticatedSession>
  } else {
    // Display configuration form
    return <AppConfigForm appConfig={appConfig} onAppConfigChange={handleConfigSubmit}/>
  }
};
App.displayName = 'Ika'

export default App;