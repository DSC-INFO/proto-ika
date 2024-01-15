import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import useAppConfig from '../app-config/useAppConfig';
import Layout from '../layout/Layout';
import ConfigurationForm from '../../configurationForm';
import Main from '../../main';
import { User } from 'oidc-client-ts';

const App = () => {
  const [appConfig, setAppConfig] = useAppConfig();

  
  const handleConfigSubmit = (formData:any) => {
    console.log(formData)
    setAppConfig(formData as any)
  }
  
  if (appConfig) {
    
    const onSigninCallback = (_user: User | void): void => {
          window.history.replaceState(
             {},
              document.title,
             window.location.pathname
          )
    }
    
    // Handle application authentication
    const authProviderProps: AuthProviderProps = {
      authority: appConfig.authority,
      metadataUrl: appConfig.metadataUrl,
      client_id: appConfig.clientId,
      redirect_uri: global.window.location.toString(),
      onSigninCallback
    }
    return <AuthProvider {...authProviderProps}><Main>
      <Layout/></Main></AuthProvider>
  } else {
    console.log('AppConfig missing')
    // Display configuration form
    return (<ConfigurationForm onSubmit={handleConfigSubmit}/>
    )
  }
};

export default App;