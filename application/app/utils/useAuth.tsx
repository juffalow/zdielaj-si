import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
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
  updatePassword as updatePasswordAmplify,
} from 'aws-amplify/auth';
import { getUser, setUser } from '../api/auth';
import logger from '../logger';

interface AuthContextType {
  user: User | null;
  hasInitialized: boolean;
  loading: boolean;
  error?: Error;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  confirmSignUp: (username: string, password: string) => Promise<void>;
  resetPassword: (username: string) => Promise<void>;
  confirmResetPassword: (username: string, code: string, password: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID as string,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID as string,
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

export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [ lastUpdate, setLastUpdate ] = useState<Date>(new Date());
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ hasInitialized, setHasInitialized ] = useState<boolean>(false);

  useEffect(() => {
    refreshSession().catch(() => {
      setUser(null);
    }).finally(() => {
      setHasInitialized(true);
    });
  }, []);

  async function signIn(username: string, password: string): Promise<void> {
    setLoading(true);

    try {
      const response = await signInAmplify({ username, password });

      logger.debug('Sign in response', response);

      const [user, session] = await Promise.all([fetchUserAttributesAmplify(), fetchAuthSessionAmplify()]);

      setUser({
        id: user.sub,
        username: user.email,
        email: user.email,
        meta: {
          name: user.name as string,
        },
        accessToken: session.tokens?.accessToken.toString() as string,
        idToken: session.tokens?.idToken?.toString() as string,
      });

      setLastUpdate(new Date());
    } catch (error) {
      logger.warn('Sign in error!', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signUp(name: string, email: string, password: string): Promise<void> {
    setLoading(true);

    const response = await signUpAmplify({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
      },
    });

    logger.debug('Sign up response', response);

    setLoading(false);
  }

  async function confirmSignUp(username: string, code: string): Promise<void> {
    const response = await confirmSignUpAmplify({
      username,
      confirmationCode: code,
    });

    logger.debug('Confirm sign up response', response);
  }

  async function resetPassword(username: string): Promise<void> {
    const response = await resetPasswordAmplify({
      username,
    });
    
    logger.debug('Reset password response', response);
  }

  async function confirmResetPassword(username: string, code: string, password: string): Promise<void> {
    const response = await confirmResetPasswordAmplify({
      username,
      confirmationCode: code,
      newPassword: password,
    });

    logger.debug('Confirm reset password response', response);
  }

  async function updatePassword(oldPassword: string, newPassword: string): Promise<void> {
    logger.debug('Updating password...');

    const response = await updatePasswordAmplify({
      oldPassword,
      newPassword,
    });

    logger.debug('Update password response', response);
  }

  async function signOut(): Promise<void> {
    await signOutAmplify();
    
    setUser(null);
    setLastUpdate(new Date());
  }

  async function refreshSession(): Promise<void> {
    logger.debug('Refreshing session...');
    
    const [user, session] = await Promise.all([fetchUserAttributesAmplify(), fetchAuthSessionAmplify()]);

    setUser({
      id: user.sub,
      username: user.email,
      email: user.email,
      meta: {
        name: user.name as string,
      },
      accessToken: session.tokens?.accessToken.toString() as string,
      idToken: session.tokens?.idToken?.toString() as string,
    });

    setLastUpdate(new Date());
  }

  const memoedValue = useMemo(
    () => ({
      user: getUser(),
      hasInitialized,
      loading,
      signIn,
      signUp,
      confirmSignUp,
      resetPassword,
      confirmResetPassword,
      updatePassword,
      signOut,
      refreshSession,
    }),
    [ loading, hasInitialized, lastUpdate ]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      { children }
    </AuthContext.Provider>
  );
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.hasInitialized === false) {
    return null;
  }

  if (!auth.user) {
    return <Navigate to="/prihlasit-sa" state={{ from: location }} replace />;
  }

  return children;
}

export default function useAuth() {
  return useContext(AuthContext);
}
