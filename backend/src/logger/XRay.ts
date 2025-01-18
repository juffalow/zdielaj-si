import AWSXRay from 'aws-xray-sdk';
import { ServiceDiscoveryClient, DiscoverInstancesCommand, HealthStatusFilter } from '@aws-sdk/client-servicediscovery';
// import http from 'http';
// import https from 'https';

AWSXRay.config([AWSXRay.plugins.ECSPlugin]);

// AWSXRay.setDaemonAddress(process.env.AWS_XRAY_DAEMON_ADDRESS || '127.0.0.1:2000');

if (typeof process.env.AWS_XRAY_SERVICE_NAMESPACE === 'string' && typeof process.env.AWS_XRAY_SERVICE_NAME === 'string') {
  const setDaemonAddress = async () => {
    const client = new ServiceDiscoveryClient();

    const input = {
      NamespaceName: process.env.AWS_XRAY_SERVICE_NAMESPACE,
      ServiceName: process.env.AWS_XRAY_SERVICE_NAME,
      MaxResults: 1,
      HealthStatus: HealthStatusFilter.HEALTHY_OR_ELSE_ALL,
    };
  
    const command = new DiscoverInstancesCommand(input);
  
    const result = await client.send(command);
  
    console.log(result);
  
    const ip = result.Instances[0].Attributes.AWS_INSTANCE_IPV4;
    const port = result.Instances[0].Attributes.AWS_INSTANCE_PORT;
  
    AWSXRay.setDaemonAddress(`${ip}:${port}`);
  };

  setDaemonAddress();
}

// AWSXRay.captureHTTPsGlobal(http);
// AWSXRay.captureHTTPsGlobal(https);
// AWSXRay.capturePromise();

export default AWSXRay;
