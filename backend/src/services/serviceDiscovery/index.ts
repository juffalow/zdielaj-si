import { ServiceDiscoveryClient, DiscoverInstancesCommand, HealthStatusFilter } from '@aws-sdk/client-servicediscovery';

export class ServiceDiscovery {
  public async discoverInstance(namespace: string, name: string): Promise<string> {
    const client = new ServiceDiscoveryClient({ region: process.env.AWS_XRAY_REGION });

    const input = {
      NamespaceName: namespace,
      ServiceName: name,
      MaxResults: 1,
      HealthStatus: HealthStatusFilter.HEALTHY_OR_ELSE_ALL,
    };

    const command = new DiscoverInstancesCommand(input);

    const result = await client.send(command);

    const ip = result.Instances[0].Attributes.AWS_INSTANCE_IPV4;
    const port = result.Instances[0].Attributes.AWS_INSTANCE_PORT;

    return `${ip}:${port}`;
  }
}

export default ServiceDiscovery;
