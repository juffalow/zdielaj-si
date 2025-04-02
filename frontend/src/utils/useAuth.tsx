import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import {
  signUp as signUpAmplify,
  confirmSignUp as confirmSignUpAmplify,
  signIn as signInAmplify,
  signOut as signOutAmplify,
  resetPassword as resetPasswordAmplify,
  confirmResetPassword as confirmResetPasswordAmplify,
  fetchAuthSession as fetchAuthSessionAmplify,
  fetchUserAttributes as fetchUserAttributesAmplify,
} from 'aws-amplify/auth';
import { setUserToken } from '../api/token';

interface AuthContextType {
  user?: User;
  hasInitialized: boolean;
  loading: boolean;
  error?: Error;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  confirmSignUp: (username: string, password: string) => Promise<void>;
  resetPassword: (username: string) => Promise<void>;
  confirmResetPassword: (username: string, code: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_USER_POOL_ID as string,
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID as string,
      loginWith: {
        email: true,
      },
      userAttributes: {
        email: {
          required: true,
        },
      },
      signUpVerificationMethod: 'code',
    },
  },
});

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [ user, setUser ] = useState<User>();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ hasInitialized, setHasInitialized ] = useState<boolean>(false);

  useEffect(() => {
    Promise.all([ fetchUserAttributesAmplify(), fetchAuthSessionAmplify() ])
      .then(([user, session]) => {
        setUser({
          id: user.sub,
          username: user.email,
          email: user.email,
          meta: {
            name: user.name as string,
          },
          accessToken: session.tokens?.accessToken.toString() as string,
        });

        setUserToken(session.tokens?.accessToken.toString() as string);
      })
      .catch(() => {
        setUser(undefined);
        setUserToken(null);
      })
      .finally(() => {
        setHasInitialized(true);
      });
  }, []);

  function signIn(username: string, password: string): Promise<void> {
    setLoading(true);

    return signInAmplify({ username, password })
      .then((response) => {
        console.log(response);
      })
      .then(() => Promise.all([ fetchUserAttributesAmplify(), fetchAuthSessionAmplify() ]))
      .then(([user, session]) => {
        setUser({
          id: user.sub,
          username: user.email,
          email: user.email,
          meta: {
            name: user.name as string,
          },
          accessToken: session.tokens?.accessToken.toString() as string,
        });

        setUserToken(session.tokens?.accessToken.toString() as string);
      })
      .catch((error) => {
        console.error('signIn error', error);
      })
      .finally(() => setLoading(false));
  }

  function signUp(name: string, email: string, password: string): Promise<void> {
    setLoading(true);

    return signUpAmplify({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
      },
    }).then((response) => console.log(response)).finally(() => setLoading(false));
  }

  function confirmSignUp(username: string, code: string): Promise<void> {
    return confirmSignUpAmplify({
      username,
      confirmationCode: code,
    }).then((response => console.log(response)));
  }

  function resetPassword(username: string): Promise<void> {
    return resetPasswordAmplify({
      username,
    }).then((response) => console.log(response));
  }

  function confirmResetPassword(username: string, code: string, password: string): Promise<void> {
    return confirmResetPasswordAmplify({
      username,
      confirmationCode: code,
      newPassword: password,
    }).then((response) => console.log(response));
  }

  function signOut(): Promise<void> {
    return signOutAmplify().then(() => setUser(undefined)).then(() => setUserToken(null));
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      hasInitialized,
      loading,
      signIn,
      signUp,
      confirmSignUp,
      resetPassword,
      confirmResetPassword,
      signOut,
    }),
    [ user, loading, hasInitialized ]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>
      { children }
    </AuthContext.Provider>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.hasInitialized === false) {
    return null;
  }

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/prihlasit-sa" state={{ from: location }} replace />;
  }

  return children;
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}