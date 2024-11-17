namespace API {
  interface GetRefreshTokenResponse {
    error: unknown;
    data: {
      user: {      
        accessToken: string;
      }
    };
  }

  interface GetAlbumResponse {
    error: unknown;
    data: {
      album: Album;
    };
  }

  interface DeleteAlbumResponse {
    error: unknown;
    data: {
      album: Album;
    };
  }

  interface GetCurrentUserResponse {
    error: unknown;
    data: {
      user: User & {
        albums: Album[];
      };
    };
  }

  interface GetPublicProfileResponse {
    error: unknown;
    data: {
      publicProfile: PublicProfile;
    };
  }
}