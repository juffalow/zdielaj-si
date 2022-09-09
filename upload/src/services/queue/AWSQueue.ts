import { SQS } from 'aws-sdk';
import Queue from './Queue';

class AWSQueue implements Queue {
  constructor(
    protected sqs: SQS,
    protected queueUrl: string
  ) {}

  public sendMessage(data: unknown): Promise<unknown> {
    const message = {
      MessageBody: JSON.stringify(data),
      QueueUrl: this.queueUrl,
    };

    return this.sqs.sendMessage(message).promise();
  }
}

export default AWSQueue;
