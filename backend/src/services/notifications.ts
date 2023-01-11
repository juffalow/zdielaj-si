class Notifications implements Services.Notifications {
  constructor(
    protected httpClient: Utils.HTTPClient,
    protected url: string,
  ) {}

  public async notify(data: unknown): Promise<unknown> {
    return this.httpClient.post(`${this.url}/notifications`, data);
  }

  public async setSettings(params: { email: string, notifications: Setting[] }, token: string): Promise<unknown> {
    return this.httpClient.get(`${this.url}/email`, { ...params }, {
      headers: {
        'Authorization': token,
      },
    });
  }

  public async getSettings(email: string, token: string): Promise<unknown> {
    return this.httpClient.get(`${this.url}/email`, { email }, {
      headers: {
        'Authorization': token,
      },
    });
  }
}

export default Notifications;
