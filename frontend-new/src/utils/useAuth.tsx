"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { refreshToken, login, logout, register } from '../api/services';
import { setUserToken } from '../api/token';

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [ user, setUser ] = useState<User>();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ loadingInitial, setLoadingInitial ] = useState<boolean>(true);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  useEffect(() => {
    // console.log('useEffect.loadingInitial', loadingInitial)
    refreshToken()
      .then((response) => {
        setUser(response.data.user);
        setUserToken(response.data.user.token);
      })
      .catch(() => {
        setUser(undefined);
        setUserToken(null);
      })
      .finally(() => {
        setLoadingInitial(false);
      });
  }, []);

  // window.addEventListener('storage', (event) => {
  //   if (event.key === 'onLogout') {
  //     setUserToken({ id: '', expiresAt: '', token: null });
  //   }
  // });

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.
  function signIn(email: string, password: string): Promise<void> {
    setLoading(true);

    return login(email, password)
      .then((user) => {
        console.log('setUser', user);
        setUser(user);
        setUserToken(user.token);
        autoRefresh();
      })
      .finally(() => setLoading(false));
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  function signUp(name: string, email: string, password: string): Promise<void> {
    setLoading(true);

    return register(name, email, password)
      .then((user) => {
        setUser(user);
      })
      .finally(() => setLoading(false));
  }

  // Call the logout endpoint and then remove the user
  // from the state.
  function signOut(): Promise<void> {
    return logout().then(() => setUser(undefined));
  }

  function autoRefresh() {
    setTimeout(async () => {
      refreshToken()
        .then((response) => {
          setUserToken(response.data.user.token);
        })
        .catch(() => {
          setUser(undefined);
          setUserToken(null);
        });
      autoRefresh();
    }, 10 * 60 * 1000);
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
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [ user, loading ]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.

  // console.log('useAuth.user', user)
  // <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
  return (
    <AuthContext.Provider value={memoedValue}>
    
      {
        loadingInitial ? ( null ) : children
      }
    </AuthContext.Provider>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const router = useRouter();

  if (!auth.user) {
    router.push("/login");

    return null;
  }

  return children;
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}