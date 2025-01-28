import XRay from 'aws-xray-sdk';
import { captureFetchGlobal } from 'aws-xray-sdk-fetch';
import http from 'http';
import https from 'https';
import type {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler,
} from 'express';

class AWSXRay implements Services.Trace {
  constructor (plugins: string) {
    this.setPlugins(plugins);
  }

  public openSegment(defaultName: string): RequestHandler[] {
    const traceMiddleware = (req: Request, res: Response, next: NextFunction) => {
      const traceId = this.getTraceId();

      res.setHeader('X-Request-Id', traceId);

      next();
    };

    return [ XRay.express.openSegment(defaultName), traceMiddleware ];
  }

  public closeSegment(): ErrorRequestHandler {
    return XRay.express.closeSegment();
  }

  public createSegment(name: string, rootId?: string | null, parentId?: string | null) {
    return new XRay.Segment(name, rootId, parentId);
  }

  public setSegment(segment: unknown): void {
    return XRay.setSegment(segment as XRay.Segment);
  }

  public getTraceId(): string {
    const namespace = XRay.getNamespace();

    if (namespace.active === null || 'segment' in namespace.active === false) {
      return undefined;
    }

    const segment = XRay.getSegment();

    return 'segment' in segment ? segment.segment.trace_id : segment.trace_id;
  }

  public getNamespace(): unknown {
    return XRay.getNamespace();
  }

  public captureAWSv3Client<T>(client: T): T {
    return XRay.captureAWSv3Client(client as T & { middlewareStack: { remove: any, use: any }, config: any });
  }

  public captureHTTPRequests(): void {
    XRay.captureHTTPsGlobal(http, true);
    XRay.captureHTTPsGlobal(https, true);
    captureFetchGlobal();
  }

  public setDaemonAddress(address: string) {
    XRay.setDaemonAddress(address);
  }

  public setPlugins(plugins: string | undefined) {
    if (typeof plugins !== 'string') {
      return;
    }

    const xrayPlugins = [
      plugins.includes('ECS') ? XRay.plugins.ECSPlugin : null,
      plugins.includes('EC2') ? XRay.plugins.EC2Plugin : null,
      plugins.includes('BEANSTALK') ? XRay.plugins.ElasticBeanstalkPlugin : null,
    ].filter(plugin => plugin !== null);

    XRay.config(xrayPlugins); 
  }

  public processTraceData(data: string): { [key: string]: string } {
    return XRay.utils.processTraceData(data);
  }
}

export default AWSXRay;
