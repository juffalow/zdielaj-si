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
  public async getFile(id: number): Promise<GetMediaResponse> {    
    return this.httpClient.get(`${this.url}/media/${id}`) as Promise<GetMediaResponse>;
  }
}

export default Upload;
