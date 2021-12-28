import { refreshToken } from './services';

let token: string | null = null;

const getToken = (): string | null => {
  return token;
}

const setToken = (response: { id: string, expiresAt: string, token: string | null }): void => {
  token = response.token;

  if (response.token === null) {
    return;
  }

  setTimeout(async () => {
    refreshToken(response.id).then(res => setToken(res.data)).catch(() => setToken({ id: '', expiresAt: '', token: null }));
  }, 10 * 60 * 1000);
}

window.addEventListener('storage', (event) => {
  if (event.key === 'onLogout') {
    setToken({ id: '', expiresAt: '', token: null });
  }
});

export {
  getToken,
  setToken,
}
