import { Request, Response } from 'express';
import { Readable } from 'stream';
import {
  base64encode,
  processFile,
  getImageDimensions,
  getVideoDimensions,
} from '../utils/functions';
import namespace from '../services/cls';
import logger from '../logger';

class UploadController {
  constructor(
    protected fileRepository: FileRepository,
    protected storage: Services.Storage,
    protected queue: Services.Queue
  ) {}

  public async process(req: Request, res: Response): Promise<void> {
    const directory = base64encode((new Date).toISOString().split('T')[0]);
  
    const path = await processFile(this.storage, directory, req['file']);
    const metadata = await this.getMetadata(req['file']);
  
    const file = await this.fileRepository.create({
      userId: typeof req['user'] !== 'undefined' && typeof req['user'].id !== 'undefined' ? req['user'].id : null,
      path: path,
      mimetype: req['file'].mimetype,
      size: req['file'].size,
      metadata,
    });
  
    await this.informWorker(file);
  
    res.status(200).json({
      error: null,
      data: {
        file,
      },
    }).end();
  }

  protected async getMetadata(file: any): Promise<object> {
    let metadata = {};

    if (file.mimetype.startsWith('image/')) {
      metadata = getImageDimensions(file.buffer);
    }
  
    if (file.mimetype.startsWith('video/')) {
      metadata = await getVideoDimensions(Readable.from(file.buffer));
    }

    return metadata;
  }

  protected async informWorker(file: File): Promise<void> {
    const messageData = {
      fileId: file.id,
      mimetype: file.mimetype,
      metadata: file.metadata,
      traceId: namespace.get('traceId'),
    }
    
    try {
      await this.queue.sendMessage(messageData);
    } catch (error) {
      logger.error('Could not send message to the queue!', error);
    }
  }
}

export default UploadController;
