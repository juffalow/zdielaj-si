export interface CreateParameters {
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface UpdateParameters {
  id: number;
  token?: string | null;
  isActive?: 0 | 1;
}

export default interface UserRepository {
  get(id: number): Promise<User>;
  
  getByEmail(email: string): Promise<User>;

  create(params: CreateParameters): Promise<User>;

  update(params: UpdateParameters): Promise<User>;
}
