import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

class AWSQueue implements Services.Queue {
  constructor(
    protected sqs: SQSClient,
    protected queueUrl: string
  ) {}

  public sendMessage(data: unknown): Promise<unknown> {
    const params = {
      MessageBody: JSON.stringify(data),
      QueueUrl: this.queueUrl,
    };

    return this.sqs.send(new SendMessageCommand(params));
  }
}

export default AWSQueue;
