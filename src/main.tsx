'use client'
import React, { PropsWithChildren } from "react";
import { useAuth, hasAuthParams } from "react-oidc-context";

export default function Main(props: PropsWithChildren) {
    const auth = useAuth();
    const [hasTriedSignin, setHasTriedSignin] = React.useState(false);

    console.log("Auth Rendering", auth)

    // automatically sign-in
    React.useEffect(() => {
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