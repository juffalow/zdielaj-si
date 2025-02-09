class User implements Services.User {
  constructor(
    protected httpClient: Utils.HTTPClient,
    protected url: string,
  ) {}

  /**
   * Retrieves detail of a single file from upload service.
   * @param id 
   * @returns 
   */
  public async get(token: string): Promise<{ id: string, username: string, email: string, name: string }> {    
    return this.httpClient.get(`${this.url}/users/me`, {}, { headers: { 'Authorization': `Bearer ${token}` } })
      .then((response) => (response as any).data.user);
  }
}

export default User;
