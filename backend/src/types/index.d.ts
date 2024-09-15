/**
 * Based on `primaryKeyType` config the primary key ID is either
 * number (unsigned INT) or string (UUID).
 */
type ID = string;

type Album = {
  id: ID;
  user: {
    id: ID;
  };
  publicProfileId?: ID;
  files?: ID[];
  createdAt?: string;
}

type User = {
  id: ID;
  albums?: ID[];
  publicProfiles?: ID[];
}

type PublicProfile = {
  id: ID;
  user: {
    id: ID;
  };
  name: string;
  slug: string;
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
