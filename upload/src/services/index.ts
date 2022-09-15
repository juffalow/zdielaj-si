import aws from './aws';
import digitalocean from './digitalocean';
import storage from './storage';
import queue from './queue';
import config from '../config';

const container = {
  get AWS() {
    return aws();
  },

  get DigitalOcean() {
    return digitalocean();
  },

  get Storage(): Services.Storage {
    if (config.services.storage.type === 'S3') {
      return storage.S3;
    }

    if (config.services.storage.type === 'SPACES') {
      return storage.Spaces;
    }

    if (config.services.storage.type === 'DISK') {
      return storage.Disk;
    }
  },

  get Queue(): Services.Queue {
    return queue.AWSQueue;
  },
};

export default container;
