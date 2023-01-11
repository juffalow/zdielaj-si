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
  public async getFile(id: number): Promise<GetFileResponse> {    
    return this.httpClient.get(`${this.url}/upload/files/${id}`) as Promise<GetFileResponse>;
  }
}

export default Upload;
