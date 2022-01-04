import { refreshToken, logout } from './services';

let userToken: string | null = null;
let albumToken: string | null = null;

const getUserToken = (): string | null => {
  return userToken;
}

const setUserToken = (response: { id: string, expiresAt: string, token: string | null }): void => {
  userToken = response.token;

  if (response.token === null) {
    logout();
    return;
  }

  setTimeout(async () => {
    refreshToken().then(res => setUserToken(res.data)).catch(() => setUserToken({ id: '', expiresAt: '', token: null }));
  }, 10 * 60 * 1000);
}

const refreshUserToken = async (): Promise<void> => {
  await refreshToken().then(res => setUserToken(res.data)).catch(() => setUserToken({ id: '', expiresAt: '', token: null }));
}

window.addEventListener('storage', (event) => {
  if (event.key === 'onLogout') {
    setUserToken({ id: '', expiresAt: '', token: null });
  }
});

const getAlbumToken = (): string | null => {
  return albumToken;
}

const setAlbumToken = (token: string | null): void => {
  albumToken = token;
}

export {
  getUserToken,
  setUserToken,
  refreshUserToken,
  getAlbumToken,
  setAlbumToken,
}
