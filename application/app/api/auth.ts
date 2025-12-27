import { fetchAuthSession } from 'aws-amplify/auth';

export async function getUserIDToken(): Promise<string | null> {
  const session = await fetchAuthSession();

  return session.tokens?.idToken?.toString() || null;
}

export async function getUserAccessToken(): Promise<string | null> {
  const session = await fetchAuthSession();

  return session.tokens?.accessToken?.toString() || null;
}
