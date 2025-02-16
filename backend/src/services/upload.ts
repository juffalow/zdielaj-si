class Upload implements Services.Upload {
  constructor(
    protected httpClient: Utils.HTTPClient,
    protected url: string,
  ) {}

  /**
   * Retrieves detail of a single file from upload service.
   * @param id 
   * @returns 
   */
  public async getFile(id: ID): Promise<GetFileResponse> {    
    return this.httpClient.get(`${this.url}/upload/admin/file/${id}`) as Promise<GetFileResponse>;
  }

  public async listFiles(ids: ID[]): Promise<ListFilesResponse> {
    if (ids.length === 0) {
      return { error: null, data: { files: [] } };
    }

    return this.httpClient.get(`${this.url}/upload/admin/file`, { ids }) as Promise<ListFilesResponse>;
  }

  public async deleteFile(id: ID, token: string): Promise<any> {
    return this.httpClient.delete(`${this.url}/upload/admin/file/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  }
}

export default Upload;
