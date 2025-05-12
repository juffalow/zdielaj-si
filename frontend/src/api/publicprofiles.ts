import { get, protectedPost, protectedPatch, protectedDelete } from './client';
import retryPromise from '../utils/retryPromise';

export async function getPublicProfile(id: ID): Promise<PublicProfile> {
  return retryPromise(() => get<API.PublicProfiles.GetPublicProfileResponse>(`${process.env.REACT_APP_API_URL}/publicprofiles/${id}`), { retries: 3, attempt: 0 })
    .then((response) => {
      return response.data.publicProfile;
    });
}

export async function createPublicProfile(id: string, name: string, description: string): Promise<PublicProfile> {
  return protectedPost<API.PublicProfiles.CreatePublicProfileResponse>(`${process.env.REACT_APP_API_URL}/publicprofiles/`, { id, name, description })
    .then(response => response.data.publicProfile);
}

export async function updatePublicProfile(id: ID, params: { name?: string, description?: string }): Promise<PublicProfile> {
  return protectedPatch<API.PublicProfiles.UpdatePublicProfileResponse>(`${process.env.REACT_APP_API_URL}/publicprofiles/${id}`, params)
    .then(response => response.data.publicProfile);
}

export async function addAlbumToPublicProfile(publicProfileId: ID, albumId: ID): Promise<unknown> {
  return protectedPost(`${process.env.REACT_APP_API_URL}/publicprofiles/${publicProfileId}/albums`, { id: albumId });
}

export async function removeAlbumFromPublicProfile(publicProfileId: ID, albumId: ID): Promise<unknown> {
  return protectedDelete(`${process.env.REACT_APP_API_URL}/publicprofiles/${publicProfileId}/albums/${albumId}`);
}

export async function getPublicProfileAlbums(params: { publicProfileId: ID, first?: number, after?: number }): Promise<any> {
  const searchParams = new URLSearchParams();
  const { publicProfileId, ...rest } = params as any;

  for (const key in rest) {
    searchParams.append(key, rest[key]);
  }

  return retryPromise(() => get<API.GetPublicProfileAlbumsResponse>(`${process.env.REACT_APP_API_URL}/publicprofiles/${publicProfileId}/albums?${searchParams}`), { retries: 3, attempt: 0 })
    .then((response) => {
      return response.data.albums;
    });
}
