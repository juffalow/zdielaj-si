/**
 * Based on `primaryKeyType` config the primary key ID is either
 * number (unsigned INT) or string (UUID).
 */
type ID = string | number;

type Media = {
  id: ID;
  albumId: ID;
  fileId: ID;
}

type Album = {
  id: ID;
  userId?: ID;
  hash: string;
  media?: Media[];
  createdAt?: string;
}

type User = {
  id: ID;
}

type PublicProfile = {
  id: ID;
  userId: ID;
  name: string;
  slug: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
