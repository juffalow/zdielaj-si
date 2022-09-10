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
    protected mediaRepository: MediaRepository,
    protected storage: Services.Storage,
    protected queue: Services.Queue
  ) {}

  public async process(req: Request, res: Response): Promise<unknown> {
    const directory = base64encode((new Date).toISOString().split('T')[0]);
  
    const path = await processFile(this.storage, directory, (req as any).file);
    let dimensions = null;
  
    if ((req as any).file.mimetype.startsWith('image/')) {
      dimensions = getImageDimensions((req as any).file.buffer);
    }
  
    if ((req as any).file.mimetype.startsWith('video/')) {
      dimensions = await getVideoDimensions(Readable.from((req as any).file.buffer));
    }
  
    const media = await this.mediaRepository.create({
      path: path,
      mimetype: (req as any).file.mimetype,
      height: dimensions.height,
      width: dimensions.width,
      size: (req as any).file.size
    });
  
    const messageData = {
      mediaId: media.id,
      mimetype: media.mimetype,
      height: dimensions.height,
      width: dimensions.width,
      traceId: namespace.get('traceId'),
    }
    
    try {
      await this.queue.sendMessage(messageData);
    } catch (error) {
      logger.error('Could not send message to the queue!', error);
      return res.status(503).json({
        data: null,
        error: 'Could not send message to the queue!',
      });
    }
  
    res.status(200).json({
      error: null,
      data: {
        media,
      },
    }).end();
  }
}

export default UploadController;
