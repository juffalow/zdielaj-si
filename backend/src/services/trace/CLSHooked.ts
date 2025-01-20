import cls from 'cls-hooked';
import { v7 as uuidv7 } from 'uuid';
import type { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'aws-upload-service';

class CLSHooked implements Services.Trace {
  public openSegment() {
    const namespace = this.getNamespace();

    return (req: Request, res: Response, next: NextFunction) => {
      const traceId = req.query.traceId ? req.query.traceId as string : uuidv7();

      namespace.run(() => {
        namespace.set('traceId', traceId);
        res.header('x-request-id', traceId);
    
        next();
      });
    }
  }

  public closeSegment() {
    return (req: Request, res: Response, next: NextFunction) => {
      next();
    }
  }

  public createSegment(): unknown {
    return null;
  }

  public setSegment(): void {
    return;
  }

  public getTraceId() {
    const namespace = this.getNamespace();

    return namespace.get('traceId');
  }

  public captureAWSv3Client<T>(client: T): T {
    return client;
  }

  public captureHTTPRequests(): void {
    return;
  }

  public getNamespace() {
    return cls.getNamespace(NAMESPACE) || cls.createNamespace(NAMESPACE);
  }

  public processTraceData(): { [key: string]: string } {
    return {};
  }
}

export default CLSHooked;
