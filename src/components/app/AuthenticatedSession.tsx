import { PropsWithChildren, useEffect, useState } from "react";
import { AppConfig } from '../../lib'
import { AuthProvider, AuthProviderProps, hasAuthParams, useAuth } from "react-oidc-context";
import { User } from "oidc-client-ts";

interface AuthenticatedSessionConfig {
    appConfig: AppConfig
}

function AutoAuthenticator(props: PropsWithChildren) {
    const auth = useAuth();
    const [hasTriedSignin, setHasTriedSignin] = useState(false);

    // automatically sign-in
    useEffect(() => {
        if (!hasAuthParams() &&
            !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading &&
            !hasTriedSignin
        ) {
            auth.signinRedirect();
            setHasTriedSignin(true);
        }
    }, [auth, hasTriedSignin]);

    if (auth.isLoading) {
        return <div>Signing you in/out...</div>;
    }

    if (!auth.isAuthenticated) {
        return <div>Unable to log in</div>;
    }

    return <>{props.children}</>;
}

function AuthenticatedSession({ appConfig, children }: PropsWithChildren<AuthenticatedSessionConfig>) {
    
    const onSigninCallback = (_user: User | void): void => {
        window.history.replaceState({}, document.title, window.location.pathname)
    }
    
    // Configure application authentication
    const authProviderProps: AuthProviderProps = {
        authority: appConfig.authority,
        metadataUrl: appConfig.metadataUrl,
        client_id: appConfig.clientId,
        redirect_uri: global.window.location.toString(),
        onSigninCallback,
        scope: "openid profile email alpha/read"
    }
    
    return <AuthProvider {...authProviderProps}>
        <AutoAuthenticator>
            {children}
        </AutoAuthenticator>
    </AuthProvider>
}

export default AuthenticatedSession