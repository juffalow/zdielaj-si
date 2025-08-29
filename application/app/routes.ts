import { type RouteConfig, index, route, prefix } from '@react-router/dev/routes';

export default [
  index('./routes/index.tsx'),
  ...prefix('en/', [
    index('routes/home.tsx'),
    route('sign-in', 'routes/signIn.tsx'),
    route('sign-up', 'routes/signUp.tsx'),
    route('albums', 'routes/albums.tsx'),
    route('album/:id', 'routes/album.tsx'),
    route('profil/:id', 'routes/publicProfile.tsx'),
    route('profile', 'routes/profile.tsx'),
  ]),
  route(':path', 'routes/shortLink.tsx'),
] satisfies RouteConfig;
