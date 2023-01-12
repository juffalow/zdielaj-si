import { Consumer } from 'sqs-consumer';
import { SQSClient } from '@aws-sdk/client-sqs';
import logger from '../../logger';

class SQSWorker implements Services.Worker {
  constructor(
    protected queueUrl: string,
    protected sqs: SQSClient,
  ) {}

  public start(handleMessage: (body: unknown) => Promise<void>): void {
    const app = Consumer.create({
      queueUrl: this.queueUrl,
      handleMessage: async (message) => {
        const body = JSON.parse(message.Body);

        await handleMessage(body);
      },
      sqs: this.sqs,
    });
    
    app.on('error', (err) => {
      logger.error(err.message, err);
    });
    
    app.on('processing_error', (err) => {
      logger.error(err.message, err);
    });
    
    logger.info('Notifications worker is running...');
    app.start();
  }
}

export default SQSWorker;
