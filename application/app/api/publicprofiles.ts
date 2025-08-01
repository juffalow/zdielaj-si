import { get, protectedPost, protectedPatch, protectedDelete } from './client';

export async function getPublicProfile(id: ID): Promise<PublicProfile> {
  return get<API.PublicProfiles.GetPublicProfileResponse>(`${import.meta.env.VITE_API_URL}/publicprofiles/${id}`)
    .then((response) => {
      return response.data.publicProfile;
    });
}

export async function createPublicProfile(id: string, name: string, description: string): Promise<PublicProfile> {
  return protectedPost<API.PublicProfiles.CreatePublicProfileResponse>(`${import.meta.env.VITE_API_URL}/publicprofiles/`, { id, name, description })
    .then(response => response.data.publicProfile);
}

export async function updatePublicProfile(id: ID, params: { name?: string, description?: string, contact?: { homepage?: string, facebook?: string, instagram?: string, pinterest?: string, strava?: string } }): Promise<PublicProfile> {
  return protectedPatch<API.PublicProfiles.UpdatePublicProfileResponse>(`${import.meta.env.VITE_API_URL}/publicprofiles/${id}`, params)
    .then(response => response.data.publicProfile);
}

export async function addAlbumToPublicProfile(publicProfileId: ID, albumId: ID): Promise<unknown> {
  return protectedPost(`${import.meta.env.VITE_API_URL}/publicprofiles/${publicProfileId}/albums`, { id: albumId });
}

export async function removeAlbumFromPublicProfile(publicProfileId: ID, albumId: ID): Promise<unknown> {
  return protectedDelete(`${import.meta.env.VITE_API_URL}/publicprofiles/${publicProfileId}/albums/${albumId}`);
}

export async function getPublicProfileAlbums(params: { publicProfileId: ID, first?: number, after?: number }): Promise<any> {
  const searchParams = new URLSearchParams();
  const { publicProfileId, ...rest } = params as any;

  for (const key in rest) {
    searchParams.append(key, rest[key]);
  }

  return get<API.GetPublicProfileAlbumsResponse>(`${import.meta.env.VITE_API_URL}/publicprofiles/${publicProfileId}/albums?${searchParams}`)
    .then((response) => {
      return response.data.albums;
    });
}
