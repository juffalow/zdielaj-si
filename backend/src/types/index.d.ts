/**
 * Based on `primaryKeyType` config the primary key ID is either
 * number (unsigned INT) or string (UUID).
 */
type ID = string;

type Album = {
  id: ID;
  compressedId?: string;
  user: {
    id: ID;
  };
  publicProfile?: {
    id: ID;
  } | null;
  shortLink?: {
    path: string;
  };
  files?: ID[];
  name?: string;
  description?: string;
  createdAt?: string;
}

type User = {
  id: ID;
  albums?: ID[];
  publicProfileId?: ID;
  token?: string;
}

type PublicProfile = {
  id: ID;
  user: {
    id: ID;
  };
  albums?: ID[];
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

type PageInfo = {
  totalCount: number;
};

type OrderBy = {
  field: string;
  direction: string;
};

type ShortLink = {
  path: string;
  albumId: ID;
};
