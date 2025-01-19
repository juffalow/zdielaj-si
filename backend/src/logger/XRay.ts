import AWSXRay from 'aws-xray-sdk';
import { ServiceDiscoveryClient, DiscoverInstancesCommand, HealthStatusFilter } from '@aws-sdk/client-servicediscovery';
import http from 'http';
import https from 'https';

AWSXRay.config([AWSXRay.plugins.ECSPlugin]);

AWSXRay.captureHTTPsGlobal(http);
AWSXRay.captureHTTPsGlobal(https);

if (typeof process.env.AWS_XRAY_SERVICE_NAMESPACE === 'string' && typeof process.env.AWS_XRAY_SERVICE_NAME === 'string') {
  const setDaemonAddress = async () => {
    const client = new ServiceDiscoveryClient({ region: process.env.AWS_XRAY_REGION });

    const input = {
      NamespaceName: process.env.AWS_XRAY_SERVICE_NAMESPACE,
      ServiceName: process.env.AWS_XRAY_SERVICE_NAME,
      MaxResults: 1,
      HealthStatus: HealthStatusFilter.HEALTHY_OR_ELSE_ALL,
    };
  
    const command = new DiscoverInstancesCommand(input);
  
    const result = await client.send(command);
  
    const ip = result.Instances[0].Attributes.AWS_INSTANCE_IPV4;
    const port = result.Instances[0].Attributes.AWS_INSTANCE_PORT;
  
    AWSXRay.setDaemonAddress(`${ip}:${port}`);
  };

  setDaemonAddress();
}

export default AWSXRay;
