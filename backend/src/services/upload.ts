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
    return this.httpClient.get(`${this.url}/upload/admin/file`, { ids }) as Promise<ListFilesResponse>;
  }
}

export default Upload;
