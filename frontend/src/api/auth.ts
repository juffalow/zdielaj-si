let user: User | null = null;

export function setUser(newUser: User | null): void {
  user = newUser;
}

export function getUser(): User | null {
  return user;
}

export function getUserIDToken(): string | null {
  return user ? user.idToken : null;
}

export function getUserAccessToken(): string | null {
  return user ? user.accessToken : null;
}
