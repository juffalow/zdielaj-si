let userToken: string | null = null;
let albumToken: string | null = null;

const getUserToken = (): string | null => {
  return userToken;
}

const setUserToken = (newToken: string | null): void => {
  userToken = newToken;
}

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
