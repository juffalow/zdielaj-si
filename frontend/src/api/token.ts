import { refreshToken } from './services';

let userToken: string | null = null;
let albumToken: string | null = null;

const getUserToken = (): string | null => {
  return userToken;
}

const setUserToken = (response: { id: string, expiresAt: string, token: string | null }): void => {
  userToken = response.token;

  if (response.token === null) {
    return;
  }

  setTimeout(async () => {
    refreshToken(response.id).then(res => setUserToken(res.data)).catch(() => setUserToken({ id: '', expiresAt: '', token: null }));
  }, 10 * 60 * 1000);
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
  getAlbumToken,
  setAlbumToken,
}
