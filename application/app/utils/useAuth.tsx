import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Amplify } from 'aws-amplify';
import {
  signUp as signUpAmplify,
  confirmSignUp as confirmSignUpAmplify,
  signIn as signInAmplify,
  confirmSignIn as confirmSignInAmplify,
  signOut as signOutAmplify,
  resetPassword as resetPasswordAmplify,
  confirmResetPassword as confirmResetPasswordAmplify,
  fetchAuthSession as fetchAuthSessionAmplify,
  fetchUserAttributes as fetchUserAttributesAmplify,
  updatePassword as updatePasswordAmplify,
  getCurrentUser,
} from 'aws-amplify/auth';
import 'aws-amplify/auth/enable-oauth-listener';
import logger from '../logger';

interface AuthContextType {
  user: User | null;
  hasInitialized: boolean;
  loading: boolean;
  error?: Error;
  signIn: (username: string, password: string) => Promise<{ isSuccess: boolean, challenge?: string }>;
  confirmSignIn: (code: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  confirmSignUp: (username: string, code: string) => Promise<void>;
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
        oauth: {
          domain: import.meta.env.VITE_GOOGLE_OUATH_DOMAIN as string,
          providers: [ 'Google' ],
          redirectSignIn: [ import.meta.env.VITE_GOOGLE_OUATH_REDIRECT_SIGN_IN as string ],
          redirectSignOut: [ import.meta.env.VITE_GOOGLE_OUATH_REDIRECT_SIGN_OUT as string ],
          responseType: "code",
          scopes: [ 'openid', 'email', 'profile', 'aws.cognito.signin.user.admin' ],
        }
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
  const [ user, setUser ] = useState<User | null>(null);
  const [ lastUpdate, setLastUpdate ] = useState<Date>(new Date());
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ hasInitialized, setHasInitialized ] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if this is an OAuth callback URL
        const urlParams = new URLSearchParams(window.location.search);
        const hasOAuthParams = urlParams.has('code') || urlParams.has('state');

        console.log('hasOAuthParams', hasOAuthParams);
        console.log('urlParams', urlParams);
        
        if (hasOAuthParams) {
          logger.debug('OAuth callback detected, handling callback...');
          await handleOAuthCallback();
        } else {
          // Normal session refresh
          await refreshSession();
        }
      } catch (error) {
        logger.debug('Authentication initialization failed, user not logged in');
        setUser(null);
      } finally {
        setHasInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Sign in with email and password.
   * If the sign in is successful, it returns `{ isSuccess: true }` without any challenge.
   * If the sign in is not successful, it returns `{ isSuccess: false }` and the challenge type if applicable.
   * @param username - Email address
   * @param password - Password
   * @returns { isSuccess: boolean, challenge?: string } - Whether the sign in was successful and the challenge type if applicable
   */
  async function signIn(username: string, password: string): Promise<{ isSuccess: boolean, challenge?: string }> {
    setLoading(true);

    try {
      const response = await signInAmplify({ username, password });

      if (response.isSignedIn === false) {
        if (response.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE') {
          return {
            isSuccess: false,
            challenge: 'TOTP_CODE',
          };
        }

        return {
          isSuccess: false,
        };
      }

      logger.debug('Sign in response', response);

      await refreshSession();

      return {
        isSuccess: true,
      };
    } catch (error) {
      logger.warn('Sign in error!', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  
  async function confirmSignIn(code: string): Promise<void> {
    const response = await confirmSignInAmplify({
      challengeResponse: code,
    });

    logger.debug('Confirm sign in response', response);

    await refreshSession();
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
    
    try {
      const [user, session] = await Promise.all([fetchUserAttributesAmplify(), fetchAuthSessionAmplify()]);

      logger.debug('User attributes:', user);
      logger.debug('Auth session:', session);

      if (!session.tokens) {
        throw new Error('No tokens found in session');
      }

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
      logger.debug('Failed to refresh session:', error);

      throw error;
    }
  }

  async function handleOAuthCallback(): Promise<void> {
    logger.debug('Handling OAuth callback...');
    
    try {
      // Check if user is authenticated after OAuth redirect
      const currentUser = await getCurrentUser();
      logger.debug('OAuth callback - Current user:', currentUser);
      
      if (currentUser) {
        await refreshSession();
        logger.debug('OAuth login successful');
        
        // Clean up the URL from OAuth parameters
        const url = new URL(window.location.href);
        url.searchParams.delete('code');
        url.searchParams.delete('state');
        window.history.replaceState({}, document.title, url.pathname);
        
        // Redirect to home page after successful OAuth login
        window.location.href = '/';
      }
    } catch (error) {
      logger.error('OAuth callback failed:', error);
      throw error;
    }
  }

  const memoedValue = useMemo(
    () => ({
      user: user,
      hasInitialized,
      loading,
      signIn,
      confirmSignIn,
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

export default function useAuth() {
  return useContext(AuthContext);
}
