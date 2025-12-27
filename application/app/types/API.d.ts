namespace API {
  namespace Album {
    interface CreateAlbumRequest {
      data: {
        album: {
          id: ID;
          name: string;
          user: {
            id: ID;
          };
          files: {
            id: ID;
            mimetype: string;
            size: number;
            uploadUrl: string;
          }[];
          createdAt: string;
        };
      };
      error: unknown;
    }
  }

  namespace PublicProfiles {
    interface GetPublicProfileResponse {
      data: {
        publicProfile: PublicProfile;
      };
      error: unknown;
    }

    interface CreatePublicProfileResponse {
      data: {
        publicProfile: PublicProfile;
      };
      error: unknown;
    }

    interface UpdatePublicProfileResponse {
      data: {
        publicProfile: PublicProfile;
      };
      error: unknown;
    }
  }

  namespace ShortLinks {
    interface GetShortLinkResponse {
      data: {
        shortLink: {
          album: {
            id: ID;
          };
          createdAt: string;
          id: ID;
          typename: 'ShortLink';
        };
      };
    }
  }

  interface GetRefreshTokenResponse {
    error: unknown;
    data: {
      user: {
        accessToken: string;
      };
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

  interface GetUserAlbumsResponse {
    error: unknown;
    data: {
      albums: Album[];
    };
  }

  interface GetPublicProfileResponse {
    error: unknown;
    data: {
      publicProfile: PublicProfile;
    };
  }

  interface GetPublicProfileAlbumsResponse {
    error: unknown;
    data: {
      albums: Album[];
    };
  }
}
