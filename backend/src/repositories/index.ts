import KnexAlbumRepository from './KnexAlbumRepository';
import KnexMediaRepository from './KnexMediaRepository';
import KnexRefreshTokenRepository from './KnexRefreshTokenRepository';
import KnexUserRepository from './KnexUserRepository';
import database from '../database';

const Album = ((): AlbumRepository => {
  return new KnexAlbumRepository(database);
})();

const Media = ((): MediaRepository => {
  return new KnexMediaRepository(database);
})();

const RefreshToken = ((): RefreshTokenRepository => {
  return new KnexRefreshTokenRepository(database);
})();

const User = ((): UserRepository => {
  return new KnexUserRepository(database);
})();

export {
  Album,
  Media,
  RefreshToken,
  User,
}
